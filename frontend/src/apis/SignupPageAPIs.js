import FetchTemplate from "utils/FetchTemplate";

export const TrySignup = async (email, password, name, schoolid, countryid, languageid, membertypeid) => {
    try {
        const response = await FetchTemplate({
            path: process.env.REACT_APP_BASE_SERVER + '/member/signup',
            method: "POST",
            body: JSON.stringify({
                "memberMail" : email, // 아이디
                "memberPassword" : password,
                "memberName" : name,
                "schoolId" : schoolid,    // 학교ID
                "countryId" : countryid,   // 국가ID
                "languageId" : languageid,  // 모국어 ID
                "memberTypeId" : membertypeid // 선생님 1, 학생 2
            })
        });

        const result = await response.json();

        console.log(result);
    } catch (e) {
        console.log(e);
    }
}