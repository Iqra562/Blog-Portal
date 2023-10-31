import {React,useMemo} from "react";
import { useQuery } from "react-query";
import { Button,Col,
Modal,Row,Table,message } from "antd";
import {  useNavigate } from "react-router-dom";
import { CategoriesServices } from "../../../services/categories.services";
import {AuthenticatedRoutesNames} from "../../../utilities/util.constant";
  function AdminCategories(){
    const navigate = useNavigate();
    const {data: categoryData,isLoading:categoryLoading} = useQuery("categories",()=>CategoriesServices.getCategories());
const catData = useMemo(
    ()=>categoryData?.data?.results,[categoryData?.data?.results]
)
const columns = [
  {
    title:"Id",
    key:"id",
    render:(singleData)=>{
      return singleData.cat_id; 
    },
  }
]

    return(
        <div>
           {/* {contextHolder} */}
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
           <Table dataSource={catData} columns={columns}/>
        </div>
    )
}
export default AdminCategories