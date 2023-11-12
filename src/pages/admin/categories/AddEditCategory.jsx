import React, { useEffect, useState } from "react";
import { Button,Form,Input,Typography,message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useMessage from "antd/es/message/useMessage";
import { useMutation, useQuery } from "react-query";
import { CategoriesServices } from "../../../services/categories.services";
import { AuthenticatedRoutesNames } from "../../../utilities/util.constant";
const {Title} =Typography
function AddEditCategory(){
    const {id: categoryId}= useParams();
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = useMessage();
    const {mutateAsync:addCategoryRequest , isLoading:addCategoryLoader} = useMutation(CategoriesServices.addCategory);
const {mutateAsync:updateCategoryRequest, isLoading: updateCategoryLoader,
} = useMutation((payload)=>{
  CategoriesServices.updateCategory(categoryId,payload)
});


const [form] = Form.useForm();
const {data: editCategoryData, isLoading:editCategoryLoader} = useQuery(["category_id",categoryId],()=>CategoriesServices.getCategoryById(categoryId));

useEffect(()=>{
    if(categoryId){
        setEditMode(true);
    }
},[categoryId]);
useEffect(()=>{
    if(editCategoryData){
const singleCategoryData = editCategoryData?.data?.results;
form.setFieldValue({
    cat_title: singleCategoryData?.cat_title,
});
    }
},[editCategoryData])

const onFinish = (values)=>{
    if(editMode){
        updateCategoryRequest(values,{
            onSuccess: ()=>{
                messageApi.success("category is update!");
                setTimeout(()=>{
                    navigate(AuthenticatedRoutesNames.CATEGORIES);
                },100)
            }
        })
    }else{
addCategoryRequest(values,{
    onSuccess: ()=>{
        messageApi.success("category is created successfully");
        setTimeout(()=>{
            navigate(AuthenticatedRoutesNames.CATEGORIES)
        },1000)
    }
}

)
    }
}

    return(  
         <div>
            {contextHolder}
    <Title level={3}>{editMode ? "Edit" : "Add"} </Title>
    <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
        <Form.Item name="cat_title" rules={[
            {
            required : true,
            message : "Input field can't be empty",
        }
        ]}>
            <Input placeholder = "Category Title"/>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" loading={addCategoryLoader || editCategoryLoader || updateCategoryLoader}>{editMode ? "Update" : "Create"}</Button>
        </Form.Item>
    </Form>
   </div>
    )
}
export default AddEditCategory;