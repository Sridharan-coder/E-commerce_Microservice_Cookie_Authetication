import { Col, Row, Button } from "antd";


const ManagingAddress = () => {

    return (
        <Col style={{padding:10}}>
            <Row style={{ padding: 15 }}>
                <p style={{ fontSize: 20, margin: 0, fontWeight: 600 }}>Manage Addresses</p>
            </Row>
            <Row>
                <Col span={24}>
                    <Button block style={{justifyContent:"start",color:"#2874f0",height:60,borderColor:"#2874f0"}}>+ ADD A NEW ADDRESS</Button>
                </Col>
            </Row>
            
        </Col>
    )
}

export default ManagingAddress;