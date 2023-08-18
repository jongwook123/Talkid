import FetchTemplate from "utils/FetchTemplate";

export const GetList = async (category) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/member/${category}`,
            headers: {},
            method: "GET",
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    }
}