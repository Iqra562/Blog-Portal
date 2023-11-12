import {React,useMemo} from "react";
import { useMutation, useQuery } from "react-query";
import { Button,Col,
Modal,Row,Table,message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {  useNavigate } from "react-router-dom";
import { CategoriesServices } from "../../../services/categories.services";
import {AuthenticatedRoutesNames} from "../../../utilities/util.constant";
import { UtilService } from "../../../utilities/util.service";
const {confirm} = Modal;
function AdminCategories(){
    const navigate = useNavigate();
    const {data: categoryData,isLoading:categoryLoading, refetch: categoryRefresh} = useQuery("categories",()=>CategoriesServices.getCategories());    
    const catData = useMemo(
    ()=>categoryData?.data?.results,[categoryData?.data?.results]);
    const [messageApi,contextHolder] = message.useMessage();
    const { mutateAsync : deleteCategoryRequest, isLoading: categoryDeletingLoader,
    }=useMutation(CategoriesServices.deleteCategoryById)
    const deleteCategory = (singleCategory)=>{
    const {cat_id : categoryId} = singleCategory;
     confirm({
      title:"Do you want to delete this category?",
      icon:<ExclamationCircleOutlined />,
      onOk(){
        deleteCategoryRequest(categoryId,{
          onSuccess: ()=>{
            messageApi.success("category is deleted duccessfully!");
            categoryRefresh();
          },
        });

      }
     })
}
const columns = [
  {
    title:"Id",
    key:"id",
    render:(singleData)=>{
      return singleData.cat_id; 
    },
  },
  {
    title :"Category Title",
    key:"categoryTitle",
    render :(singleData)=>{
      return singleData.cat_title;

    }
  },
  {
    title :"Updated Date",
    key:"updatedDate",
    render:(singleData)=>{
     return UtilService.convertDateToMyFormat(singleData.updated_at);

    },
  },
  {
    title:"Created At",
    key:"created_at",
    render:(singleData)=>{
  return UtilService.convertDateToMyFormat(singleData.created_at);
    },
  },
  {
    title:"Edit",
    key:"edit",
    render:(singleCategory)=>{
      return <Button type="primary" onClick={()=>navigate(AuthenticatedRoutesNames.CATEGORY_EDIT.replace(
        ":id",
        singleCategory.cat_id
      ))}>Edit</Button>

    },
  },
  {
    title :"Delete",
    key:"delete",
    render :(singleCategory)=>{
      return(
  <Button type="default" onClick={()=> deleteCategory(singleCategory)}>Delete</Button>
      );
    },
  },
];

    return(
        <div>
           {contextHolder}
           <Row    type="flex"
        justify="space-between"
        align="middle"
        style={{ marginBottom: "20px" }}>

<Col>
          <h3
            style={{
              marginBottom: "0",
              marginTop: "0",
            }}
          >
            Categories
          </h3>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => {
                navigate(AuthenticatedRoutesNames.CATEGORY_ADD);
            }}
          >
            + Add Category
          </Button>
        </Col>
           </Row>
           <Table  loading={categoryLoading || categoryDeletingLoader} dataSource={catData} columns={columns}/>
        </div>
    )
}
export default AdminCategories