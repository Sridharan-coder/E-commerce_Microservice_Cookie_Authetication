import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { loginBuyerDetails } from "../Redux/Action_Create/ActionCreate";

const MyWishlist = () => {

    const [data, setData] = useState(useSelector(data => data.buyerAuthentication));

    const [wishedProduct, setWishedProduct] = useState([]);

    const dispatch = useDispatch();


    const removeItem = async (value) => {
        console.log("values",value)
        if (data.u_loggedIn) {
            const tempBuyer = data;
            tempBuyer.u_whitelist = tempBuyer.u_whitelist.filter(item => item !== value?.p_id)


            await axios.put(`http://localhost:3321/user/updateUser/${data.u_id}`, tempBuyer, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
                .then(response => {
                    updateData();
                })
                .catch(error => console.error(error.response.data.message))

        }
        else {
            alert("Login First")
        }
    }

    async function updateData() {

        await axios.get(`http://localhost:3321/user/getUserDetals/${data.u_id}`
            , {
                headers: {
                    Accept: "application/json"
                },
                withCredentials:true
            }
        )
            .then((response) => {
                setWishedProduct([]);
                setData({ ...response.data.user, u_loggedIn: true });
                dispatch(loginBuyerDetails({ ...response.data.user, u_loggedIn: true }));
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
                setData({
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

    useEffect(() => {
        console.log("useEffect")

        try {
            async function fetchdata() {
                const tempProduct = []
                data.u_whitelist.forEach(async (item) => {
                    await axios.get(`http://localhost:3322/product/getProductById/${item}`)
                        .then(response => {
                            tempProduct.push(response.data.product)
                            setWishedProduct((prev) => [...prev,response.data.product]);
                        })
                        .catch(error => console.error(error.response.data.message))
                })
            }
            fetchdata()
        }
        catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line
    }, [data]);

    return (
        <Col>
            <Row style={{ padding: 25 }}>
                <p style={{ fontSize: 20, margin: 0, fontWeight: 600 }}>My Wishlist ({data.u_whitelist.length})</p>
            </Row>
            {wishedProduct.map((item, index) => {

                return (
                    <Row style={{ borderTop: "1px solid rgba(128, 128, 128, 0.2)", padding: 10 }} key={`${item?.p_id}-${index}`}>
                        <Col style={{ marginRight: 25 }} span={4}>
                            <img src={item?.p_image} alt={item?.p_name} width={120} height={120} />
                        </Col>
                        <Col span={19}>
                            <Row style={{ paddingTop: 15, justifyContent: 'space-between' }}>
                                <Col>{item?.p_name}</Col>
                                <Col><MdDelete size={20} color="grey" onClick={() => removeItem(item)} /></Col>
                            </Row>
                            <Row style={{ paddingTop: 10, fontSize: 22, fontWeight: 600 }}>&#8377;{item?.p_price}</Row>
                        </Col>
                    </Row>
                )

            })}

        </Col>
    )

}

export default MyWishlist;