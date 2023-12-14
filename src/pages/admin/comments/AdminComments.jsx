import React, { useMemo } from "react";
import { useQuery } from "react-query";
import GridView from "../../../components/GridView/GridView";
import { commentService } from "../../../services/comment.service";
import { Button, message } from "antd";
import { UtilService } from "../../../utilities/util.service";
import { useMutation } from "react-query";
import ApproveComment from "../comments/ApproveComment";

function AdminComments(){
    const {data:getComments, isLoading : commentsLoader,refetch:refetchComments} = useQuery("comments",commentService.getComments);
    const [messageApi,messageHtml] =message.useMessage();
    const commentsMemoization = useMemo(()=>
        getComments?.data?.results,[getComments]
    )
    // const unApproveBtnHandler = (commentId) => {
    //   ApproveComment(commentId);
    // };
    
    const {mutateAsync: unApproveCommentRequest,isLoading:unApproveCommentLoader} = useMutation(commentService.unapproveCommentById);
    const approveBtnHandler = (commentId)=>{
      unApproveCommentRequest(commentId,
        {
          onSuccess:()=>{
            messageApi.success("unapprove successfully");
            refetchComments();
            
                }
              })
    }
    const {mutateAsync: approveCommentRequest,isLoading:approveCommentLoader} = useMutation(commentService.aproveCommetnById);
    const unApproveBtnHandler = (commentId)=>{
      approveCommentRequest(commentId,
        {
          onSuccess:()=>{
            messageApi.success("approved successfully");
            refetchComments();
            
                }
              })
    }
 const columns = [
    {
        title:"Comment ID",
        key:"commentId",
        render :(singledata)=>{
               return singledata.comment_id;
        }
    },
    {
        title:"User Name",
        key:"userName",
        render:(singledata)=>{
  if(!singledata?.user?.username){
       return<p>User not found</p>    
 }else{
    return singledata?.user?.username;
 }
        }
    },
    {
        title:"Post Name",
        key:"postName",
        render:(singledata)=>{
             if(!singledata?.post?.post_title){
  return <p>post not found</p>
             }else{
          return      singledata?.post?.post_title;
             }
        }

    },
    {
        title: "Comment Content",
      key: "commentContent",
      render: (singleData) => {
        return singleData?.comment_content;
      },
    },
    {
        title: "Comment Status",
        key: "commentstatus",
        render: (singleData) => {
          if (singleData?.comment_status === "approved") {
            return (
              <Button type="primary" onClick={()=>approveBtnHandler(singleData?.comment_id)}>
                {singleData?.comment_status?.toUpperCase()}
              </Button>
            );
          } else {
            return (
              <Button type="default" danger   onClick={() => unApproveBtnHandler(singleData?.comment_id)}>
                {singleData?.comment_status?.toUpperCase()}
              </Button>
            );
          }
        },
      },
      {
        title: "Created At",
        key: "createdAt",
        render: (singleData) => {
          return UtilService.convertDateToMyFormat(singleData.created_at);
        },
      },
      {
        title: "Updated At",
        key: "updatedAt",
        render: (singleData) => {
          return UtilService.convertDateToMyFormat(singleData.updated_at);
        },
      },
      {
        title:"Delete",
        key:"delete",
        render:()=>{
               return <Button type="default">Delete</Button>
        }
      }
 ]
    return(
        <div>
            <GridView loading = {commentsLoader } dataSource= {commentsMemoization} columns={columns}  heading="User Comments"/>
        </div>
    )
}
export default AdminComments;