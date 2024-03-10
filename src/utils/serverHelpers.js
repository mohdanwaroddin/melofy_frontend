import { backendUrl } from "./config";

//this method simplifies the request sending and response receiving;
//just we call the function corresponding to our request , 
//we can send route and body easily;
export const makeUnauthPOSTRequest = async (route, body) => {

    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),

    });

    const formattedResponse = await response.json();
    return formattedResponse;
};

export const makeAuthPOSTRequest = async (route, body) => {
    const token = getToken();
    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),

    });

    const formattedResponse = await response.json();
    return formattedResponse;
};


const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};
