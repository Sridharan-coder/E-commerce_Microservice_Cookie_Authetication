import { Button, Col, Form, Input, Menu, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { GoCreditCard, GoTag } from "react-icons/go";
import { IoHeartOutline, IoNotificationsOutline } from "react-icons/io5";
import { LuCross } from "react-icons/lu";
import { TbCoinRupeeFilled } from "react-icons/tb";

import Flipkart_logo_white from "../Assest/Flipkart_logo_white.png"
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginBuyerDetails, logoutBuyerDetails } from "../Redux/Action_Create/ActionCreate";


const Cart = () => {

    const [productDetails, SetProductDetails] = useState([])
    const [orderCount, setorderCount] = useState([]);
    const [orderPrice, setOrderPrice] = useState([])

    // eslint-disable-next-line no-unused-vars
    const [discount, setDiscount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const navigate = useNavigate()
    const location = useLocation()
    const [newProduct, setNewProduct] = useState(location.state ? location.state.p_id : "");
    const [buyerInfo, setBuyerInfo] = useState(useSelector(detail => detail.buyerAuthentication));


    const dispatch = useDispatch();
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)

    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const [form] = Form.useForm();
    const [form1] = Form.useForm();

    const items = [


        {
            key: 'logo',
            label: (
                <span>
                    <img alt="logo" srcSet={Flipkart_logo_white} width={"95vw"} style={{ marginTop: 8 }} />
                </span>

            ),
        },
        {
            key: 'search',
            label: (
                <>
                    <Input prefix={<CiSearch size={23} />} placeholder="Search for Products, Brand and more" style={{ backgroundColor: '#e5edf7', width: "49.5vw" }} />
                </>

            ),
        },


        {
            label: `Account`,
            key: 'SubMenu',
            icon: <CgProfile size={20} color='white' />,
            children: [
                {
                    label: 'My profile',
                    key: 'myProfile',
                    icon: <CgProfile color='blue' />
                },
                {
                    label: 'SuperCoin Zone',
                    key: 'superCoinZone',
                    icon: <TbCoinRupeeFilled color='blue' />
                },
                {
                    label: 'Flipkart Plus Zone',
                    key: 'flipkartPlusZone',
                    icon: <LuCross color='blue' />
                },
                {
                    label: 'Orders',
                    key: 'orders',
                    icon: <BsBoxSeam color='blue' />
                },
                {
                    label: 'Wishlist',
                    key: 'wishlist',
                    icon: <IoHeartOutline color='blue' />
                },
                {
                    label: 'Coupons',
                    key: 'coupons',
                    icon: <GoTag color='blue' />
                },
                {
                    label: 'Gift Cards',
                    key: 'giftCards',
                    icon: <GoCreditCard color='blue' />
                },
                {
                    label: 'Notifications',
                    key: 'notifications',
                    icon: <IoNotificationsOutline color='blue' />
                },
                {
                    label: 'Logout',
                    key: 'logout',
                    icon: <FiLogOut color='blue' />
                }
            ]
        }


    ];

    const items1 = [


        {
            key: 'logo',
            label: (
                <span>
                    <img alt="logo" srcSet={Flipkart_logo_white} width={"95vw"} style={{ marginTop: 8 }} />
                </span>
            ),
        },
        {
            key: 'search',
            label: (
                <>
                    <Input prefix={<CiSearch size={23} />} placeholder="Search for Products, Brand and more" style={{ backgroundColor: '#e5edf7', width: "49.5vw" }} />
                </>

            ),
        },


        {
            label: `Login`,
            key: 'login',
            icon: <CgProfile size={20} color='white' />,
        }


    ];

    const onClick = (e) => {
        if (e.key === "login") {
            setIsRegisterOpen(false)
            setIsLoginOpen(true)
        }
        else if (e.key === "logout") {
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
            })
            .then((response) => {

                dispatch(loginBuyerDetails({ ...response.data.user }));
                alert(response.data.message);
                setBuyerInfo({ ...response.data.user, u_loggedIn: true });
                setIsLoginOpen(false);
            })
            .catch((error) => {
                console.error(error.response.data.message);
                alert(error.response.data.message);
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


    const handleOrderCount = (value, index) => {
        const count = orderCount;
        count[index] = value;
        setorderCount([...count])
    }


    const handleAddCartToUser = async (newProduct) => {
        if (buyerInfo.u_loggedIn) {
            if (!buyerInfo.u_carts.includes(newProduct)) {
                await axios.put(`http://localhost:3321/user/updateUser/${buyerInfo.u_id}`, { ...buyerInfo, u_carts: [...new Set([...buyerInfo.u_carts,newProduct])] }, {
                    headers: {
                        Accept: "application/json"
                    }
                })
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => console.error(error.response.data.message))
            }
            else {
                alert("Product was alrady in the carts");
            }
        }
        else {
            setIsLoginOpen(true);
        }
    }

    const handleDeleteCartToUser = async (value) => {

        if (buyerInfo.u_loggedIn) {
            if (buyerInfo.u_carts.length) {
                const tempBuyer = buyerInfo;
                tempBuyer.u_carts = tempBuyer.u_carts.filter(item => item !== value)


                await axios.put(`http://localhost:3321/user/updateUser/${buyerInfo.u_id}`, tempBuyer, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => {
                        setBuyerInfo(tempBuyer)
                        dispatch(loginBuyerDetails(tempBuyer));
                    })
                    .catch(error => console.error(error.response.data.message))
            }
            else {
                setNewProduct(0)
                SetProductDetails([])
            }
        }
        else {
            setIsLoginOpen(true);
        }
    }

    useEffect(() => {
        if (buyerInfo.u_loggedIn) {
            let tempInfo=buyerInfo;
            if (newProduct && !buyerInfo.u_carts.includes(newProduct)){
                tempInfo={ ...buyerInfo, u_carts: [...buyerInfo.u_carts, newProduct] }
            }

            try {
                async function fetchdata() {
                    const tempProduct = [...productDetails]
                    const tempOrdercount = [...orderCount]
                    const tempOrderPrice = [...orderPrice]
                    tempInfo.u_carts.forEach(async (item) => {
                        await axios.get(`http://localhost:3322/product/getProductById/${item}`)
                            .then(response => {
                                tempProduct.push(response.data.product)
                                tempOrdercount.push(response.data.product.p_stock ? 1 : 0)
                                tempOrderPrice.push(response.data.product.p_price)
                            })
                            .catch(error => console.error(error.response.data.message))
                    })
                    SetProductDetails(tempProduct);
                    setorderCount(tempOrdercount);
                    setOrderPrice(tempOrderPrice)
                }
                fetchdata()
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                async function fetchdata() {
                    await axios.get(`http://localhost:3322/product/getProductById/${newProduct}`)
                        .then(response => {
                            SetProductDetails([...productDetails, response.data.product])
                            setorderCount([...orderCount, 1])
                            setOrderPrice([...orderPrice, response.data.product.p_price])
                        })
                        .catch(error => console.error(error.response.data.message))
                }
                fetchdata()
            }
            catch (error) {
                console.log(error);

            }
        }
        // eslint-disable-next-line
    }, [buyerInfo])

    useEffect(() => {
        const amt = orderPrice.reduce((acc, curr, index) => {
            return acc + (curr * orderCount[index])
        }, 0)
        setTotalPrice(amt)
    }, [discount, orderPrice, orderCount, buyerInfo])


    return (
        <>
            <div className="cartDetails">
                {buyerInfo.u_loggedIn ?
                    <Menu
                        onClick={onClick}
                        style={{ height: 70, paddingLeft: 62, paddingRight: 62, paddingTop: 6, width: "100%", fontSize: 16, backgroundColor: "#2874f0", color: "whitesmoke", display: "flex", justifyContent: "space-evenly" }}
                        className="productSearch"
                        mode="horizontal"
                        items={items}
                    />
                    :
                    <Menu
                        onClick={onClick}
                        style={{ height: 70, paddingLeft: 62, paddingRight: 62, paddingTop: 6, width: "100%", fontSize: 16, backgroundColor: "#2874f0", color: "whitesmoke", display: "flex", justifyContent: "space-evenly" }}
                        className="productSearch"
                        mode="horizontal"
                        items={items1}
                    />
                }


                <Row className="cartContent">
                    <Col span={3}></Col>
                    <Col span={13}>
                        <Row justify={"space-between"} className="cartPincode">
                            <Col style={{ fontWeight: 700, fontSize: 18 }}>From Saved Address</Col>
                            <Col><Button disabled>Enter Delivery Pincode</Button></Col>
                        </Row>
                        <Row style={{ flexDirection: "column" }} className="cartPlacement">
                            {productDetails.map((item, index) => {
                                return (
                                        <Row className="cartInfo" key={item.p_id}>
                                            <Col span={4}>
                                                <img src={item.p_image} alt={item.p_name} width={120} height={120} />
                                            </Col>
                                            <Col span={14}>
                                                <Row style={{ fontWeight: 500, fontSize: 17, width: 500 }}>{item.p_name.charAt(0).toUpperCase() + item.p_name.slice(1)}</Row>
                                                <Row style={{ paddingTop: 5, paddingBottom: 5 }}>Seller Id :
                                                    {item.s_ids.map((vendor,index) => {
                                                        return (
                                                            <Row key={vendor+""+index}>{vendor}</Row>
                                                        )
                                                    })}
                                                </Row>
                                                <Row style={{ fontWeight: 500, fontSize: 17, width: 500 }}>
                                                    &#8377; {item.p_price}
                                                </Row>
                                            </Col>
                                            <Col span={6}>
                                                Delivery by Mon Dec 18 | <del>&#8377; 40</del>
                                            </Col>
                                            <Row gutter={[30, 30]} align={"middle"}>
                                                <Col>
                                                    <Row style={{ flexDirection: "row" }}>
                                                        <Button style={{ borderRadius: 100 }} onClick={() => handleOrderCount((orderCount[index] - 1), index)} disabled={orderCount[index] === 0}>-</Button>
                                                        <Input type="text" style={{ width: 40 }} onChange={(value) => handleOrderCount(value, index)} value={orderCount[index]}></Input>
                                                        <Button style={{ borderRadius: 100 }} onClick={() => handleOrderCount(orderCount[index] + 1, index)} disabled={orderCount[index] === item.p_stock}>+</Button>
                                                    </Row>
                                                </Col>
                                                <Col >
                                                    <Row gutter={[30, 30]}>
                                                        <Col onClick={() => handleAddCartToUser(item.p_id)}><Link style={{ color: "black", fontWeight: 600, fontSize: 16 }}>SAVE FOR LATER</Link></Col>
                                                        <Col onClick={() => handleDeleteCartToUser(item.p_id)}><Link style={{ color: "black", fontWeight: 600, fontSize: 16 }}>REMOVE</Link></Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Row>
                                )
                            })}
                            <Row style={{ backgroundColor: "white", padding: 10 }} justify={"end"}>
                                <Button style={{ backgroundColor: "orangered", color: "white" }} onClick={() => navigate("/payment", { state: { productDetails: productDetails } })}>PLACE ORDER</Button>
                            </Row>
                        </Row>


                    </Col>
                    <Col span={5} style={{ marginLeft: 20 }}>
                        <Row style={{ backgroundColor: "white", height: 50 }} justify={"center"} align={"middle"}>Price Details </Row>
                        <Row style={{ backgroundColor: "white", padding: 10, marginTop: 5 }}>
                            <Col span={24}>
                                <Row justify={"space-between"} style={{ marginBottom: 10 }}>
                                    <Col>Price ({orderCount.reduce((acc, curr) => {
                                        return acc + curr
                                    }, 0)} time)</Col>
                                    <Col>
                                        &#8377; {totalPrice}
                                    </Col>
                                </Row>

                                <Row justify={"space-between"} style={{ marginBottom: 10 }}>
                                    <Col>
                                        Discount
                                    </Col>
                                    <Col>
                                        &#8377; {discount}
                                    </Col>
                                </Row>

                                <Row justify={"space-between"} style={{ marginBottom: 10 }}>
                                    <Col>
                                        Delivery Charges
                                    </Col>
                                    <Col>
                                        <del>&#8377; 120</del> Free
                                    </Col>
                                </Row>

                                <Row justify={"space-between"} style={{ paddingTop: 10, paddingBottom: 10, marginBottom: 10, borderTop: "1px dotted black", borderBottom: "1px dotted black" }}>
                                    <Col>
                                        Total Amount
                                    </Col>
                                    <Col>
                                        &#8377; {totalPrice - discount}
                                    </Col>
                                </Row>



                            </Col>
                        </Row>


                    </Col>
                    <Col span={3}></Col>

                </Row>
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
                                            <Input type="text" placeholder="Enter Your Name" pattern="[A-Za-z]+" />
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
            </div>
        </>
    )
}

export default Cart;