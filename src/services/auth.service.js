import { AuthUtilConstant } from "../utilities/util.constant";
const IsUserLoggedIn = ()=>{
    const token = getUserToken();
    if(!token){
        return false;

    }
    return true;
}
const getUserToken = ()=>{
    const token = localStorage.getItem(AuthUtilConstant.USER_TOKEN);
    return token;

}
export const AuthService = {
 IsUserLoggedIn,
 getUserToken
}