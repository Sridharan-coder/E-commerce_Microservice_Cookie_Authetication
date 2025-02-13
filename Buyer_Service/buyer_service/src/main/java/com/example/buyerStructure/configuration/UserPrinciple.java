package com.example.buyerStructure.configuration;


import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.buyerStructure.entity.BuyerDetails;


public class UserPrinciple implements UserDetails{
	
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private BuyerDetails user;
	

	public UserPrinciple(BuyerDetails user) {
		super();
		this.user = user;
		System.err.println("user principle line 34 : "+"User Principle Constructor invoked ---> "+user.toString());
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return Collections.singleton(new SimpleGrantedAuthority("USER"));
	}

	@Override
	public String getPassword() {
		System.out.print("user principle line 45 : "+"Selessssssssss --->"+user.getU_password());
		return user.getU_password();
	}

	@Override
	public String getUsername() {
		System.out.print("user principle line 53 : "+"Selessssssssss --->"+user.getU_emailAddress());
		return user.getU_emailAddress();
	}

}
