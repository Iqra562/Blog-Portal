import React from "react";
import { Button, Form, Input, Typography } from "antd";
import {UserServices} from "../services/user.service";
import {AuthUtils} from "../utilities/Auth.util";
import {useMutation} from "react-query";
import { AuthenticatedRoutesNames } from "../utilities/util.constant";


const { Title } = Typography;

function Login() {
  const { mutateAsync: loginRequest , isLoading: loginRequestLoader} = useMutation(UserServices.login);
  const onFinish = async (values) => {
    await loginRequest(values,{
      onSuccess: (data)=>{
        const token = data?.data?.results?.token;
        AuthUtils.saveToken(token);
        window.location.reload(true);
            window.location.href= AuthenticatedRoutesNames.HOME;
                  }
    });
  };
  return (
    <div className="" style={{marginTop:"10%"}}>
      <Title level={2}>Login</Title>

      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="email"
          rules={[
            {
              require: true,
              message: "Please input your email",
              value:"examplePassword" 
            },
          ]}
          initialValue="admin123@"
        >
          <Input placeholder="Type Your Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              require: true,
              message: "Please input your password",
            },
          ]}
          initialValue="oscar41@example.net"
        >
          <Input.Password placeholder="Type Your Password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loginRequestLoader}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
