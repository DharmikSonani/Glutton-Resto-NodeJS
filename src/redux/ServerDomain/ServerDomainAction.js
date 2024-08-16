import { FETCH_SERVER_DOMAIN } from "../Constants"

export const setServerDomainInRedux = (data) => {
    return {
        type: FETCH_SERVER_DOMAIN,
        data: data,
    }
}