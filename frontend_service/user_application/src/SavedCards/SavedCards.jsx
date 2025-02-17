import { Col, Row } from "antd";

const SavedCards = () => {

    return (
        <Col style={{ padding: 25 }}>
            <Row >
                <p style={{ fontSize: 20, margin: 0, fontWeight: 600 }}>Manage Saved Cards</p>
            </Row>
            <Row>
                <p style={{ fontSize: 20, fontWeight: 600, marginTop: "2em" }}>FAQs</p>
            </Row>
            <Row>
                <p style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>Why is my card being tokenised?</p>
            </Row>
            <Row>
                <p style={{ wordSpacing: 1.5 }}>
                    As per the new RBI guidelines to make card data more secure, merchants like Flipkart cannot store the card details of users. As an alternative, RBI has authorised card networks and card issuers to offer card tokenisation services, which means the replacement of actual credit and debit card details with an alternate code called “token”. The user can either choose to tokenise their card by giving consent for future transactions or choose to continue without tokenisation.
                </p>
            </Row>
            <Row>
                <p style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>What is a token?</p>
            </Row>
            <Row>
                <p style={{ wordSpacing: 1.5 }}>
                    A token is generated when a user gives consent to Flipkart to tokenise their card. A token is a unique value for a combination of card, token requestor (Flipkart is a token requestor & accepts request from the customer for tokenisation of a card and passes it onto the card network to issue a corresponding token) and device. The token does not contain any personal information linked to your card and is generated only when a customer uses a new card for a successful transaction on Flipkart.
                </p>
            </Row>
            <Row>
                <p style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>Is it safe to tokenise my card?</p>
            </Row>
            <Row>
                <p style={{ wordSpacing: 1.5 }}>
                    Yes. A tokenised card transaction is considered safer as the actual card details are not shared with the Flipkart during transaction processing . Card information is stored with the authorised card networks or card issuers only and Flipkart does not store your 16-digit card number.
                </p>
            </Row>
            <Row>
                <p style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>Is tokenisation of card mandatory?</p>
            </Row>
            <Row>
                <p style={{ wordSpacing: 1.5 }}>
                    No, customer can choose whether or not to tokenise their card.
                </p>
            </Row>
            <Row>
                <p style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>What happens if I don’t give consent to secure my card?</p>
            </Row>
            <Row>
                <p style={{ wordSpacing: 1.5 }}>
                    If you don’t give consent to tokenise your card, you need to enter your card details for every transaction as stipulated under the RBI guidelines.
                </p>
            </Row>
        </Col>
    )

}

export default SavedCards;