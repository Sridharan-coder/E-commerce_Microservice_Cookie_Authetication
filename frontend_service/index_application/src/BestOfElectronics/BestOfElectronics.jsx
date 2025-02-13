import { Card, Col, Row, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const { Meta } = Card;

const BestOfElectronics = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const param = useParams("p_type");
  const type = param.p_type;


  const handleProduct = (productData) => {
    navigate(`/item/${type}?name=${productData.p_name}&id=${productData.p_id}`);
  };

  const handleProductType=()=>{
    navigate("/product/electronics")
  }
  
  useEffect(() => {

    try {
      async function fetchData() {
        await axios
          .get(`http://localhost:3322/product/getProductByType/electronics`,{"Access-Control-Allow-Origin":"*"})
          .then((response) => {
            setProducts(response.data.products.slice(0, 5))
          })
          .catch((error) => console.error(error.response.data.message));
      }
      fetchData();
    } catch (error) {
      console.log("Error in Fetching the Data -> ", error);
    }
    // eslint-disable-next-line
  }, [type]);

  return (
    <div className="bestOfEletronics" >
      <div className="searchedProduct" >
        <Row justify={"space-between"}>
          <Col style={{ fontSize: 25 }}>Best of Electronics</Col>
          <Col>
            <span onClick={()=>handleProductType()} className="productTypeDisplyer">

              <IoIosArrowDroprightCircle size={40} color="blue" />
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }} >
          <Col span={20} >
            <Space size={[45, 45]}>
              {products.map((item) => (
                  <Card
                    key={'electronic'+item.p_id}
                    style={{
                      width: 240,
                      height: 270,
                      verticalAlign: "center",
                    }}
                    hoverable
                    onClick={() => handleProduct(item)}
                    cover={
                      <img
                      key={item.p_name}
                        src={item.p_image}
                        alt={item.p_name}
                        width={210}
                        height={210}
                        className="cardImage1"
                      />
                    }
                    bordered={false}
                    className="homeProductCard"
                  >
                    <Meta
                    key={'electronicMeta'+item.p_id}
                      title={item.p_name.charAt(0).toUpperCase() + item.p_name.slice(1)}
                      description={<b style={{ color: "black" }}>&#8377; {item.p_price}</b>}
                      style={{ textAlign: "center" }}
                    />
                  </Card>
              ))}
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BestOfElectronics;
