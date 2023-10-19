import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { PostServices } from "../services/post.services";
import SinglePostLoop from "../components/SinglePostLoop/SinglePostLoop";

function Home() {
  const { data: getPostData } = useQuery("getPosts", PostServices.getPosts);
  const getPostDataMemo = useMemo(() => getPostData?.data?.results, [getPostData?.data?.results]);

  return (
    <div>
      <h1 className="page-header">All Posts</h1>
      {getPostDataMemo?.map((singlePost) => {
        return <SinglePostLoop singlePost={singlePost}/>
      })}
    </div>
  );
}

export default Home;
