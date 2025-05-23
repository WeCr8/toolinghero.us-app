// 🔔 Stripe webhook handler for billing events
export { onStripeWebhook } from './onStripeWebhook'

// 👤 Auth trigger – sets up user and default team on signup
export { onUserCreate } from './onUserCreate'

// 🛠️ Tool creation – logs tool creation into DARN logs
export { onToolAdd } from './onToolAdd'

// 🧪 Optional: Uncomment to test deployment or connectivity
// export const helloWorld = onRequest((req, res) => {
//   logger.info('Hello logs!', { structuredData: true })
//   res.send('Hello from Firebase!')
// })
