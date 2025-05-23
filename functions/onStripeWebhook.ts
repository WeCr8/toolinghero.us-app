import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import Stripe from 'stripe'

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp()
}

const db = admin.firestore()
const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: '2022-11-15',
})

export const onStripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature']
  const endpointSecret = functions.config().stripe.webhook_secret

  let event

  if (!sig) {
    console.error('Missing Stripe signature header')
    res.status(400).send('Missing Stripe signature header')
    return
  }

  try {
    // If using Firebase Functions v2, req.rawBody is a Buffer. If v1, it may be a string.
    // Stripe expects a Buffer.
    const rawBody = Buffer.isBuffer(req.rawBody) ? req.rawBody : Buffer.from(req.rawBody)
    event = stripe.webhooks.constructEvent(rawBody, sig as string, endpointSecret)
  } catch (err: any) {
    console.error('⚠️ Webhook signature verification failed.', err?.message || err)
    res.status(400).send(`Webhook Error: ${err?.message || err}`)
    return
  }

  // Handle checkout and subscription update events
  const data = event.data.object as any

  switch (event.type) {
    case 'checkout.session.completed':
      await handleSubscriptionUpdate(data)
      break
    case 'customer.subscription.updated':
      await handleSubscriptionUpdate(data)
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({ received: true })
})

async function handleSubscriptionUpdate(data: any) {
  try {
    const customerId = data.customer
    const planId = data.items?.data?.[0]?.price?.id || 'free'
    const status = data.status || null
    const currentPeriodEnd = data.current_period_end
    const cancelAtPeriodEnd = data.cancel_at_period_end || false
    const subscriptionId = data.id || null

    const userSnap = await db
      .collection('users')
      .where('stripeCustomerId', '==', customerId)
      .limit(1)
      .get()
    if (userSnap.empty) {
      console.error('User not found for Stripe customer:', customerId)
      return
    }

    const userDoc = userSnap.docs[0]
    const userRef = userDoc.ref

    // Example plan module map
    const planModules: Record<string, string[]> = {
      free: ['DANG'],
      pro: ['DANG', 'DARN'],
      teamPro: ['DANG', 'DARN', 'TeamDashboard'],
      enterprise: ['DANG', 'DARN', 'GPS', 'LifecycleReports'],
      enterprisePlus: ['DANG', 'DARN', 'BlockchainExport', 'AuditReports'],
    }

    const newPlan = planId.replace('plan_', '')
    const modules = planModules[newPlan] || ['DANG']

    await userRef.update({
      plan: newPlan,
      modules,
      stripe: {
        subscriptionId,
        planId,
        status,
        currentPeriodEnd,
        cancelAtPeriodEnd,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      },
    })

    console.log(`Updated user ${userDoc.id} with plan ${newPlan}`)
  } catch (err: any) {
    console.error('Failed to update user from Stripe webhook', err?.message || err)
  }
}
