import { Carousel } from "antd";

import sareeCollection from "../Assest/sareeCollection.webp"
import Offers from "../Assest/Offers.webp"
import NewLaunch from "../Assest/NewLaunch.webp"

const Carousal = () => {

    const contentStyle = {
        color: '#fff',
        textAlign: 'center',
        background: '#364d79',
    };


    return (
        <>
            <Carousel arrows autoplay style={{padding:10}}>
                <div>
                    <img src={sareeCollection} alt="sareeCollection" style={contentStyle} width={"100%"}/>
                </div>
                <div>
                <img src={Offers} alt="Offers" style={contentStyle} width={"100%"}/>
                </div>
                <div>
                <img src={NewLaunch} alt="NewLaunch" style={contentStyle} width={"100%"}/>
                </div>
            </Carousel>
        </>
    )
}

export default Carousal;