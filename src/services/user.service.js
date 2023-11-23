import {ApiService} from "../utilities/Api.service";
const userServicesUrl = {
    login : "/login",
};
const login = (data) =>{
 const response = ApiService.post(userServicesUrl.login,data);
 return response;
}
const userServices = {
    getUsers: "/users",
}
const userRegister = {
    getRegister: "/register"
}
const  getUsers = ()=>{
    const response = ApiService.get(userServices.getUsers);
    return response;
}
const getUserById=(userId)=>{
    const response = ApiService.get(`${userServices.getUsers}/${userId}`);
    return response;
}
const addUser = (payload)=>{
    const response = ApiService.post(userRegister.getRegister,payload);
    return response;
}
const updateUserById = (userId,payload)=>{
    const response = ApiService.put(`${userServices.getUsers}/${userId}`,payload);
    return response;

}
const deleteUserById = (userId)=>{
    const response = ApiService.delete(`${userServices.getUsers}/${userId}`);
    return response;

}

export const UserServices = {
    login,
    getUsers,
    getUserById,
    addUser,
    updateUserById,
    deleteUserById
};