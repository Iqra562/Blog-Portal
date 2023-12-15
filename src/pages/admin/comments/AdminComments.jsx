import React, { useMemo } from "react";
import { useQuery } from "react-query";
import GridView from "../../../components/GridView/GridView";
import { commentService } from "../../../services/comment.service";
import { Button, message,Modal } from "antd";
import { UtilService } from "../../../utilities/util.service";
import { useMutation } from "react-query";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ApproveComment from "../comments/ApproveComment";
const {confirm} = Modal;
function AdminComments(){
    const {data:getComments, isLoading : commentsLoader,refetch:refetchComments} = useQuery("comments",commentService.getComments);
    const [messageApi,messageHtml] =message.useMessage();
    const commentsMemoization = useMemo(()=>
        getComments?.data?.results,[getComments]
    )
    // const unApproveBtnHandler = (commentId) => {
    //   ApproveComment(commentId);
    // };
    const {mutateAsync:commentDeleteRequest,isLoading:deleteCommentLoader}= useMutation(commentService.deleteCommentById);
    const deleteCommentHandler =  (commentId)=>{
     confirm(
      {
        title: "Do you want to delete this comment ?",
        icon: <ExclamationCircleOutlined />,
        onOk(){
          commentDeleteRequest(commentId,{
            onSuccess: () => {
              refetchComments();
              messageApi.success("your comment is deleted successfully!");
            },
          })
        }
        //onCancel({}),
      }
     )

    }
    
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
        render:(singleData)=>{
               return <Button type="default" onClick={()=>deleteCommentHandler(singleData.comment_id)}>Delete</Button>
        }
      }
 ]
    return(
        <div>
        {messageHtml}
            <GridView loading = {commentsLoader } dataSource= {commentsMemoization} columns={columns}  heading="User Comments"/>
        </div>
    )
}
export default AdminComments;