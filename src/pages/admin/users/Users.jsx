import {React,useMemo} from "react";
import { useMutation, useQuery } from "react-query";
import GridView from "../../../components/GridView/GridView";
import { UserServices } from "../../../services/user.service";
import { AuthenticatedRoutesNames } from "../../../utilities/util.constant";
import { useNavigate } from "react-router-dom";
import { UtilService } from "../../../utilities/util.service";
import { Button, message,Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const {confirm} =Modal;

function Users(){
    const navigate= useNavigate();
    const [messageApi,contextHolder]= message.useMessage();
    // get users data through useQuery 
    const {data:usersData,isLoading:usersDataLoader, refetch:refetchUserData}=useQuery("usersData",UserServices.getUsers);
    // userdata memoization 
    const usersDataMemoization = useMemo(()=> usersData?.data?.results,[usersData?.data?.results]);
    //  console.log(usersDataMemoization)
    //   delete user query 
  const {mutateAsync:deleteUserId, isLoading:deleteUserLoader}=useMutation(UserServices.deleteUserById);
  const deleteUserFunction=(userId)=>{
    confirm({
        title: "Do you want to delete post?",
        icon:<ExclamationCircleOutlined/>,
        onOk(){
            deleteUserId(userId,{
                onSuccess:()=>{
                    messageApi.success("User is deleted successfully!");
                refetchUserData();
                }

            })
        },
        onCancel(){}
    })

  }
    const columns = [{
        title:"User Id",
        render:(singleData)=>{
    return singleData.user_id;
        }
    },
{
    title:"User Name",
    render:(singleData)=>{
      return singleData.username
    }
},
{
    title:"Email",
    render:(singleData)=>{
 return singleData.email
    }
},
{
    title:"User Image",
    render:(singleData)=>{
 if(!singleData.user_image){
  return <p>No image found!</p>
 }
 else{
   return <img  src={singleData.user_image} alt={singleData.username} width="100"/>
 }
    }
},
{
    title:"User Role",
    render:(singleData)=>{
       return singleData.user_role
    }
},
{
    title:"User Status",
    render:(singleData)=>{
return singleData.is_online
    }
},
{
    title:"Created At",
    render:(singleData)=>{
 return UtilService.convertDateToMyFormat(singleData.created_at)
    }
},
{
    title:"Updated At",
    render:(singleData)=>
    {
        return UtilService.convertDateToMyFormat(singleData.updated_at)

    }
},{
    title:"Edit",
    render:()=>{
    return    <Button type="primary" >Edit</Button>

    }
 },
 {
    title:"Delete",
    render:(singleData)=>{
return <Button type="Default" onClick={()=>deleteUserFunction(singleData.user_id)}>Delete</Button>
    }
}
]
return(
<div>
{contextHolder}
<GridView loading = {usersDataLoader} dataSource={usersDataMemoization} columns={columns} headings="USers"  addBtnClick={()=>navigate(AuthenticatedRoutesNames.CREATE_USER)} addBtnText="+ Add User"/>
</div>
)}
export default Users;