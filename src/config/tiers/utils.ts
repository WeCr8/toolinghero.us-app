export const getCurrentTier = () => useUserStore().tier
export const hasTierAccess = (tierList: string[]) =>
  tierList.includes(getCurrentTier())