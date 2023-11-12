import { PostServices } from "../../services/post.services";

function AdminPosts(){
    const  {data: postData, isLoading : getPostData} = useQuery("posts", PostServices.getPosts);
return(
<div>
  
    <Row type="flex"  justify="space-between"  align="middle"  style={{ marginBottom: "20px" }}  >
        <Col>
          <h3
            style={{
              marginBottom: "0",
              marginTop: "0",
            }}
          >
            Posts
          </h3>
        </Col>
        <Col>
          <Button type="primary">+ Add Post</Button>
        </Col>
    </Row>
    <Table   columns={null}/>
 </div>


)
}
export default AdminPosts;