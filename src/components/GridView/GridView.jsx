import {React} from "react";
import { Button,Col,Row,Table } from "antd";
function GridView(props){
   const {
    headings = "",
    addBtnText = "",
    addBtnClick= ()=>{},
    ...otherProps
   } = props;
    return(
        <div>
           
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
            {headings}
          </h3>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={addBtnClick}
          >
            {addBtnText}
          </Button>
        </Col>
           </Row>
           <Table  {...otherProps} />
        </div>
    )
}
export default GridView;