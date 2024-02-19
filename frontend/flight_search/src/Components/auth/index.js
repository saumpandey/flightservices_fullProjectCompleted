// auth.js
export const isLoggedIn = () => {
    const data = localStorage.getItem("authToken");
    return data !== null; 
}