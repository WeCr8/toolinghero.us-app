export const getActiveClient = () => useStore().consultant.activeClientId
export const switchClient = (id: string) => useStore().consultant.activeClientId = id