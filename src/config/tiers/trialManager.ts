export const isTrialActive = (user) =>
  user.tier === 'trial' && Date.now() < user.trialExpires

export const getTrialCountdown = (user) =>
  user.tier === 'trial' ? user.trialExpires - Date.now() : 0