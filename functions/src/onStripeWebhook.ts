import { onRequest } from 'firebase-functions/v2/https'
import * as logger from 'firebase-functions/logger'

export const onStripeWebhook = onRequest((req, res) => {
  logger.info('🔔 Stripe Webhook triggered:', req.body)
  res.status(200).send({ received: true })
})