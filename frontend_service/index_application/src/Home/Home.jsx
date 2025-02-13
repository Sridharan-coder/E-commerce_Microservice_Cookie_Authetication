import { Button, Col, Form, Input, Menu, Modal, Row } from "antd";

import Flipkart_Logo_1 from "../Assest/Flipkart_Logo_1.png";

import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { LuCross } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { IoHeartOutline, IoNotificationsOutline } from "react-icons/io5";
import { GoTag, GoCreditCard } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import {
    PiShoppingCart,
    PiHeadsetLight,
    PiDownloadSimpleThin,
} from "react-icons/pi";
import { AiOutlineShop, AiOutlineRise } from "react-icons/ai";
import { RiMore2Line } from "react-icons/ri";

import Dashboard from "../Dashboard/Dashboard";
import Carousal from "../Carousal/Carousal";
import Footer from "../Footer/Footer";
import TopStories from "../TopStories/TopStories";
import BestOfElectronics from "../BestOfElectronics/BestOfElectronics";
import { useNavigate } from "react-router-dom";
import BestOfFashion from "../BestOfFashion/BestOfFashion";
import BestOfGrocery from "../BesOfGrocery/BestOfGrocery";
import BestOfMobile from "../BestOfMobile/BestOfMobile";
import BestOfMore from "../BestOfMore/BestOfMore";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginBuyerDetails, logoutBuyerDetails } from "../Redux/Action_Create/ActionCreate";
import { useEffect, useState } from "react";

function Home() {


    const [isRegisterOpen, setIsRegisterOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [buyerInfo, setBuyerInfo] = useState(useSelector(item => item.buyerAuthentication))

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [form1] = Form.useForm();

    const items = [
        {
            key: "logo",
            label: (
                <span>
                    <img
                        alt="logo"
                        srcSet={Flipkart_Logo_1}
                        width={"95vw"}
                        style={{ marginTop: 8 }}
                    />
                </span>
            ),
        },
        {
            key: "search",
            label: (
                <>
                    <Input
                        prefix={<CiSearch size={23} />}
                        placeholder="Search for Products, Brand and more"
                        style={{ backgroundColor: "#e5edf7", width: "49.5vw" }}
                    />
                </>
            ),
        },
        {
            // label: `Navigation Three - Submenu${return (</i>)}`,
            label: `Account`,
            key: "account",
            icon: <CgProfile size={20} />,
            children: [
                {
                    label: "My profile",
                    key: "myProfile",
                    icon: <CgProfile />,
                },
                {
                    label: "SuperCoin Zone",
                    key: "superCoinZone",
                    icon: <TbCoinRupeeFilled color="gold" />,
                },
                {
                    label: "Flipkart Plus Zone",
                    key: "flipkartPlusZone",
                    icon: <LuCross />,
                },
                {
                    label: "Orders",
                    key: "orders",
                    icon: <BsBoxSeam />,
                },
                {
                    label: <>Wishlist {buyerInfo.u_whitelist.length ? `( ${buyerInfo.u_whitelist.length} )` : ""} </>,
                    key: "wishlist",
                    icon: <IoHeartOutline />

                },
                {
                    label: "Coupons",
                    key: "coupons",
                    icon: <GoTag />,
                },
                {
                    label: "Gift Cards",
                    key: "giftCards",
                    icon: <GoCreditCard />,
                },
                {
                    label: "Notifications",
                    key: "notifications",
                    icon: <IoNotificationsOutline />,
                },
                {
                    label: "Logout",
                    key: "logout",
                    icon: <FiLogOut />,
                },
            ],
        },
        {
            key: "cart",
            icon: <span style={{ position: "realtive" }}><PiShoppingCart size={20} /> <span style={{ position: "absolute", paddingBottom: 10, fontWeight: 700 }} id="cardCount">{buyerInfo.u_carts.length ? buyerInfo.u_carts.length : ""} </span></span>,
            label: "Cart",
        },
        {
            key: "becomeSeller",
            icon: <AiOutlineShop size={20} />,
            label: "Become a Seller"
        },
        {
            key: "more",
            label: <RiMore2Line />,
            children: [
                {
                    label: "Notification preferences",
                    key: "notificationPreferences",
                    icon: <IoNotificationsOutline color="black" />,
                },
                {
                    label: "24x7 Customer care",
                    key: "customercare",
                    icon: <PiHeadsetLight color="black" />,
                },
                {
                    label: "Advertise",
                    key: "advertise",
                    icon: <AiOutlineRise />,
                },
                {
                    label: "Download App",
                    key: "downloadApp",
                    icon: <PiDownloadSimpleThin color="black" />,
                },
            ],
        },
    ];

    const items1 = [
        {
            key: "logo",
            label: (
                <span>
                    <img
                        alt="logo"
                        srcSet={Flipkart_Logo_1}
                        width={"95vw"}
                        style={{ marginTop: 8 }}
                    />
                </span>
            ),
        },
        {
            key: "search",
            label: (
                <>
                    <Input
                        prefix={<CiSearch size={23} />}
                        placeholder="Search for Products, Brand and more"
                        style={{ backgroundColor: "#e5edf7", width: "49.5vw" }}
                    />
                </>
            ),
        },
        {
            label: (<span style={{ paddingLeft: 10, paddingRight: 10, backgroundColor: "blue", color: "whitesmoke", display: "flex", alignItems: "center" }}><CgProfile size={20} /> LOGIN</span>),
            key: "login",

        },
        {
            key: "cart",
            icon: <PiShoppingCart size={20} />,
            label: "Cart"
        },
        {
            key: "becomeSeller",
            icon: <AiOutlineShop size={20} />,
            label: "Become a Seller"
        },
        {
            key: "more",
            label: <RiMore2Line />,
            children: [
                {
                    label: "Notification preferences",
                    key: "notificationPreferences",
                    icon: <IoNotificationsOutline color="black" />,
                },
                {
                    label: "24x7 Customer care",
                    key: "customercare",
                    icon: <PiHeadsetLight color="black" />,
                },
                {
                    label: "Advertise",
                    key: "advertise",
                    icon: <AiOutlineRise />,
                },
                {
                    label: "Download App",
                    key: "downloadApp",
                    icon: <PiDownloadSimpleThin color="black" />,
                },
            ],
        },
    ];



    const onClick = (e) => {
        if (e.key === "login") {

            setIsRegisterOpen(false)
            setIsLoginOpen(true)
            form.resetFields();
        }
        else if (e.key === "logout") {

            // navigate("/")
            axios.get(`http://localhost:3321/user/userLogout`, {
                withCredentials: true
            })
                .then((response) => {
                    dispatch(logoutBuyerDetails());
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
                    navigate("/");
                })
                .catch((error) => {
                    console.error(error?.response?.data?.message);
                    alert(error?.response?.data?.message);
                })
        }
        else if (e.key === "becomeSeller") {
            axios.get("http://localhost:3001")
                .then(response => {
                    if (response.status === 200)
                        window.location.href = "http://localhost:3001/seller"
                    else {
                        alert("Something went Wrong")
                    }
                })
                .catch(error => navigate("/maintance"))
        }
        else if (e.key === "cart") {
            navigate("/viewcart");
        }
        else if (e.key === "myProfile") {
            axios.get("http://localhost:3002")
                .then(response => {
                    if (response.status === 200)
                        window.location.href = `http://localhost:3002/buyer?id=${buyerInfo.u_id}`
                    else {
                        alert("Something went Wrong")
                    }
                })
                .catch(error => navigate("/maintance"))
        }
        else if(e.key==="logo"){
            navigate("/")
        }
    };


    const handleOnRegister = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(true);
        form1.resetFields();
    };

    const handleOnLogin = () => {
        setIsRegisterOpen(false);
        setIsLoginOpen(true);
        form.resetFields();
    };


    const onLogin = async (values) => {

        await axios
            .post(`http://localhost:3321/user/userLogin`, values, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            })
            .then((response) => {
                dispatch(loginBuyerDetails({ ...response.data.user }));
                alert(response.data.message);
                setBuyerInfo({ ...response.data.user, u_loggedIn: true});
                setIsLoginOpen(false);
                navigate("/");
            })
            .catch((error) => {
                console.error(error?.response?.data?.message);
                alert(error?.response?.data?.message);
            });
    };

    const onRegister = async (values) => {

        await axios
            .post("http://localhost:3321/user/createUser", values, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                alert(response.data.message);
                setIsRegisterOpen(false);
                navigate("/");
            })
            .catch((error) => {
                console.error(error.response.data.message);
                alert("Something went wrong");
            });
    };


    useEffect(() => {
        async function updateData() {
            if (buyerInfo.u_loggedIn) {
                await axios.get(`http://localhost:3321/user/getUserDetals/${buyerInfo.u_id}`
                    , {
                        headers: {
                            Accept: "application/json"
                        }

                    }
                )
                    .then((response) => {
                        dispatch(loginBuyerDetails({ ...response.data.user, u_loggedIn: true }));
                        setBuyerInfo({ ...response.data.user, u_loggedIn: true });

                    })
                    .catch((error) => {
                        alert(error.message);
                        dispatch(logoutBuyerDetails());
                        setBuyerInfo({
                            u_id: "",
                            u_name: "",
                            u_phoneNumber: "",
                            u_emailAddress: "",
                            u_password: '',
                            u_carts: [],
                            u_whitelist: [],
                            u_loggedIn: false,
                        });
                    });
            }
        }
        updateData()

        // eslint-disable-next-line
    }, [])



    return (
        <div className="application">
            {buyerInfo.u_loggedIn ?
                <Menu
                    onClick={onClick}
                    style={{ paddingLeft: 62, paddingTop: 6, width: "100%", fontSize: 16 }}
                    mode="horizontal"
                    items={items}
                    className="header-menu"
                />
                :
                <Menu
                    onClick={onClick}
                    style={{ paddingLeft: 62, paddingTop: 6, width: "100%", fontSize: 16 }}
                    mode="horizontal"
                    items={items1}
                    className="header-menu"

                />
            }

            {/* <Menu onClick={onClick} selectedKeys={[current]} mode="inline" items={items} style={{paddingLeft:62,paddingTop:5}}/> */}



            <div>



                <Modal
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                    centered
                    title="Login"
                    open={isLoginOpen}
                    onCancel={() => setIsLoginOpen(false)}
                    className="loginModal"
                    // style={{wid}}
                    width={"50vh"}
                >
                    <Form
                        form={form}
                        method="post"
                        name="validateOnly1"
                        layout="vertical"
                        size={"large"}
                        autoComplete="off"
                        className="addUserForm"
                        onFinish={(Values) => onLogin(Values)}

                    >
                        <Row style={{ flexDirection: "column", width: "100%" }}>
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name="u_emailAddress"
                                        // className="addUserInput"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter Email !",
                                            },
                                        ]}
                                    >
                                        <Input type="email" placeholder="Enter Your Email" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name="u_password"
                                        // className="addUserInput"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter Password !",
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            type="password"
                                            placeholder="Enter Your Password"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            block
                                            className="btnUser"
                                        >
                                            Login
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify={"center"}>Don't have an account?</Row>
                        </Row>
                    </Form>
                    <Button
                        block
                        style={{ marginTop: 10 }}
                        onClick={() => handleOnRegister()}
                    >
                        Register for new account
                    </Button>
                </Modal>



                <Modal
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                    centered
                    title="Register"
                    open={isRegisterOpen}
                    onCancel={() => setIsRegisterOpen(false)}
                    className="loginModal"
                    width={"50vh"}
                >
                    <Form
                        form={form1}
                        method="post"
                        name="validateOnly"
                        layout="vertical"
                        size={"large"}
                        autoComplete="off"
                        className="addUserForm"
                        onFinish={(Values) => onRegister(Values)}
                    >
                        <Row style={{ flexDirection: "column", width: "100%" }}>
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name="u_name"
                                        // className="addUserInput"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter Name !",
                                            }
                                        ]}
                                    >
                                        <Input type="text" placeholder="Enter Your Name" pattern="[A-Za-z][A-Za-z]+" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name="u_phoneNumber"
                                        // className="addUserInput"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter Phone Number !",
                                            },
                                            {
                                                pattern: new RegExp('^[0]?[6789]\\d{9}$'),
                                                message: "Invalid Phone Number"
                                            }
                                        ]}

                                    >
                                        <Input type="text" placeholder="Enter Your Phone Number" min={6000000000} max={9999999999} minLength={10} maxLength={10} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name="u_emailAddress"
                                        // className="addUserInput"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter Email !",
                                            },
                                            {
                                                pattern: new RegExp(/[a-z0-9]+@[a-z]+.in|.com|.co/),
                                                message: "Please enter the valid Email !"
                                            }
                                        ]}
                                    >
                                        <Input type="email" placeholder="Enter Your Email" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name="u_password"
                                        // className="addUserInput"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter password !',
                                            },
                                            { min: 8, message: 'Password must have a minimum length of 8.' },
                                            {
                                                pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
                                                message: 'Password must contain at least one lowercase letter, uppercase letter, number, and special chracter'
                                            }
                                        ]}
                                    >
                                        <Input.Password
                                            type="password"
                                            placeholder="Enter Your Password"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            block
                                            className="btnUser"
                                        >
                                            Register
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify={"center"}>Already have an account?</Row>
                        </Row>
                    </Form>

                    <Button block style={{ marginTop: 10 }} onClick={() => handleOnLogin()}>
                        Login
                    </Button>
                </Modal>
            </div>
            <div className="applicationContent">
                <Dashboard />
                <Carousal />
                <BestOfElectronics />
                <BestOfFashion />
                <BestOfGrocery />
                <BestOfMobile />
                <BestOfMore />
                <TopStories />
                <Footer />
            </div>

        </div>
    );
}

export default Home;
