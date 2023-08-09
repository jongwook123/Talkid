import FetchTemplate from "utils/FetchTemplate";

export const FindMembers = async (category, keyword) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/member/findmember?searchBy=${category}&keyword=${keyword}`,
            method: "GET",
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    }
}