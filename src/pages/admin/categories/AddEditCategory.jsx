import React from "react";
import { Button,Form,Input,Typography,message } from "antd";
const {Title} =Typography
function AddEditCategory(){
    return(   <div>
    <Title level={3}>Add Category</Title>
    <Form name="basic" autoComplete="off">
        <Form.Item name="cat_title" rules={[
            {
            required : true,
            message : "Input field can't be empty",
        }
        ]}>
            <Input placeholder = "Category Title"/>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">Create Category</Button>
        </Form.Item>
    </Form>
   </div>
    )
}
export default AddEditCategory;