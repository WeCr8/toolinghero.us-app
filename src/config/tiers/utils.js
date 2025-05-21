export const getCurrentTier = () => useUserStore().tier;
export const hasTierAccess = (tierList) => tierList.includes(getCurrentTier());
