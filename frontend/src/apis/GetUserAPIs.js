import FetchTemplate from "utils/FetchTemplate";

export const TryGetUser = async (token) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/member',
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

export const TryGetFollow = async (token, memberId) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/member/follow/${memberId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
        });

        const result = await response.json();
        return result
    } catch (e) {
        console.log(e);
    }
}


export const TryFollow = async (memberId, token) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/member/follow/${memberId}`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                "memberId": memberId,
            })
        });

        const result = await response.json();

        console.log(result);
    } catch (e) {
        console.log(e);
    }
}

export const TryGetExp= async (memberId) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/member/exp/${memberId}`,
            headers: {},
            method: "GET",
        });

        const result = await response.json();
        return result
    } catch (e) {
        console.log(e);
    }
}