import FetchTemplate from "utils/FetchTemplate";

export const TryGetGroup = async (memberId) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/group/${memberId}`,
            method: "GET",
        });

        const result = await response.json();
        return result
        // console.log(result);
    } catch (e) {
        console.log(e);
    }
}

export const TryMakeGroup = async (memberId, groupName, groupImage) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + "/group",
            method: "POST",
            body: JSON.stringify({
                "memberId": memberId,
                "groupName": groupName,
                "groupImage":groupImage,
            })
        });

        const result = await response.json();

        console.log(result);
    } catch (e) {
        console.log(e);
    }
}