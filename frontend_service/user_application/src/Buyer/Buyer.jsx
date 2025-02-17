import { Menu, Col, Row, Spin } from "antd";
import { Suspense, useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';

import { BiSolidUpArrowSquare } from "react-icons/bi";
import { PiUserFill } from "react-icons/pi";
import { IoMdWallet } from "react-icons/io";
import { RiFolderUserFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa";
import InnerRouting from "../Routings/InnerRouting";

const Buyer = ({setIsMaintance}) => {

    const location = useLocation()

    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");

    const [path, setPath] = useState(location.pathname === "/buyer" ? `/profileInformation?id=${id}` : location.pathname)

    const [buyerInfo, setBuyerInfo] = useState(useSelector(detail => detail.buyerAuthentication));

    const navigate = useNavigate();
    
    const items1 = [
        {
            key: 'myOrder',
            icon: <BiSolidUpArrowSquare size={25} style={{ color: "blue" }} />,
            label: <b style={{color:"grey"}}>MY ORDERS</b>,
        },
    ]
    const item2 = [
        {

            icon: <PiUserFill />,
            label: <b>ACCOUNT SETTINGS</b>,
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
            label: <b>PAYMENTS</b>,
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
            label: <b>MY STUFF</b>,
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
            label: <b>LOGOUT</b>,
            icon: <FaPowerOff />
        }
    ]

    const items = [items1, item2, item3, item4, item5]

    // useEffect(() => {
    //     async function updateData() {

    //         await axios.get(`http://localhost:3321/user/getUserDetals/${id}`
    //             , {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                     Accept: "application/json"
    //                 }

    //             }
    //         )
    //             .then((response) => {
    //                 dispatch(loginBuyerDetails({ ...response.data.user, u_loggedIn: true }));
    //                 setBuyerInfo({ ...response.data.user, u_loggedIn: true });
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 alert(error.message);
    //                 dispatch(loginBuyerDetails({
    //                     u_id: "",
    //                     u_name: "",
    //                     u_phoneNumber: "",
    //                     u_emailAddress: "",
    //                     u_password: '',
    //                     u_carts: [],
    //                     u_whitelist: [],
    //                     u_loggedIn: false,
    //                     u_token: ""
    //                 }))
    //                 setBuyerInfo({
    //                     u_id: "",
    //                     u_name: "",
    //                     u_phoneNumber: "",
    //                     u_emailAddress: "",
    //                     u_password: '',
    //                     u_carts: [],
    //                     u_whitelist: [],
    //                     u_loggedIn: false,
    //                     u_token: ""
    //                 })
    //             });

    //     }
    //     updateData()
    //     // eslint-disable-next-line
    // }, [])

    useEffect(() => {
        navigate(path)
        // eslint-disable-next-line
    }, [setPath])
    return (
        <>
            <div className="demo" style={{ position: "relative" }}>
                <Header setIsMaintance={setIsMaintance} buyerInfo={buyerInfo} setBuyerInfo={setBuyerInfo} />
            </div>
            <div className="applicationContents">
                <Row style={{ margin: 5 }}>
                    <Col span={3} style={{ backgroundColor: "#ebebeb" }}>
                    </Col>
                    <Col span={4}>
                        <Col span={23}>
                            {items.map((item, index) => {
                                return (
                                    <Menu
                                        key={index + "menu"}
                                        defaultSelectedKeys={['profileInformation']}
                                        defaultOpenKeys={['sub1']}
                                        items={item}
                                        style={{ borderBottom: "1px solid grey" }}
                                        onClick={(val) => {
                                            setPath(val.key)
                                            setTimeout(() => navigate(val.key), 1000)
                                          }
                                        }
                                    />
                                )
                            })}
                        </Col>
                        <Col span={1} style={{ backgroundColor: "#ebebeb" }}></Col>
                    </Col>
                    <Col span={14} style={{ backgroundColor: "white" }}>

                        <Routes>
                            {InnerRouting.map((route, index) => {
                                let Component = route.component;
                                return (
                                    <Route
                                        key={`route-${index}`}
                                        path={route.path}
                                        element={
                                            <Suspense
                                                fallback={
                                                    <Row
                                                        justify="center"
                                                        style={{ lineHeight: "697px" }}
                                                    >
                                                        <Col>
                                                            <Spin size="large" />
                                                        </Col>
                                                    </Row>
                                                }
                                            >
                                                <Component setIsMaintance={setIsMaintance} />
                                            </Suspense>
                                        }
                                    />
                                );
                            })}
                        </Routes>

                    </Col>
                    <Col span={3}></Col>
                </Row>
                <Footer />
            </div>
        </>
    )
}

export default Buyer;