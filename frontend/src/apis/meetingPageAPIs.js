import FetchTemplate from "utils/FetchTemplate";
// groupId, meetingStart, meetingEnd

export const TryRegister = async (token, groupId, meetingStart, meetingEnd) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/meeting',
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                "groupId" : groupId,
                "meetingStart" : meetingStart,
                "meetingEnd" : meetingEnd,
            })
        });

        const result = await response.json();
        return result
    } catch (e) {
        console.log(e);
    }
}


export const GetMeeting = async (token, year, month) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/meeting?year=2023&month=${month}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    }
}

export const ApplyMeeting = async (token, meetingScheduleId, groupId) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/meeting/apply',
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                "meetingScheduleId" : meetingScheduleId,
                "groupId" : groupId,
            })
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    }
}