export const getActiveClient = () => useStore().consultant.activeClientId;
export const switchClient = (id) => useStore().consultant.activeClientId = id;
