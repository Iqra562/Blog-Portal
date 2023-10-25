import React , {useMemo} from "react";
import {useQuery} from "react-query";
import { useParams } from "react-router-dom";
import {SearchServices} from "../services/search.service";
import {SinglePostLoop} from "../components/SinglePostLoop/SinglePostLoop";

function SearchDetail(){
const {searchDetail} = useParams();
const {data:searchPostData , isLoading :searchPostDataLoading} = useQuery(
    ["search",searchDetail],
    ()=>SearchServices.searchPost({query_custom:searchDetail}),{
        enabled:Boolean(searchDetail),
    }
);
const searchPostDataMemo = useMemo(()=>searchPostData?.data?.results,[searchPostData?.data?.results]
);
return(
    <div>
        <h1 className="page-header">Searching Post : {searchDetail}</h1>
        {
            searchPostDataMemo?.length > 0 ? searchPostDataMemo?.map((singlePost)=>{
           <SinglePostLoop singlePost={singlePost}/>
            }): !searchPostDataLoading && <h2>Post not Found</h2>
        }
    </div>
);

};
export default SearchDetail;