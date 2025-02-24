package com.example.buyerStructure.configuration;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.buyerStructure.entity.BuyerDetails;
import com.example.buyerStructure.repository.BuyerRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class MyUserDetailService implements UserDetailsService {

	@Autowired
	private BuyerRepository buyerRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		String[] info = username.split("-");
		System.err.println("Myuser Details line 29 : " + username + "------>Roles" + Arrays.toString(info));
		if (info[0].equals("user")) {

			return userInfo(info[1]);
		} else {
			return null;
		}
	}

	@Transactional
	private UserDetails userInfo(String username) {
		
		Integer u_id=0;
		try {
			Integer.parseInt(username);
			u_id=Integer.parseInt(username);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		BuyerDetails buyer;


		if(u_id!=0) {
			System.err.println("Myuser Details line 42 : " + username + "------>Roles => "
					+ buyerRepository.findById(Integer.parseInt(username)).orElseThrow(() -> new EntityNotFoundException("User not found")));
			System.out.println("+++++>");
			buyer = buyerRepository.findById(Integer.parseInt(username)).orElseThrow(() -> new EntityNotFoundException("User not found"));
			System.err.println("Myuser Details line 95 : " + buyer.toString());
			if (buyer.getU_id() == Integer.parseInt(username)) {
				System.out.println("Myuser Details line 97 : " + "username --> " + buyer.toString());
				return User.withUsername(buyer.getU_emailAddress()).password(buyer.getU_password())
						.authorities(Collections.emptyList()).build();
			} else {
				throw new UsernameNotFoundException("Something went wrong");
			}
		}
		else {
			
			buyer =  buyerRepository.findByEmail(username);
			if (buyer!=null && buyer.getU_emailAddress().equals(username)) {
				System.out.println("Myuser Details line 109 : "+buyer.getU_password()+"Userssssss-------->"+buyer.getU_emailAddress());
				return User.withUsername(buyer.getU_emailAddress()) 
						.password(buyer.getU_password())
						.authorities(Collections.emptyList()).build();
			} else {
				throw new UsernameNotFoundException("User not found");
			}
		}

	}

}
