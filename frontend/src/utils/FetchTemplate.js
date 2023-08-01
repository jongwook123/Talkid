const FetchTemplate = ({ path, method, body }) => {
    const headers = {}

    if (method !== "GET") {
        headers["Content-Type"] = "application/json";
    }

    return fetch(path, {
        method,
        headers,
        body,
    });
}


export default FetchTemplate;