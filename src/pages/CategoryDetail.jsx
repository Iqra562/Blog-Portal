import React , {useMemo} from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CategoriesServices } from "../services/categories.services";
import SinglePostLoop from "../components/SinglePostLoop/SinglePostLoop";
function CategoryDetail(){
   const { id: categoryId } = useParams();
   const {data: getCategoryByIdData} = useQuery(
    ["category", categoryId], ()=> CategoriesServices.getCategoryById(categoryId),{
        enabled : Boolean(categoryId),

    }
   );
   const getCategoryByIdMemo = useMemo(
    ()=>getCategoryByIdData?.data?.results,[getCategoryByIdData?.data?.results]
   );
   return (
    <div>
        <h1 className="page-header">Category: {getCategoryByIdMemo?.cat_title}</h1>
        {getCategoryByIdMemo?.posts?.map((singlePost)=>{
           return <SinglePostLoop singlePost = {singlePost}/>;
        })}
    </div>
   );
}
export default CategoryDetail;