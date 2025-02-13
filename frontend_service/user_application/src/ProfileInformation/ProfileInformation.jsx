import { Button, Col, Input, Radio, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { loginBuyerDetails } from "../Redux/Action_Create/ActionCreate";

import { BiSolidUpArrowSquare } from "react-icons/bi";
import { PiUserFill } from "react-icons/pi";
import { IoMdWallet } from "react-icons/io";
import { RiFolderUserFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa";


const ProfileInformation = () => {

    const [isEditname, setIsEditName] = useState(true);
    const [isEditEmail, setIsEditEmail] = useState(true);
    const [isEditNumber, setIsEditNumber] = useState(true);

    const [buyerInfo, setBuyerInfo] = useState(useSelector(detail => detail.buyerAuthentication));

    const dispatch = useDispatch();

    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");

    const items1 = [
        {
            key: 'myOrder',
            icon: <BiSolidUpArrowSquare size={25} style={{ color: "blue" }} />,
            label: 'MY ORDERS',
        },
    ]
    const item2 = [
        {

            icon: <PiUserFill />,
            label: 'ACCOUNT SETTINGS',
            disabled: true,
        },
        {
            key: "profileInformation",
            label: 'Profile Information',
        },
        {
            key: "manageAddress",
            label: 'Manage Address',
        },
        {
            key: "panCardInformation",
            label: 'Pan Card Information',
        },
    ]
    const item3 = [
        {
            icon: <IoMdWallet />,
            label: 'PAYMENTS',
            disabled: true
        },
        {
            key: "giftCards",
            label: 'Gift Cards',
        },
        {
            key: "savedUPI",
            label: 'Saved UPI',
        },
        {
            key: "savedCards",
            label: 'Saved Cards',
        },
    ]
    const item4 = [
        {
            icon: <RiFolderUserFill />,
            label: "MY STUFF",
            disabled: true
        },
        {
            key: "myCoupons",
            label: "My Coupons"
        },
        {
            key: "myReviews&Ratings",
            label: "My Reviews & Ratings"
        },
        {
            key: "allNotification",
            label: "All Notification"
        },
        {
            key: "myWishlist",
            label: "My Wishlist"
        }
    ]

    const item5 = [
        {
            key: "logout",
            label: "LOGOUT",
            icon: <FaPowerOff />
        }
    ]
    // eslint-disable-next-line
    const items = [items1, item2, item3, item4, item5]

    const genderOption = [
        {
            label: 'Male',
            value: 'male',
        },
        {
            label: 'Female',
            value: 'female',
        }
    ];

    useEffect(() => {
            // if(id){
            async function updateData() {

                await axios.get(`http://localhost:3321/user/getUserDetals/${id || buyerInfo.u_id}`
                    , {
                        headers: {
                            Accept: "application/json"
                        },
                        withCredentials:true
                    }
                )
                    .then((response) => {
                        dispatch(loginBuyerDetails({ ...response.data.user, u_loggedIn: true }));
                        setBuyerInfo({ ...response.data.user, u_loggedIn: true });
                    })
                    .catch((error) => {
                        console.log(error);
                        alert(error.message);
                        dispatch(loginBuyerDetails({
                            u_id: "",
                            u_name: "",
                            u_phoneNumber: "",
                            u_emailAddress: "",
                            u_password: '',
                            u_carts: [],
                            u_whitelist: [],
                            u_loggedIn: false,
                        }))
                        setBuyerInfo({
                            u_id: "",
                            u_name: "",
                            u_phoneNumber: "",
                            u_emailAddress: "",
                            u_password: '',
                            u_carts: [],
                            u_whitelist: [],
                            u_loggedIn: false,
                        })
                    });

            }
            updateData()
        // }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Row style={{ lineHeight: 1.6 }}>
                <Typography style={{ fontWeight: 700 }}> Personal Information</Typography>
                <Col onClick={() => setIsEditName(!isEditname)} style={{ cursor: "pointer", marginLeft: 10, color: "blue", fontWeight: 650 }}>  {isEditname ? "Edit" : "Cancel"}</Col>
            </Row>
            <Row>
                {buyerInfo.u_loggedIn ?
                    <>
                        <Col span={6}><Input className="buyerInput" defaultValue={buyerInfo.u_name.split(" ")[0]} value={buyerInfo.u_name.split(" ")[0]} id="buyerFirstname" disabled={isEditname} placeholder={isEditname ? "" : "First Name"} /></Col>
                        <Col span={6} style={{ marginLeft: 10 }}><Input defaultValue={buyerInfo.u_name.split(" ")[1]} className="buyerInput" id="buyerSecondName" disabled={isEditname} placeholder={isEditname ? "" : "Last Name"} /></Col>
                    </>
                    :
                    <>
                        <Col span={6}><Input className="buyerInput" defaultValue={""} id="buyerFirstname" disabled={isEditname} placeholder={isEditname ? "" : "First Name"} /></Col>
                        <Col span={6} style={{ marginLeft: 10 }}><Input defaultValue={""} className="buyerInput" id="buyerSecondName" disabled={isEditname} placeholder={isEditname ? "" : "Last Name"} /></Col>

                    </>
                }
                <Col span={3} >
                    <Button className="saveButton" variant="solid" block style={{ backgroundColor: "blue", color: "whitesmoke", display: (isEditname ? "none" : "block") }} onClick={() => { setIsEditName(true) }} >Save</Button>
                </Col>

            </Row>

            <Row style={{ marginTop: 20, color: (isEditname ? "grey" : "") }}>
                Your Gender
            </Row>
            <Row>
                <Col span={6}> <Radio.Group block options={genderOption} id="buyerGender" defaultValue={"male"} disabled={isEditname} /></Col>
            </Row>

            <Row style={{ lineHeight: 1.6, marginTop: 20 }} >
                <Typography style={{ fontWeight: 700 }}>Email Address </Typography>
                <Col style={{ cursor: "pointer", marginLeft: 10, color: "blue", fontWeight: 650 }} onClick={() => setIsEditEmail(!isEditEmail)}>{isEditEmail ? "Edit" : "Cancel"}</Col>
            </Row>

            <Row>
                <Col span={6}>
                    {
                        buyerInfo.u_loggedIn ?
                            <Input className="buyerInput" id="buyerEmail" disabled={isEditEmail} defaultValue={buyerInfo.u_emailAddress} value={buyerInfo.u_emailAddress} />
                            :
                            <Input className="buyerInput" id="buyerEmail" disabled={isEditEmail} defaultValue={""} placeholder="EmailAddress" />

                    }
                </Col>
                <Col span={3} >
                    <Button className="saveButton" variant="solid" block style={{ backgroundColor: "blue", color: "whitesmoke", display: (isEditEmail ? "none" : "block") }} onClick={() => setIsEditEmail(true)} >Save</Button>
                </Col>
            </Row>

            <Row style={{ lineHeight: 1.6, marginTop: 20 }}>
                <Typography style={{ fontWeight: 700 }}>Mobile Number </Typography>
                <Col style={{ cursor: "pointer", marginLeft: 10, color: "blue", fontWeight: 650 }} onClick={() => setIsEditNumber(!isEditNumber)}>{isEditNumber ? "Edit" : "Cancel"}</Col>
            </Row>

            <Row>
                {
                    buyerInfo.u_loggedIn ?
                        <Col span={6}><Input className="buyerInput" id="buyerNumber" disabled={isEditNumber} defaultValue={buyerInfo.u_phoneNumber} value={buyerInfo.u_phoneNumber} /></Col>
                        :
                        <Col span={6}><Input className="buyerInput" id="buyerNumber" disabled={isEditNumber} defaultValue={buyerInfo.u_phoneNumber} /></Col>
                }
                <Col span={3} >
                    <Button className="saveButton" variant="solid" block style={{ backgroundColor: "blue", color: "whitesmoke", display: (isEditNumber ? "none" : "block") }} onClick={() => setIsEditNumber(true)} >Save</Button>
                </Col>
            </Row>

            <Typography.Title level={3}>FAQs</Typography.Title>
            <Typography.Title level={5}>What happens when I update my email address (or mobile number)?</Typography.Title>
            <Typography>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</Typography>
            <Typography.Title level={5}>When will my Flipkart account be updated with the new email address (or mobile number)?</Typography.Title>
            <Typography>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</Typography>
            <Typography.Title level={5}>What happens to my existing Flipkart account when I update my email address (or mobile number)?</Typography.Title>
            <Typography>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</Typography>
            <Typography.Title level={5}>Does my Seller account get affected when I update my email address?</Typography.Title>
            <Typography>Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</Typography>
            <Typography style={{ color: "lightblue", fontWeight: 700 }}>Deactivate Account</Typography>
            <Typography style={{ color: "red", fontWeight: 700 }}>Delete Account</Typography>
        </>
    )
}

export default ProfileInformation;