const usersEndpoints = () => {
    const namespace = '/users';
    return {
        base: `${namespace}`,
        register: `${namespace}/register`,
        registerVerify: `${namespace}/register-verify`,
        registerGoogle: `${namespace}/register-google`,
        refreshToken: `${namespace}/refresh-token`,
        profile: `${namespace}/profile`,
        createProfile: `${namespace}/create-profile`,
    };
};

export default usersEndpoints();
