export const useAccess = () => {
    const userTier = getCurrentTier();
    const features = useFeaturesMap();
    const canUseFeature = (key) => features[key].includes(userTier);
    return { canUseFeature };
};
