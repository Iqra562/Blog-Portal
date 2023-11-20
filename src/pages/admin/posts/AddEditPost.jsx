import {
  Form,
  Input,
  Button,
  Typography,
  DatePicker,
  message,
  Select,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesServices } from "../../../services/categories.services";
import { PostServices } from "../../../services/post.services";
import { AuthenticatedRoutesNames } from "../../../utilities/util.constant";
import moment from "moment/moment";
import CustomUpload from "../../../components/CustomUpload/CustomUpload";

function AddEditPost() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [saveFile, setSaveFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { postId } = useParams();
  const [messageApi, messageContext] = message.useMessage();
  // get Categories 
  const { data: categoryData, isLoading: categoryLoading } = useQuery(
    "categories",
    () => CategoriesServices.getCategories()
  );
  // categoriy memoization 
  const categoryDataMemoization = useMemo(
    () => categoryData?.data?.results,
    [categoryData?.data?.results]
  );

// get post by id 
  const { data: getPostById, isLoading: getPostByIdLoader } = useQuery(
    ["posts", postId],
    () => PostServices.getPostById(postId),
    {
      enabled: Boolean(postId),
    }
  );
  // get post by id memoization 
  const getPostByIdMemoization = useMemo(
    () => getPostById?.data?.results,
    [getPostById?.data?.results]
  );
  // create post request 
  const { mutateAsync: createPost, isLoading: createPostLoading } =
    useMutation(PostServices.addPost);
    // update post request 
  const { mutateAsync: updatePostRequest, isLoading: updatePostLoader } =
    useMutation((payload) => PostServices.updatePostById(postId, payload));

  useEffect(() => {
    if (postId) {
      setEditMode(true);
    }
  }, [postId]);



  const PostFormSubmit = (values) => {
    const formData = new FormData();
    formData.append("post_title", values?.post_title);
    formData.append("post_category_id", values?.post_category_id);
    formData.append("post_content", values?.post_content);
    formData.append("post_date", values?.post_date);
    formData.append("post_status", values?.post_status);
    formData.append("post_tags", values?.post_tags);
    formData.append("post_author", values?.post_author);

    if (saveFile) {
      formData.append("post_image", saveFile); 
    }
    if (editMode) {
      updatePostRequest(formData, {
        onSuccess: () => {
          messageApi.success("post  updated successfully!");
          navigate(AuthenticatedRoutesNames.POSTS);
        },
      });
    } else {
      
      createPost(formData, {
        onSuccess: () => {
          messageApi.success("post  created successfully!");
          navigate(AuthenticatedRoutesNames.POSTS);
        },
      });
    }
  };

  const customRequestCallbackFunction = (file) => {
    setSaveFile(file);
  };


  useEffect(() => {
    if (getPostByIdMemoization) {
      form.setFieldsValue({
        post_title: getPostByIdMemoization?.post_title,
        post_category_id: getPostByIdMemoization?.post_category_id,
        post_content: getPostByIdMemoization?.post_content,
        post_status: getPostByIdMemoization?.post_status,
        post_date: moment(getPostByIdMemoization?.post_date),
        post_tags: getPostByIdMemoization?.post_tags,
        post_author: getPostByIdMemoization?.post_author,
      });
    }
  }, [getPostByIdMemoization]);

  return (
    <div>
      {messageContext}
      <Typography.Title level={3}>
        {editMode ? "Update" : "Create"} Post
      </Typography.Title>

      <Form
        name="basic"
        autoComplete="off"
        form={form}
        onFinish={PostFormSubmit}
      >
        <Form.Item
          name="post_title"
          rules={[
            {
              required: true,
              message: "Enter post title!",
            },
          ]}
        >
          <Input placeholder="Post Title" />
        </Form.Item>

        <Form.Item
          name="post_category_id"
          rules={[
            {
              required: true,
              message: "Input  post category ",
            },
          ]}
        >
          <Select placeholder="Post Category" loading={categoryLoading}>
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
              message: "Input  post author",
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
              message: "Input  post date!",
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
              message: "Input  post content!",
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Post Content" />
        </Form.Item>

        <Form.Item
          name="post_status"
          rules={[
            {
              required: true,
              message: "Input  post status!",
            },
          ]}
        >
          <Select placeholder="Post Status">
            <Select.Option value="draft">Draft</Select.Option>
            <Select.Option value="publish">Publish</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="post_tags"
          rules={[
            {
              required: true,
              message: "Input post tags ",
            },
          ]}
        >
          <Input placeholder="Post Tags " />
        </Form.Item>

        <Form.Item>
          <CustomUpload customRequestCallback={customRequestCallbackFunction} />

          {getPostByIdMemoization?.image ? (
            <img
              src={getPostByIdMemoization?.image}
              alt={getPostByIdMemoization?.post_title}
              width={200}
            
            />
          ) : (
            <> {postId && <p>Image Not Found</p>} </>
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={
              categoryLoading ||
              createPostLoading ||
              getPostByIdLoader||
              updatePostLoader 
            }
          >
            {editMode ? "Update Post" : "Create Post"} 
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddEditPost;