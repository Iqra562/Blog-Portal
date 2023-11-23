import { Button, Form, Input,Select, message } from "antd";
import Title from "antd/es/skeleton/Title";
import CustomUpload from "../../../components/CustomUpload/CustomUpload";
import { useState } from "react";
import { useMutation } from "react-query";
import { UserServices } from "../../../services/user.service";
import { useNavigate } from "react-router-dom";
import { AuthenticatedRoutesNames } from "../../../utilities/util.constant";

function AddEditUser(){
    const [form] = Form.useForm();
    const [saveFile,setSaveFile] = useState(null);
    const [messageApi,messageContext]= message.useMessage();
    const navigate = useNavigate();
    // useMutation to add user 
    const {mutateAsync:createUser,isLoading:createUserLoading} = useMutation(UserServices.addUser);

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
        createUser(formData, {
            onSuccess: () => {
              messageApi.success("post  created successfully!");
              navigate(AuthenticatedRoutesNames.USERS);
            },
          });

    }
return (
    <div>
<Title level={3}>Add User</Title>
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
    </Form.Item>
    <Form.Item>
        <Button htmlType="submit" type="primary" >Add User</Button>
    </Form.Item>
</Form>
    </div>
)
}
export default AddEditUser;