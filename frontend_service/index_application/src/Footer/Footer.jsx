import { Col, Row } from "antd";

import { AiOutlineShop } from "react-icons/ai";
import { PiShootingStarBold } from "react-icons/pi";
import { TbHelp } from "react-icons/tb";
import { PiFacebookLogo } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandYoutube } from "react-icons/tb";


import visa from "../Assest/visa.png"
import masterCard from "../Assest/masterCard.png"
import rupay from "../Assest/rupay.png"
import americanExpress from "../Assest/americanExpress.png"
import discover from "../Assest/discover.png"
import cashOnDelivery from "../Assest/cashOnDelivery.png"
import emiOption from "../Assest/emiOption.png"


const Footer = () => {

    return (
        <div className="footer">
            <Row className="footerInfo">

                <Col span={15} className="leftFooterContent">
                    <Row>

                        <Col span={6}>
                            <Row><p className="footerTitle">ABOUT</p></Row>
                            <Row><span className="footerContent">Contact Us</span></Row>
                            <Row><span className="footerContent">About Us</span></Row>
                            <Row><span className="footerContent">Careers</span></Row>
                            <Row><span className="footerContent">Flipkart Stories</span></Row>
                            <Row><span className="footerContent">Press</span></Row>
                            <Row><span className="footerContent">Corporate Informaion</span></Row>
                        </Col>

                        <Col span={6}>
                            <Row><p className="footerTitle">GROUP COMPANIES</p></Row>
                            <Row><span className="footerContent">Myntra</span></Row>
                            <Row><span className="footerContent">Cleartrip</span></Row>
                            <Row><span className="footerContent">Shopsy</span></Row>
                        </Col>

                        <Col span={6}>
                            <Row><p className="footerTitle">Help</p></Row>
                            <Row><span className="footerContent">Payments</span></Row>
                            <Row><span className="footerContent">Shipping</span></Row>
                            <Row><span className="footerContent">Cancellation & Returns</span></Row>
                            <Row><span className="footerContent">FAQ</span></Row>
                        </Col>

                        <Col span={6}>
                            <Row><p className="footerTitle">CONSUMER POLICY</p></Row>
                            <Row><span className="footerContent">Cancellation & Returns</span></Row>
                            <Row><span className="footerContent">Terms Of Use</span></Row>
                            <Row><span className="footerContent">Security</span></Row>
                            <Row><span className="footerContent">Privacy</span></Row>
                            <Row><span className="footerContent">Sitemap</span></Row>
                            <Row><span className="footerContent">Grievance Redressal</span></Row>
                            <Row><span className="footerContent">EpR Compliance</span></Row>
                        </Col>

                    </Row>

                </Col>
                {/* <Col span={1} ></Col> */}

                <Col span={9}>

                    <Row style={{paddingLeft:35}}>
                        <Col span={12}>
                            <Row><p className="footerTitle">Mail Us:</p></Row>
                            <Row><span className="footerContent">Flipkart Internet Private Limited,</span></Row>
                            <Row><span className="footerContent">Building Alyssa, Begonia &</span></Row>
                            <Row><span className="footerContent">Clove Embassy Tech Village,</span></Row>
                            <Row><span className="footerContent">Outer Ring Road, Devarabeesanahalli Village,</span></Row>
                            <Row><span className="footerContent">Bengaluru, 560103,</span></Row>
                            <Row><span className="footerContent">Karnataka, India</span></Row>
                            <Row><p className="footerTitle">Social:</p></Row>
                            <Row>
                                <span className="footerLogoContent">
                                <PiFacebookLogo size={25} color="white"/>
                                </span>
                                <span className="footerLogoContent">
                                <FaXTwitter size={25} color="white"/>
                                </span>
                                <span className="footerLogoContent">
                                <TbBrandYoutube size={25} color="white"/>
                                </span>
                                
                                </Row>
                        </Col>

                        <Col span={12}>
                            <Row><p className="footerTitle">Registered Office Address:</p></Row>
                            <Row><span className="footerContent">Flipkart Internet Private Limited,</span></Row>
                            <Row><span className="footerContent">Building Alyssa, Begonia &</span></Row>
                            <Row><span className="footerContent">Clove Embassy Tech Village,</span></Row>
                            <Row><span className="footerContent">Outer Ring Road, Devarabeesanahalli Village,</span></Row>
                            <Row><span className="footerContent">Bengaluru, 560103,</span></Row>
                            <Row><span className="footerContent">Karnataka, India</span></Row>
                            <Row><span className="footerContent">CIN : U51109KA2012PTC066107</span></Row>
                            <Row><span className="footerContent">Telephone: <span className="mobileNumbers">044-45614700</span> / <span className="mobileNumbers">044-67415800</span></span></Row>
                        </Col>
                    </Row>

                </Col>

            </Row>

            <Row className="footerInfo" justify={"space-evenly"} style={{lineHeight:2,}} >
                <Col style={{verticalAlign:"middle"}}>
                <AiOutlineShop color="gold" size={15} className="footerIcon"/> <span className="footerContent">Seller</span>
                </Col>

                <Col>
                <PiShootingStarBold color="gold" size={15} className="footerIcon"/> <span className="footerContent"/> <span className="footerContent">Advertise</span>
                </Col>

                <Col>
                <TbHelp color="gold" size={15} className="footerIcon"/> <span className="footerContent">Help Center</span>
                </Col>

                <Col>
                    <p className="footerContent">&copy; 2024 localhost:3000</p>
                </Col>

                <Col>
                    <Row>
                        <Col style={{ backgroundColor: "white",marginLeft:3 }}>
                            <img src={visa} alt="visa" width={33} height={19} />
                        </Col>
                        <Col style={{ backgroundColor: "white",marginLeft:3 }}>
                            <img src={masterCard} alt="MasterCard" width={33} height={19} />
                        </Col>
                        <Col style={{ backgroundColor: "white",marginLeft:3 }}>
                            <img src={rupay} alt="Rupay" width={33} height={19} />
                        </Col>
                        <Col style={{ backgroundColor: "white",marginLeft:3 }}>
                            <img src={americanExpress} alt="AmericanExpress" width={33} height={19} />
                        </Col>
                        <Col style={{ backgroundColor: "white",marginLeft:3 }}>
                            <img src={discover} alt="Discover" width={33} height={19} />
                        </Col>
                        <Col style={{ backgroundColor: "white",marginLeft:3 }}>
                            <img src={cashOnDelivery} alt="cashOnDelivery" width={33} height={19} />
                        </Col>
                        <Col style={{ backgroundColor: "white",marginLeft:3 }}>
                            <img src={emiOption} alt="emiOption" width={33} height={19} />
                        </Col>
                        
                    </Row>

                </Col>


            </Row>
        </div>
    )

}

export default Footer;