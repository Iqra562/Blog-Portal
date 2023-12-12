import { ApiService } from "../utilities/Api.service";
const commentURL={
    name : "comments",

}
const getComments = ()=>{
    const response = ApiService.get(commentURL.name);
    return response;
}
const storeComment = (payload)=>{
const response = ApiService.post(commentURL.name,payload);
return response;
}
const deleteCommentById = (commentId)=>{
    const response = ApiService.delete(`${commentURL.name}/${commentId}`);
    return response;
}
const aproveCommetnById = (commentId)=>{
    const response = ApiService.get(`${commentURL.name}/approve/${commentId}`);
    return response;
}
const unapproveCommentById = (commentId)=>{
const response = ApiService.get(`${commentURL.name}/unapprove/${commentId}`);
return response;
}

export const commentService = {
    getComments,
    storeComment,
    deleteCommentById,
    aproveCommetnById,
    unapproveCommentById,
}