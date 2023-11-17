import { DatePicker, Form, Select, message,Input,Button } from "antd";
import Typography from "antd/es/typography/Typography";
import { useQuery,useMutation } from "react-query";
import { CategoriesServices } from "../../../services/categories.services";
import { useMemo } from "react";
import { PostServices } from "../../../services/post.services";
import { useNavigate } from "react-router-dom";
import { AuthenticatedRoutesNames } from "../../../utilities/util.constant";

function AddEditPost(){
    const navigate =  useNavigate();
    const [messageApi,messageContext] = message.useMessage();
    const {data: categoryData, isLoading: categoryLoader}= useQuery("categories",()=>CategoriesServices.getCategories());
    const categoryDataMemoization = useMemo(
        ()=>categoryData?.data?.results,[categoryData?.data?.results]
    );
    const {mutateAsync:createPostRequest,isLoading:createPostLoader}= useMutation(PostServices.addPost)
    const submitPost = (values)=>{
        createPostRequest(values,{
            onSuccess:()=>{
                messageApi.success("Post is created successfully");
                navigate(AuthenticatedRoutesNames.POSTS)
            },
        })
    }
return(
    <div>
        {messageContext}
        <Typography.Title level={3}>Create Post</Typography.Title>
        <Form name="basic" autoComplete="off" onFinish={submitPost}>
            <Form.Item name="post_title" rules={[
                {
                    required:true,
                    message:"post title can't be empty",
                },

            ]}>
                <Input placeholder="Post Title"/>
            </Form.Item>
            <Form.Item name="post_category_id" rules={[
                {
                    required:true,
                    message:"post category can't be empty",
                }
            ]}>
                <Select placeholder="Post category Id" loading={categoryLoader}>
                    {categoryDataMemoization?.map((singleCategory)=>{
                        return(
                            <Select.Option value={singleCategory.cat_id}>
                            {singleCategory.cat_title}
                            </Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>
            <Form.Item name="post_author"
            rules={[
                {
                    required:true,
                    message:"Author name can't be empty"
                }
            ]}
            >
                <Input placeholder="Post Author"/>
            </Form.Item>
            <Form.Item
            name="post_date"
            rules={[
                {
                    required:true,
                    message:"Select Date"
                }
            ]}
            >
                <DatePicker className="w-100"/>
            </Form.Item>
            <Form.Item 
            name="post_content"
            rules={[
                {
                    required:true,
                    message:"Post content is necessary"
                }
            ]}
            >
                <Input.TextArea rows={4} placeholder="Post content"/>
            </Form.Item>
            <Form.Item
            name="post_status"
            rules={[
                {
                    required:true,
                    message:"Input post status"
                }
            ]}
            >
<Select placeholder="Post Status">
    <Select.Option value="draft">Draft</Select.Option>
    <Select.Option value="publish">Publish</Select.Option>
</Select>
            </Form.Item>
            <Form.Item name="post_tags"
            rules={[
                {
                    required:true,
                    message:"Input post tags"
                }
            ]}
            >
                <Input placeholder="Post Tags"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={createPostLoader}>Create Post</Button>
            </Form.Item>
            </Form>
    </div>
)
}
export default AddEditPost;