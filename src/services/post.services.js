import {ApiService} from "../utilities/Api.service";
const PostServiceUrl ={
getPosts:"/posts",
}
const getPosts = ()=>{
    const response = ApiService.get(PostServiceUrl.getPosts);
    return response;
};
const getPostById = (postId)=>{
const response = ApiService.get(`${PostServiceUrl.getPosts}/${postId}`);
return response;
}
const deletePostById= (postId)=>{
    const response = ApiService.delete(`${PostServiceUrl.getPosts}/${postId}`);
    return response;

}
export const PostServices = {
    getPosts,
    getPostById,
    deletePostById
};