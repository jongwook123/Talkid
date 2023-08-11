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