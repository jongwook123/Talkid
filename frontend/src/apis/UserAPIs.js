import FetchTemplate from "utils/FetchTemplate";

export const TrySignin = async (email, password) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/member/signin',
            method: "POST",
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
            body: JSON.stringify({
                "memberMail" : email,
                "memberPassword" : password,
                "memberName" : name,
                "schoolId" : schoolid,
                "countryId" : countryid,
                "languageId" : languageid,
                "memberTypeId" : membertypeid
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
            body: JSON.stringify({
                "memberMail": email,
            })
        });

        const result = await response.json();

        console.log(result);
    } catch (e) {
        console.log(e);
    }
}