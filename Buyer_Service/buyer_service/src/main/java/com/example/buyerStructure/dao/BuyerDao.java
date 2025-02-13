package com.example.buyerStructure.dao;

import org.springframework.http.ResponseEntity;

import com.example.buyerStructure.entity.BuyerDetails;

import jakarta.servlet.http.HttpServletResponse;

public interface BuyerDao {
	
	ResponseEntity<?> getUser(Integer u_id);
	ResponseEntity<?> addUser(BuyerDetails userDetails);
	ResponseEntity<?> updateUser(Integer u_id,BuyerDetails userDetails);
	ResponseEntity<?> deleteUser(Integer u_id);
	ResponseEntity<?> userLogin(BuyerDetails buyerDetails,HttpServletResponse response);
	ResponseEntity<?> userLogout(HttpServletResponse response);
}
