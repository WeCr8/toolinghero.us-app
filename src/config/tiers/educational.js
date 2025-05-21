export const enforceEduMode = (user) => {
    return user.tier === 'educational' && user.metadata.schoolVerified;
};
