/**
 * Tooling Hero – Firebase Functions Index
 * ---------------------------------------
 * This is the entry point for all Cloud Functions.
 * Each function is modularized into its own file within /src/
 * For more info, see: https://firebase.google.com/docs/functions/typescript
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// 🔔 Stripe webhook handler for billing events
export {onStripeWebhook} from "./onStripeWebhook";

// 👤 Auth trigger – sets up user and default team on signup
export {onUserCreate} from "./onUserCreate";

// 🛠️ Tool creation – logs tool creation into DARN logs
export {onToolAdd} from "./onToolAdd";

// 📌 NOTE: Utility functions like assignModulesByPlan are imported where used, not exported here

// 🧪 Optional: Uncomment to test deployment or connectivity
// export const helloWorld = onRequest((req, res) => {
//   logger.info("Hello logs!", { structuredData: true })
//   res.send("Hello from Firebase!")
// });
