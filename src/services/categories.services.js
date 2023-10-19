import {ApiService} from "../utilities/Api.service";
const CategoriesServiceUrls = {
    getCategoriesURL :"/categories",
}
const getCategories = ()=>{
    const  response = ApiService.get(CategoriesServiceUrls.getCategoriesURL);
    return response;
};
const getCategoryById= (categoryId)=>{
    const response  =ApiService.get(
        `${CategoriesServiceUrls.getCategoriesURL}/${categoryId}`
    );
    return response;

}
export const CategoriesServices = {
    getCategories,
    getCategoryById
}