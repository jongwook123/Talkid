import FetchTemplate from "utils/FetchTemplate";
// groupId, meetingStart, meetingEnd

export const TryRegister = async (token) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/meeting',
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                // "groupId" : groupId,
                // "meetingStart" : meetingStart,
                // "meetingEnd" : meetingEnd,
                "groupId" : 5,
                "meetingStart":"2023-08-10T08:37:22.315862",
                "meetingEnd": "2023-08-107T09:37:22.315862",
            })
        });

        const result = await response.json();
        console.log(result);
        return result
    } catch (e) {
        console.log(e);
    }
}

let DATE = new Date();
const year = DATE.getFullYear();
const month = DATE.getMonth() + 1;

export const GetMeeting = async (token) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/meeting?year=${year}&month=${month}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const result = await response.json();
        console.log(result)
        return result;

    } catch (e) {
        console.log(e);
    }
}