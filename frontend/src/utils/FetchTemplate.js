const FetchTemplate = ({ path, method, body, headers}) => {
    if (!headers) {
        headers = {};
    }

    headers["Content-Type"] = "application/json";

    return fetch(path, {
        method,
        headers,
        body,
    });
}


export default FetchTemplate;