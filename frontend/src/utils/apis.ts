

const BASE_URI = process.env.REACT_APP_API_URL;



export const APIs  = {
    auth: {
        signup: `${BASE_URI}/users/signup`, 
        currentUser: `${BASE_URI}/users/currentUser`, 
        signout: `${BASE_URI}/users/signout`, 
        signin: `${BASE_URI}/users/signin`, 
    }, 
    pokemon: {
        index: (page:number=0) => `${BASE_URI}/pokemon?page=${page}`,
        details: (id:number) => `${BASE_URI}/pokemon/${id}`,
        favorite: `${BASE_URI}/pokemon/favorite`,
        getFavoriteIds: `${BASE_URI}/pokemon/favorite_ids` 
        
    }
}