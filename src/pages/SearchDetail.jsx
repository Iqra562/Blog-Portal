import React , {useMemo} from "react";
import {useQuery} from "react-query";
import { useParams } from "react-router-dom";
import {searchService} from "../services/search.service";
import SinglePostLoop from "../components/SinglePostLoop/SinglePostLoop";

function SearchDetail(){
const {searchDetail} = useParams();
const {data:searchPostData , isLoading :searchPostDataLoading} = useQuery(
    ["search",searchDetail],
    ()=>searchService.searchPost({query_custom:searchDetail}),{
        enabled:Boolean(searchDetail),
    }
);
const searchPostDataMemo = useMemo(()=>searchPostData?.data?.results,[searchPostData?.data?.results]
);
return(
//     <div>
//         <h1 className="page-header">Searching Post : {searchDetail}</h1>
//  {
//       searchPostDataMemo?.length > 0 ? (
//         searchPostDataMemo?.map((singlePost) => {
//           return <SinglePostLoop singlePost={singlePost} />;
//         })
//       ) : (
//         <h2>No Post Found!</h2>
//       )
//       }
//     </div>
        <div>
    <h1 className="page-header">Searching Post : {searchDetail}</h1>
    {searchPostDataLoading ? (
      <h2>Loading...</h2>
    ) : searchPostDataMemo?.length > 0 ? (
      searchPostDataMemo.map((singlePost, index) => (
        <SinglePostLoop key={index} singlePost={singlePost} />
      ))
    ) : (
      <h2>Post not Found</h2>
    )}
  </div>

);

};
export default SearchDetail;