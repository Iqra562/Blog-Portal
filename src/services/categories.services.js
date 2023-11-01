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
const addCategory = (payload)=>{
    const response = ApiService.post(
        CategoriesServiceUrls.getCategoriesURL,
        payload
    );
    return response; 


};
const deleteCategoryById = (categoryId)=>{
    const response = ApiService.delete(
        `${CategoriesServiceUrls.getCategoriesURL}/${categoryId}`
    )
}

export const CategoriesServices = {
    getCategories,
    getCategoryById,
    deleteCategoryById,
    addCategory,
}