package com.example.buyerStructure.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.buyerStructure.dao.BuyerDao;
import com.example.buyerStructure.entity.BuyerDetails;

import jakarta.servlet.http.HttpServletResponse;


@CrossOrigin(
	    origins = {
	        "http://localhost:3000",
	        "http://localhost:3002"
	        },
	    methods = {
	                RequestMethod.OPTIONS,
	                RequestMethod.GET,
	                RequestMethod.PUT,
	                RequestMethod.DELETE,
	                RequestMethod.POST
	})
@RestController
@RequestMapping("/user")
public class BuyerController {

	@Autowired
	private BuyerDao buyerDao;

	@PostMapping("/createUser")
	public ResponseEntity<?> addUser(@RequestBody BuyerDetails buyerDetails) {
		System.out.println("user controller line 41 : " + buyerDetails.toString());
		return buyerDao.addUser(buyerDetails);
	}

	@GetMapping("/getUserDetals/{u_id}")
	public ResponseEntity<?> getUser(@PathVariable Integer u_id) {
		System.err.println("user Controller line 45 --> " + u_id);
		return buyerDao.getUser(u_id);
	}

	@PutMapping("/updateUser/{u_id}")
	public ResponseEntity<?> updateUser(@PathVariable Integer u_id, @RequestBody BuyerDetails buyerDetails) {
		return buyerDao.updateUser(u_id, buyerDetails);
	}

	@DeleteMapping("/deleteUser/{u_id}")
	public ResponseEntity<?> deleteUser(@PathVariable Integer u_id) {
		return buyerDao.deleteUser(u_id);
	}

	@PostMapping("/userLogin")
	public ResponseEntity<?> userLogin(@RequestBody BuyerDetails buyerDetails,HttpServletResponse response) {
		System.err.println("user Controller line 61 --> " + buyerDetails.toString());
		return buyerDao.userLogin(buyerDetails,response);
	}
	
	@GetMapping("/userLogout")
	public ResponseEntity<?> userLogout(HttpServletResponse response){
		return buyerDao.userLogout(response);
	}
}
