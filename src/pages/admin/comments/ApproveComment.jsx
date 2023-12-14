
import { commentService } from "../../../services/comment.service";
import { Button, message } from "antd";
import { useMutation } from "react-query";

function ApproveComment(commentId){
    const [messageApi, messageHtml] = message.useMessage(); 
    const  {mutateAsync: approveCommentRequest,  isLoading:approveCommentLoader}  = useMutation(commentService.aproveCommetnById);
    const unApproveBtnHandler= ()=>{
             approveCommentRequest(commentId,{
              onSuccess:()=>{
 messageApi.success("approved successfully");
              }
             })
    }
    return unApproveBtnHandler;
}
export default ApproveComment;