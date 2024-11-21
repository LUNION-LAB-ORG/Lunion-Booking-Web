const plansEndpoints = () => {
    const namespace = '/plans';
    return {
        base: `${namespace}`,
        subscribe: `${namespace}/subscribe`,
        trial: `${namespace}/trial`,
    };
};

export default plansEndpoints();
