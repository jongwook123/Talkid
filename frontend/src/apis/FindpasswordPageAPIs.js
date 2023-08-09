import FetchTemplate from "utils/FetchTemplate";

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