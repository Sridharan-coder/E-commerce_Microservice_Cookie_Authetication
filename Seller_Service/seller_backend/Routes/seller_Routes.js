
const express = require("express");
const {addSeller, updateSeller, deleteSeller, getSeller, sellerLogin, sellerLogout} = require("../Controllers/seller_Controller");
const { SendingTheMail } = require("../Controllers/mailSender");

const auth=require("../Authentication/authenticate")

const router=express.Router()

router.get("/seller/sellerDetails/:s_id",auth,getSeller)

router.post("/seller/createSeller",addSeller)

router.put("/seller/updateSeller/:s_id",auth,updateSeller)

router.delete("/seller/deleteSeller/:s_id",auth,deleteSeller)

router.post("/seller/sellerLogin",sellerLogin)

router.get("/seller/sellerLogout",sellerLogout)

router.post("/seller/sendEmail",SendingTheMail)


module.exports=router;