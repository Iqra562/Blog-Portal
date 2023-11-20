import {
    Typography,
    Input,
    Select,
    DatePicker,
    Form,
    Button,
    message,
  } from "antd";
  import { useMutation, useQuery } from "react-query";
  import React, { useMemo,useState } from "react";
  import { PostServices } from "../../../services/post.services";
  import { useNavigate } from "react-router-dom";
  import { CategoriesServices } from "../../../services/categories.services";
import { AuthenticatedRoutesNames } from "../../../utilities/util.constant";
import CustomUpload from "../../../components/CustomUpload/CustomUpload";

function AddEditPost(){
    const navigate = useNavigate();
    const [messageApi, messageContext] = message.useMessage();
    const [saveFile, setSaveFile] = useState(null);
    // get categories
    const { data: categoryData, isLoading: loadCategory } = useQuery(
    "categories",
    () => CategoriesServices.getCategories()
  );
  // category memoization
   const categoryDataMemoization = useMemo(
    () => categoryData?.data?.results,
    [categoryData?.data?.results]
  );
  // create post request 
  const { mutateAsync: PostRequest, isLoading: PostRequestLaoder } =
    useMutation(PostServices.addPost);
    const onPostSubmit = (values) => {
      
      PostRequest(values, {
        onSuccess: () => {
          messageApi.success("Post  created successfully!");
          navigate(AuthenticatedRoutesNames.POSTS);
        },
      });
    };
    const customRequestCallback = (file) => {
      setSaveFile(file);
    };
return(
    <div>
    {messageContext}
    <Typography.Title level={3}>Create Post</Typography.Title>

    <Form name="basic" autoComplete="off" onFinish={onPostSubmit}>
      <Form.Item
        name="post_title"
        rules={[
          {
            required: true,
            message: "Post title can't be empty",
          },
        ]}
      >
        <Input placeholder="Post title" />
      </Form.Item>

      <Form.Item
        name="post_category_id"
        rules={[
          {
            required: true,
            message: "Select Post Category",
          },
        ]}
      >
        <Select placeholder="Post Category">
          {categoryDataMemoization?.map((singleCategory) => {
            return (
              <Select.Option value={singleCategory.cat_id}>
                {singleCategory.cat_title}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name="post_author"
        rules={[
          {
            required: true,
            message: "Insert Post author",
          },
        ]}
      >
        <Input placeholder="Post Author" />
      </Form.Item>

      <Form.Item
        name="post_date"
        rules={[
          {
            required: true,
            message: "Please input  post date!",
          },
        ]}
      >
        <DatePicker className="w-100" />
      </Form.Item>

      <Form.Item
        name="post_content"
        rules={[
          {
            required: true,
            message: "Please input  post content!",
          },
        ]}
      >
        <Input.TextArea rows={4} placeholder="Post Content" />
      </Form.Item>
      <Form.Item
        name="post_tags"
        rules={[
          {
            required: true,
            message: "Please input your post tags !",
          },
        ]}
      >
        <Input placeholder="Post Tags " />
      </Form.Item>
      <Form.Item
        name="post_status"
        rules={[
          {
            required: true,
            message: "Select post status!",
          },
        ]}
      >
        <Select placeholder="Post Status">
          <Select.Option value="draft">Draft</Select.Option>
          <Select.Option value="publish">Publish</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
      <CustomUpload customRequestCallback={customRequestCallback} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={PostRequestLaoder}>
          Create Post
        </Button>
      </Form.Item>
    </Form>
  </div>
)
      
}
export default AddEditPost;