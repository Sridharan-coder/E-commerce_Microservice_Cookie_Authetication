
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const { createSeller, updateSellerDetails, deleteSellerDetails, getSellerDetails, getSellerLogin } = require("../Services/seller_Services");

const errorHandler = async (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

const addSeller = async (req, res, next) => {
  try {
    const sellerInfo = req.body;
    const s_id = Math.floor(Math.random() * 10000)
    sellerInfo["s_id"] = s_id;
    sellerInfo["s_password"] = await bcrypt.hash(sellerInfo.s_password, 12);

    await createSeller(sellerInfo);

    res.header("Access-Control-Allow-Origin: *");
    res.status(201).json({
      success: true,
      message: "Seller added successfully!"
    });
  } catch (error) {
    next(error);
  }
}

const updateSeller = async (req, res, next) => {
  try {
    const inputData = req.body;
    const s_id = Number(req.params["s_id"]);

    await updateSellerDetails(s_id, inputData);
    res.status(200).json({
      success: true,
      msg: "Seller updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteSeller = async (req, res, next) => {
  try {
    const s_id = Number(req.params["s_id"]);

    await deleteSellerDetails(s_id);
    res.status(200).json({
      success: true,
      msg: "Seller removed successfully",
    });
  } catch (error) {
    next(error);
  }
}

const getSeller = async (req, res, next) => {
  try {
    console.log("cookies----->",req.cookies.s_token)
    const s_id = Number(req.params["s_id"]);
    const seller = await getSellerDetails(s_id);
    res.status(200).json({
      success: true,
      msg: "Seller Fetched successfully",
      seller
    });
  } catch (error) {
    next(error);
  }
}

const sellerLogin = async (req, res, next) => {
  try {
    
    const s_emailAddress = req.body.s_emailAddress;
    const seller = await getSellerLogin(s_emailAddress);
    
    const match = await bcrypt.compare( req.body.s_password,seller.s_password);
    
    if (match) {
      const token=generateToken({s_emailAddress:seller.s_emailAddress,s_name:seller.s_name,s_id:seller.s_id.toString()})
      
      // const secureCookie = true;
      // const httpOnlyCookie = true;
      // const cookieOptions = {
      //   secure: secureCookie,
      //   httpOnly: httpOnlyCookie,
      // };
      // const cookieString = cookie.serialize('s_token', token, cookieOptions);
      res.cookie("s_token", token, {
        httpOnly: true,
        secure: true,
        sameSite:'None',
        maxAge:  30 * 60 * 1000 // 30 min
        // maxAge: 20 * 1000 // 20 sec
      }).status(200).json({
        success: true,
        message: "Login successfully",
        seller
      });
    }
    else {
      res.status(404).json({
        success: true,
        message: "UserName or Password was incorrect"
      });
    }


  } catch (error) {
    next(error);
  }

}

const generateToken=(sellerDetails)=> {
  const claims = {
    name: sellerDetails.s_name,
    email: sellerDetails.s_emailAddress,
    iat: Math.floor(Date.now() / 1000)
  };
  const token = jwt.sign(claims, process.env.JWT,
    {
      subject: sellerDetails.s_id,
      expiresIn: '20s'
    });
  return token;
}


const sellerLogout=(req,res,next)=>{
  try {
    res.clearCookie("s_token").status(200).json({
      success: true,
      message: "Seller Logged-out succesfully",
    });
  } catch (error) {
    next(error);
  }
}


module.exports = {
  errorHandler,
  addSeller,
  updateSeller,
  deleteSeller,
  getSeller,
  sellerLogin,
  sellerLogout
}