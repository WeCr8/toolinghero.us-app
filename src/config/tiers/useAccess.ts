export const useAccess = () => {
  const userTier = getCurrentTier()
  const features = useFeaturesMap()

  const canUseFeature = (key: keyof typeof features) =>
    features[key].includes(userTier)

  return { canUseFeature }
}