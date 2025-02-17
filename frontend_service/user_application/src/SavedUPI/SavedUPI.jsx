import { Col, Row } from "antd";

const SavedUPI=()=>{

    return(
        <Col style={{ padding: 25 }}>
                <Row >
                    <p style={{ fontSize: 20, margin: 0, fontWeight: 600 }}>No VPAs saved to be shown</p>
                </Row>
                <Row>
                    <p style={{ fontSize: 20, fontWeight: 600, marginTop: "2em" }}>FAQs</p>
                </Row>
                <Row>
                    <p style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>How do I buy/gift a Flipkart Gift Card?</p>
                </Row>
                <Row>
                    <p style={{wordSpacing:1.5}}>
                    It's quicker. You can save the hassle of typing in the complete UPI information every time you shop at Flipkart by saving your UPI details. You can make your payment by selecting the saved UPI ID of your choice at checkout. While this is obviously faster, it is also very secure.
                    </p>
                </Row>
                <Row>
                    <p style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>Is it safe to save my UPI on Flipkart?</p>
                </Row>
                <Row>
                    <p style={{wordSpacing:1.5}}>
                    Absolutely. Your UPI ID information is 100 percent safe with us. UPI ID details are non PCI compliant and are non confidential data.
                    </p>
                </Row>
                <Row>
                    <p style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>What all UPI information does Flipkart store?</p>
                </Row>
                <Row>
                    <p style={{wordSpacing:1.5}}>
                    Flipkart only stores UPI ID and payment provider details. We do not store UPI PIN/MPIN.
                    </p>
                </Row>
                <Row>
                    <p style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>Can I delete my saved UPI?</p>
                </Row>
                <Row>
                    <p style={{wordSpacing:1.5}}>
                    Yes, you can delete your UPI ID at any given time.
                    </p>
                </Row>
            </Col>
    )

}

export default SavedUPI;