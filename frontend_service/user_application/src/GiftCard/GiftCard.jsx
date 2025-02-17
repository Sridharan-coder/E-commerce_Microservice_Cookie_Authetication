import { Col, Row, Button } from "antd";


const GiftCard = () => {

    return (
            <Col style={{ padding: 15 }}>
                <Row >
                    <p style={{ fontSize: 20, margin: 0, fontWeight: 600 }}>Flipkart Gift Card</p>
                </Row>
                <Row>
                    <Col span={24}>
                        <Button block style={{ justifyContent: "start", color: "#2874f0", height: 60, borderColor: "#2874f0", marginTop: "2em" }}>+ ADD A GIFT CARD</Button>
                    </Col>
                </Row>
                <Row>
                    <p style={{ fontSize: 20, fontWeight: 600, marginTop: "2em" }}>FAQs</p>
                </Row>
                <Row>
                    <p style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>How do I buy/gift a Flipkart Gift Card?</p>
                </Row>
                <ul>
                    <li style={{paddingTop:15,wordSpacing:3}}>
                        Enter the name and email address of the person you want to send the Flipkart Gift Card to.
                    </li>
                    <li style={{paddingTop:15,wordSpacing:3}}>
                        Select the value of the card you would like to purchase, then click 'Proceed To Pay'.
                    </li>
                    <li style={{paddingTop:15,wordSpacing:3}}>
                        You'll now see the payment options. You can pay by Credit Card / Debit Card / ATM Card / Netbanking. Proceed to pay using your preferred choice. If you need to make any changes to the Gift Card value, you can always click 'Edit' to modify it.
                    </li>
                    <li style={{paddingTop:15,wordSpacing:3}}>
                        Complete the checkout process to receive an email with the Gift Card details.
                    </li>
                </ul>
                <Row>
                    <p style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>How do I pay with a Flipkart Gift Card?</p>
                </Row>
                <ul>
                    <li style={{paddingTop:15,wordSpacing:3}}>
                        Go to flipkart.com and select the items you want to purchase. When you are ready to checkout, click 'Proceed To Pay'.
                    </li>
                    <li style={{paddingTop:15,wordSpacing:3}}>
                        Select the 'Pay By Gift Card' option.
                    </li>
                    <li style={{paddingTop:15,wordSpacing:3}}>
                        Enter your 16-digit gift card number and the corresponding 6-digit PIN number when prompted.
                    </li>
                    <li style={{paddingTop:15,wordSpacing:3}}>
                        If the Gift Card value doesn't cover your Order total, you will be prompted to select an additional payment method.
                    </li>
                    <p>
                        NOTE: Funds will be deducted from your Flipkart Gift Card when you place your order. In case of any adjustment or cancellation at a later stage, we will credit the refund back to your Gift Card.
                    </p>
                </ul>
                <Row>
                    <p style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>Does my Flipkart Gift Card expire?</p>
                </Row>
                <Row>
                    <p>All Flipkart Gift Cards expire 1 year from the date of their creation.</p>
                </Row>
                <Row>
                    <p style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>Terms & Conditions</p>
                </Row>
                <ul style={{ fontSize: 12 }}>
                    <li style={{paddingTop:15,wordSpacing:1}}>
                        Flipkart Gift Cards (“GCs” or “Gift Cards”) are issued by Qwikcilver Solutions Pvt. Ltd. ('Qwikcilver') which is a private limited company incorporated under the laws of India, and is authorized by the Reserve Bank of India ('RBI') to issue such Gift Cards.
                    </li>
                    <li style={{paddingTop:15,wordSpacing:1}}>
                        The Gift Cards can be redeemed online against Sellers listed on www.flipkart.com or Flipkart Mobile App or Flipkart m-site ('Platform') only.
                    </li>
                    <li style={{paddingTop:15,wordSpacing:1}}>
                        Gift Cards can be purchased on www.flipkart.com or Flipkart Mobile App using the following payment modes only - Credit Card, Debit Card and Net Banking.
                    </li>
                    <li style={{paddingTop:15,wordSpacing:1}}>
                        Gift Cards can be redeemed by selecting the payment mode as Gift Card.
                    </li>
                    <li style={{paddingTop:15,wordSpacing:1}}>
                        Gift Cards cannot be used to purchase other Flipkart Gift Cards or Flipkart First subscriptions.
                    </li>
                    <li style={{paddingTop:15,wordSpacing:1}}>
                        Gift Cards cannot be used to make bulk purchases on the Platform.
                    </li>
                    <li style={{paddingTop:15,wordSpacing:1}}>
                        If the order value exceeds the Gift Card amount, the balance must be paid by Credit Card/Debit Card/Internet Banking. The Cash on Delivery payment option cannot be used to pay the balance amount.
                    </li>
                </ul>
            </Col>
        )
}

export default GiftCard;