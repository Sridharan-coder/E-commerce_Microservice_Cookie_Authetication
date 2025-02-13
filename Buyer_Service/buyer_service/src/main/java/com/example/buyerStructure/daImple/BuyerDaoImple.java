package com.example.buyerStructure.daImple;



import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.buyerStructure.controller.BuyerController;
import com.example.buyerStructure.dao.BuyerDao;
import com.example.buyerStructure.entity.BuyerDetails;
import com.example.buyerStructure.jwtValidation.JWTServices;
import com.example.buyerStructure.repository.BuyerRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;


//import jakarta.persistence.Query;

@Service
@Slf4j
public class BuyerDaoImple implements BuyerDao{

	@Autowired
	private BuyerRepository buyerRepository;
	
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private JWTServices jwtServices;

	
	private static final Logger logger = LoggerFactory.getLogger(BuyerController.class);
	
	private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

	@Override
	public ResponseEntity<?> getUser(Integer u_id) {

		Map<String, Object> map = new LinkedHashMap<>();
		try {

			BuyerDetails user = buyerRepository.findById(u_id).orElseThrow(() -> new EntityNotFoundException("User not found"));

			if (user==null) {
				map.put("success", true);
				map.put("message", "User not found");
				return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
			}
			
			logger.info("Fetched User: {}", user);
			map.put("success", true);
			map.put("message", "User Fetched successfully");
			map.put("user", user);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println("user Impl getUser line 68 : "+e);

			map.put("success", false);
			map.put("message", e.getMessage());
			return new ResponseEntity<>(map, HttpStatus.METHOD_NOT_ALLOWED);
		}
	}

	@Override
	public ResponseEntity<?> addUser(BuyerDetails buyerDetails) {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		try {

			int min = 1000;
			int max = 9999;
			int randomNum = (int) (Math.random() * (max - min + 1) + min);

			Integer u_id=randomNum;
			String u_name=buyerDetails.getU_name();
			Long u_phoneNumber=buyerDetails.getU_phoneNumber();
			String u_emailAddress=buyerDetails.getU_emailAddress();
			String u_password=encoder.encode(buyerDetails.getU_password());
			ArrayList<Integer> u_carts=buyerDetails.getU_carts()==null?new ArrayList<>():buyerDetails.getU_carts();
			ArrayList<Integer> u_whitelist=buyerDetails.getU_whitelist()==null?new ArrayList<>():buyerDetails.getU_whitelist();
			Integer __v=0;
			
			BuyerDetails buyerDetailsTemp=new BuyerDetails(u_id, u_name, u_phoneNumber, u_emailAddress, u_password, u_carts, u_whitelist,__v);
		
			buyerRepository.save(buyerDetailsTemp);
			map.put("success", true);
			map.put("message", "User created succesfully !");
			return new ResponseEntity<>(map, HttpStatus.CREATED);
		} catch (Exception e) {
			System.err.println("user Impl addUser line 101 : "+e);
			map.put("success", false);
			map.put("message", e.getMessage());
			return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
		}
	}


	@Override
	public ResponseEntity<?> updateUser(Integer u_id,BuyerDetails UpdatedBuyerDetails) {
		Map<String, Object> map = new LinkedHashMap<>();
		try {
			
			
			BuyerDetails user = buyerRepository.findById(u_id).orElseThrow(() -> new EntityNotFoundException("User not found"));

			if (user==null) {
				map.put("success", true);
				map.put("message", "User not found");
				return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
			}
			
			user.setU_name(UpdatedBuyerDetails.getU_name());
			user.setU_emailAddress(UpdatedBuyerDetails.getU_emailAddress());
			
			if(!(UpdatedBuyerDetails.getU_password().startsWith("$2a$12"))) 
				user.setU_password(encoder.encode(UpdatedBuyerDetails.getU_password()));
				
			user.setU_phoneNumber(UpdatedBuyerDetails.getU_phoneNumber());
			user.setU_carts(UpdatedBuyerDetails.getU_carts());
			user.setU_whitelist(UpdatedBuyerDetails.getU_whitelist());
			
			BuyerDetails updated=buyerRepository.save(user);
			
			if (updated == null) {
				map.put("success", true);
				map.put("message", "User Not Found");
				return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
			}
			System.out.println("line 134 : "+updated.toString());
			map.put("success", true);
			map.put("message", "User updated successfully");
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println("user Impl updateUser line 135 : "+e);
			map.put("success", false);
			map.put("message", e.getMessage());
			return new ResponseEntity<>(map, HttpStatus.METHOD_NOT_ALLOWED);
		}
	}

	@Override
	public ResponseEntity<?> deleteUser(Integer u_id) {
		Map<String, Object> map = new LinkedHashMap<>();
		try {
			
			BuyerDetails user = buyerRepository.findById(u_id).orElseThrow(() -> new EntityNotFoundException("User not found"));

			if (user==null) {
				map.put("success", true);
				map.put("message", "User not found");
				return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
			}
			else {
				buyerRepository.deleteById(u_id);
				map.put("success", true);
				map.put("message", "User Deleted successfully");
				return new ResponseEntity<>(map, HttpStatus.OK);
			}
		}
		catch(Exception e) {
			System.err.println("user Impl deleteUser line 163 : "+e);
			map.put("success", false);
			map.put("message", e.getMessage());
			return new ResponseEntity<>(map, HttpStatus.METHOD_NOT_ALLOWED);
		}
	}

	@Override
	public ResponseEntity<?> userLogin(BuyerDetails buyerDetails,HttpServletResponse response ) {
		Map<String, Object> map = new LinkedHashMap<>();
//		try {
		BuyerDetails userTemp = buyerRepository.findByEmail(buyerDetails.getU_emailAddress());
		
//			if (userTemp==null) {
//				map.put("success", true);
//				map.put("message", "Seller not found");
//				return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
//			}
//			String existingPassword=userTemp.getU_password();
//			logger.info("Fetched User: {}", userTemp);
//			if(existingPassword.equals(user.getU_password())) {
//				map.put("success", true);
//				map.put("message", "Login successfully");
//				map.put("user", userTemp);
//				return new ResponseEntity<>(map, HttpStatus.OK);
//			}
//			else {
//				map.put("success", true);
//				map.put("message", "UserName or Password was incorrect");
//				return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
//			}
//		} catch (Exception e) {
//			System.err.println(e);
//
//			map.put("success", false);
//			map.put("message", e.getMessage());
//			return new ResponseEntity<>(map, HttpStatus.METHOD_NOT_ALLOWED);
//		}

			try {
				Authentication authentication = authManager.authenticate(
						new UsernamePasswordAuthenticationToken("user-"+buyerDetails.getU_emailAddress(), buyerDetails.getU_password()));
				System.out.println("==>");
				if (authentication.isAuthenticated()) {
					map.put("success", true);
					map.put("message", "Login successfully");
					map.put("user", userTemp);
					Cookie cookie = new Cookie("u_token", jwtServices.generateToken(userTemp));
					cookie.setMaxAge(5 * 360); 
					cookie.setSecure(true);
					cookie.setHttpOnly(true);
					cookie.setPath("/");
					response.addCookie(cookie);
					return new ResponseEntity<>(map, HttpStatus.OK);
				} else {
					map.put("success", true);
					map.put("message", "UserName or Password was incorrect");
					return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
				}
			} catch (Exception e) {
				System.err.println("user Impl userLogin line 218 : "+e);

				map.put("success", false);
				map.put("message", e.getMessage());
				return new ResponseEntity<>(map, HttpStatus.METHOD_NOT_ALLOWED);
			}
	}


	
	@Override
	public ResponseEntity<?> userLogout(HttpServletResponse response) {
		Map<String, Object> map = new LinkedHashMap<>();
		map.put("message","User Logged-out succesfully");
		map.put("success", true);
		Cookie cookie = new Cookie("u_token", null);
		cookie.setMaxAge(0); // expires in 7 days
		cookie.setSecure(true);
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		response.addCookie(cookie);
		return new ResponseEntity<>(map,HttpStatus.OK);
	}
}
