import { Col, Row, Form, Input, Button } from "antd";


const PanCardInformation = () => {

    return (
        <Col style={{padding:10}}>
            <Row style={{ padding: 15 }}>
                <p style={{ fontSize: 20, margin: 0, fontWeight: 600 }}>PAN Card Information</p>
            </Row>
            <Row style={{ padding: 15 }}>
                <Col>
                    <Form
                        method="post"
                        name="validateOnly"
                        layout="vertical"
                        size={"large"}
                        autoComplete="off"
                        className="addUserForm"
                    //  onFinish={(Values) => onRegister(Values)}
                    >
                        <Row>
                            <Form.Item
                                name="panCardNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter Email !",
                                    },
                                ]}
                            >
                                <Input type="text" placeholder="Enter the PAN Card Number" pattern="[A-Z][A-Z0-9][A-Z0-9][A-Z0-9][A-Z0-9][A-Z0-9]" />

                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter Full Name !",
                                    },
                                ]}
                            >
                                <Input type="text" placeholder="Full Name" />

                            </Form.Item>
                        </Row>

                        <Row>
                            <Form.Item
                                name="checkbox"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please accept the conditions !",
                                    },
                                ]}
                            >
                                <Row style={{flexWrap:'nowrap'}} >
                                    <Col span={1} style={{marginRight:10}}>
                                        <Input type="checkbox" />
                                    </Col>
                                    <Col span={23}>
                                        <p style={{margin:0}}>I do hereby declare that PAN furnished/stated above is correct and belongs to me, registered as an account holder with www.flipkart.com. I further declare that I shall solely be held responsible for the consequences, in case of any false PAN declaration</p>
                                    </Col>
                                </Row>
                            </Form.Item>

                            
                        </Row>

                        <Row>
                            <Form.Item
                            name="upload"
                            >
                                 <Button style={{backgroundColor:"#2874f0",color:"whitesmoke"}}>Upload</Button>

                            </Form.Item>
                        </Row>

                    </Form>
                </Col>
            </Row>

            <Row style={{padding:20}}>
               <p style={{color:"#2874f0",fontWeight:600,cursor:'pointer'}}>Read Terms & Conditions of PAN Card Information</p> 
            </Row>

        </Col>
    )
}

export default PanCardInformation;