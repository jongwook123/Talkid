import FetchTemplate from "utils/FetchTemplate";

export const GetNotifys = async (token) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/notify',
            headers: {
                "Authorization" : `Bearer ${token}`
            },
            method: "GET",
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}