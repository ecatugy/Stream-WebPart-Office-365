
export const getBoolean = (value: any) => {
    switch (value) {
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default:
            return false;
    }
}


export const isIE = () => {
    return /Trident\/|MSIE/.test(window.navigator.userAgent);
}


export const getUrlParams = (search: string) => {
    const hashes = search.slice(search.indexOf("?") + 1).split("&");
    const values = hashes.reduce((acc, hash) => {
        const [key, val] = hash.split("=");
        return {
            ...acc,
            [key]: decodeURIComponent(val)
        };
    }, {});

    return {
        ...values,
        loaded: true,
        hasUrl: true
    };
};
