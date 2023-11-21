import {React,useMemo} from "react";
import { useQuery } from "react-query";
import GridView from "../../../components/GridView/GridView";
import { UserServices } from "../../../services/user.service";
import { AuthenticatedRoutesNames } from "../../../utilities/util.constant";
import { useNavigate } from "react-router-dom";

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
    }]
return(
<>
<GridView loading = {usersDataLoader} dataSource={usersDataMemoization} columns={columns} headings="USers"  addBtnClick={()=>navigate(AuthenticatedRoutesNames.CREATE_POST)} addBtnText="+ Add Post"/>
</>
)}
export default Users;