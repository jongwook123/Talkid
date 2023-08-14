import FetchTemplate from "utils/FetchTemplate";

export const TryGetGroup = async (token) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/group',
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const result = await response.json();

        return result
    } catch (e) {
        console.log(e);
    }
}

export const TryMakeGroup = async (groupName, groupImage,token) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + "/group",
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                "groupName": groupName,
                "groupImage":groupImage,
            })
        });

        const result = await response.json();

    } catch (e) {
        console.log(e);
    }
}

export const TryDeleteGroup = async (groupId, token) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/group/${groupId}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                "groupId": groupId,
            })
        });

        const result = await response.json();
        
        return result;
    } catch (e) {
        console.log(e);
    }
}



export const TryGetStudent = async (groupId, token) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/group/management/${groupId}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const result = await response.json();
        return result
    } catch (e) {
        console.log(e);
    }
}

export const TrySearchGroup = async (token, keyword) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/group/find?keyword=${keyword}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const result = await response.json();
        console.log(result);
        return result
    } catch (e) {
        console.log(e);
    }
}


export const TryApplyGroup = async (token, groupId) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/group/apply`,
            method: "POST",  	
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                "groupId": groupId,
            })
        });

        const result = await response.json();
        console.log(result);
        return result;
    } catch (e) {
        console.log(e);
        throw e; // 예외 다시 던지기
    }
}