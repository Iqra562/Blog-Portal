export  const  UnAuthenticatedRoutesNames = {
    HOME :"/",
    POST_DETAIL :"/post/:id",
    CATEGORY_DETAIL :"/category/:id",
    LOGIN :"/login",
    REGISTER:"/register",
    SEARCH_DETAIL:"/search/:searchDetail",
    
};
export const AuthenticatedRoutesNames = {
    HOME :"/",
    CATEGORIES:"/categories",
    CATEGORY_ADD:"/category/add",
    CATEGORY_EDIT:"/category/edit/:id",
    POSTS:"/posts",
    CREATE_POST:"/post/create",
    EDIT_POST:"/post/edit/:postId",
    USERS:"/users",
    CREATE_USER:"/user/create",
    EDIT_USER:"/user/edit/:userId",

}
export const AuthUtilConstant = {
    USER_TOKEN : "token",
};















