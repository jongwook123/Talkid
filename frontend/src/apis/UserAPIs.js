import FetchTemplate from "utils/FetchTemplate";

export const TrySignin = async (email, password) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/member/signin',
            method: "POST",
            headers: {},
            body: JSON.stringify({
                "memberMail": email,
                "memberPassword": password,
            })
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const TrySignup = async (email, password, name, schoolid, countryid, languageid, membertypeid) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/member/signup',
            method: "POST",
            headers: {},
            body: JSON.stringify({
                "memberMail": email,
                "memberPassword": password,
                "memberName": name,
                "schoolId": schoolid,
                "countryId": countryid,
                "languageId": languageid,
                "memberTypeId": membertypeid
            })
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const GetList = async (category) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/member/${category}`,
            method: "GET",
            headers: {},
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const TryFindPassword = async (email) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/member/findpw',
            method: "POST",
            headers: {},
            body: JSON.stringify({
                "memberMail": email,
            })
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const GetUserInfo = async (accessToken) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/member',
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${accessToken}`
            }
        });

        const result = await response.json();
        
        return result;
    } catch (e) {
        console.log(e);
    }
}

export const TryModifyUser = async (accessToken, password, country, language, userinfo) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/member/edit`,
            method: "PUT",
            headers: {
                "Authorization" : `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                "memberPassword": password,
                "countryId": country,
                "languageId": language,
                "memberIntroduce": userinfo
            })
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}