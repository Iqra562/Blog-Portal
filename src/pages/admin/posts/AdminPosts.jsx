import { useMemo } from "react";
import {Modal} from "antd";
import { PostServices } from "../../../services/post.services";
import { useMutation, useQuery } from "react-query";
import GridView from "../../../components/GridView/GridView";
import { message,Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { UtilService } from "../../../utilities/util.service";
const {confirm} = Modal;
function AdminPosts(){

    const  {data: postData, isLoading : getPostLoader, refetch:refetchPostData} = useQuery("posts", PostServices.getPosts);
    const postDataTable= useMemo( () => postData?.data?.results,[postData?.data?.results]);
    const {mutateAsync:deletePostRequest, isLoading:deletePostLoader}=useMutation(PostServices.deletePostById);
    const deletePostFunction = (postId)=>{
      confirm({
        title: "Do you want to delete post?",
         icon:<ExclamationCircleOutlined/>,
         onOk(){
          deletePostRequest(postId,{
            onSuccess:()=>{
              messageApi.success("post is deleted succesfully!");
              refetchPostData();
            },
          });
        },
        onCancel(){},
     }
     )
    }
   const [messageApi , contextHolder] = message.useMessage();

    const columns=[
      {
        title: "Id",
        render:(singleData)=>{
                  return singleData.id;
        }
      },
      {
        title:"Post Title",
        render:(singleData)=>{
 return singleData.post_title;
        }
      },
      {
        title:"Post Author",
        render:(singleData)=>{
 return singleData.post_author;
        }
      },
      {
        title:"Post Image",
        render:(singleData)=>{
       //   const image =singleData.image ;
          if(!singleData.image){
            return <p>No image found</p>
          }
          return(
            <img src={singleData.image} alt= {singleData.post_title} width="100"/>
          )

        },
      },
      {
        title:"Created At",
        render:(singleData)=>{
 return UtilService.convertDateToMyFormat(singleData.created_at);
        },
      },
      {
        title:"Updated At",
        render:(singleData)=>{
return UtilService.convertDateToMyFormat(singleData.updated_at);
        },
      },
      {
        title:"Edit",
        render:(singleData)=>{
return <Button type="primary">Edit</Button>
        },
      },
      {
        title:"Delete",
        render:(singleData)=>{
return <Button type="Default" onClick={()=> deletePostFunction(singleData.id)}>Delete</Button>

        }
      }

    ]
return(
<>
{contextHolder}
<GridView loading={getPostLoader} dataSource={postDataTable} columns={columns} addBtnText="+ Add Post"/>
</>

)
}
export default AdminPosts;