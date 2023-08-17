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
                "Authorization": `Bearer ${accessToken}`
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
                "Authorization": `Bearer ${accessToken}`
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

export const TryDeleteUser = async (accessToken) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/member`,
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const FindMembers = async (category, keyword) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/member/findmember?searchBy=${category}&keyword=${keyword}`,
            headers: {},
            method: "GET",
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    }
}

export const TryFollow = async (accessToken, memberId) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/member/follow/${memberId}`,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const GetFollow = async (accessToken) => {
    try {
        const user_response = await GetUserInfo(accessToken);

        if (!user_response.success) {
            return [];
        }

        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/member/follow/${user_response.response.memberId}`,
            method: "GET",
            headers: {},
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const RegisterBookmark = async (accessToken, before, after) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/member/bookmark',
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                "bookMarkOriContent": before,
                "bookMarkTransContent": after,
            })
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const GetBookmarks = async (accessToken) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/member/bookmark',
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const DeleteBookmark = async (accessToken, bookmarkId) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/member/bookmark/' + bookmarkId,
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e);
    }
}