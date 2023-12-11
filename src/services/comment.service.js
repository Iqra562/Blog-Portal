import { ApiService } from "../utilities/Api.service";
const commentURL={
    name : "comments",

}
const getComments = ()=>{
    const response = ApiService.get(commentURL.name);
    return response;
}
export const commentService = {
    getComments,
}