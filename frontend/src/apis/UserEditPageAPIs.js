import FetchTemplate from "utils/FetchTemplate";

export const TryEditconfirm = async (email,password,country,language,userinfo) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + `/member/member/${email}`,
            method: "PUT",
            body: JSON.stringify({
                "memberPassword" : password,
                    "countryId" : country,
                    "languageId" : language,
                    // 사진
                 "memberIntroduce" : userinfo // 자기소개
            })
        });

        const result = await response.json();

        console.log(result);
    } catch (e) {
        console.log(e);
    }
}
