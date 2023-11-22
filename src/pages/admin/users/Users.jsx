import {React,useMemo} from "react";
import { useQuery } from "react-query";
import GridView from "../../../components/GridView/GridView";
import { UserServices } from "../../../services/user.service";
import { AuthenticatedRoutesNames } from "../../../utilities/util.constant";
import { useNavigate } from "react-router-dom";
import { UtilService } from "../../../utilities/util.service";

function Users(){
    const navigate= useNavigate();
    // get users data through useQuery 
    const {data:usersData,isLoading:usersDataLoader}=useQuery("usersData",UserServices.getUsers);
    // userdata memoization 
    const usersDataMemoization = useMemo(()=> usersData?.data?.results,[usersData?.data?.results]);
  //  console.log(usersDataMemoization)
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
}]
return(
<>
<GridView loading = {usersDataLoader} dataSource={usersDataMemoization} columns={columns} headings="USers"  addBtnClick={()=>navigate(AuthenticatedRoutesNames.CREATE_POST)} addBtnText="+ Add Post"/>
</>
)}
export default Users;