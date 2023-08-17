import FetchTemplate from "utils/FetchTemplate";

export const GetResult = async (token, change, text) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/language${change}${text}`,
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