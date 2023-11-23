import { Button, Form, Input,Select, message } from "antd";
import Title from "antd/es/skeleton/Title";
import CustomUpload from "../../../components/CustomUpload/CustomUpload";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { UserServices } from "../../../services/user.service";
import { useNavigate, useParams } from "react-router-dom";
import { AuthenticatedRoutesNames } from "../../../utilities/util.constant";

function AddEditUser(){
    const {userId}=useParams();
    const [editMode,setEditMode] = useState(false);
    const [form] = Form.useForm();
    const [saveFile,setSaveFile] = useState(null);
    const [messageApi,messageContext]= message.useMessage();
    const navigate = useNavigate();

    // useMutation to add user 
    const {mutateAsync:createUser,isLoading:createUserLoading} = useMutation(UserServices.addUser);
    
    // get user by id 
    const {data:getUserById, isLoading:getUserByIdLoading}= useQuery(["getUserById",userId],()=>UserServices.getUserById(userId),{
      enabled:Boolean(userId)
    })
    // console.log(getUserById)
    // memoization of user by id 
    const userByIdMemoization =useMemo(()=>getUserById?.data?.results,[getUserById?.data?.results]);
    // console.log(userByIdMemoization)
    // update user request 
    const {mutateAsync:userUpdateRequest ,isLoading: userUpdateLoading}=useMutation((payload)=> UserServices.updateUserById(userId,payload))
    // set edit mode true 
   useEffect(()=>{
    if(userId){
      setEditMode(true)

    }
   },[userId]);
    // getImage to upload 
    const customRequestCallbackFunction = (File)=>{
        setSaveFile(File);
    }
      
    const onUserDataSubmit = (values)=>{
        const formData= new FormData();
        formData.append("username",values?.username);
        formData.append("user_firstname",values?.user_firstname);
        formData.append("user_lastname",values?.user_lastname);
        formData.append("email",values?.email);
        formData.append("password",values?.password);
        formData.append("c_password",values?.c_password);
      
        if(saveFile){
            formData.append("user_image",saveFile)
        }

        if(editMode){
          userUpdateRequest(formData,{
            onSuccess:()=>{
              messageApi.success("User updated successfully!");
              navigate(AuthenticatedRoutesNames.USERS)
            }
          })
        } else{
        createUser(formData, {
            onSuccess: () => {
              messageApi.success("User  registered successfully!");
              navigate(AuthenticatedRoutesNames.USERS);
            },
          });
        }

    }
    // set form feilds value 
    useEffect(()=>{
      if(userByIdMemoization){
        form.setFieldsValue({
          username:userByIdMemoization?.username,
          user_firstname:userByIdMemoization?.user_firstname,
          user_lastname:userByIdMemoization?.user_lastname,
          email:userByIdMemoization?.email,
          password:userByIdMemoization?.password,
          c_password:userByIdMemoization?.c_password
        })

      }
    },[userByIdMemoization]);
return (
    <div>
      {messageContext}
<Title level={3}>{editMode? "Edit User" :"Add User"}</Title>
<Form name="basic" autoComplete="off" onFinish={onUserDataSubmit} form={form}>
    <Form.Item name="username" 
    rules={[
        {
            required:true,
            message:"Please Enter User Name"
        }
    ]}
    >
        <Input placeholder="User Name"/>
    </Form.Item>
    <Form.Item name="user_firstname"
    rules={[
        {
            required:true,
            message:"Enter User's First Name"
        }
    ]}
    >
        <Input placeholder="First Name"/>
    </Form.Item>
    <Form.Item name="user_lastname" rules={[
        {
            required:true,
            message:"Enter User's Last Name"
        }
    ]}>
        <Input placeholder="Last Name"/>
    </Form.Item>
    <Form.Item name="email" rules={[
           {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        {
            required:true,
            message:"User email is required",
        }
    ]}>
        <Input placeholder="User Email"/>
    </Form.Item>
   
          <Form.Item
        name="password"
      
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="c_password"
        
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      {/* <Form.Item name="user_role" rules={[
        {
            required:true,
            message:"Select use role"

        }
    ]}>
        <Select placeholder="User Role">
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Subscriber">Subscriber</Select.Option>
        </Select>

    </Form.Item> */}
    <Form.Item >
    <CustomUpload customRequestCallback={customRequestCallbackFunction} />
    {
      userByIdMemoization?.user_image?(
        <img src={userByIdMemoization?.user_image}  alt={userByIdMemoization?.username} width="150"/>
      ): (
        <>{userId && <p>Image not found!</p>}</>
      )
    }
    </Form.Item>
    <Form.Item>
        <Button htmlType="submit" type="primary"  loading={createUserLoading  || getUserByIdLoading || userUpdateLoading }> {editMode ? "Edit User" : "Add User"}</Button>
    </Form.Item>
</Form>
    </div>
)
}
export default AddEditUser;