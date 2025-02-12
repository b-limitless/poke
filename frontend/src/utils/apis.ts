const BASE_URI = process.env.REACT_APP_API_URL;

export const APIs  = {
    auth: {
        signup: `${BASE_URI}/users/signup`, 
        currentUser: `${BASE_URI}/users/currentUser`, 
        signout: `${BASE_URI}/users/signout`, 
        signin: `${BASE_URI}/users/signin`, 
    }
}