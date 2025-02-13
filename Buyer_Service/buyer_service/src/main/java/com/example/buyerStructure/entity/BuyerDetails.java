package com.example.buyerStructure.entity;

import java.util.ArrayList;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "userdetails")
public class BuyerDetails {

	@Id
	private Integer u_id;

	@Column(nullable = false)
	private String u_name;

	@Column(nullable = false, unique = true,length = 10)
	private Long u_phoneNumber;

	@Column(nullable = false, unique = true)
	private String u_emailAddress;

	@Column(nullable = false)
	private String u_password;

	@Column(insertable = true)
	private ArrayList<Integer> u_carts;
	
	@Column(insertable = true)
	private ArrayList<Integer> u_whitelist;

	@Column(nullable = false)
	private Integer __v;

	public BuyerDetails() {
		super();
	}

	public BuyerDetails(Integer u_id, String u_name, Long u_phoneNumber, String u_emailAddress, String u_password,
			ArrayList<Integer> u_carts, ArrayList<Integer> u_whitelist, Integer __v) {
		super();
		this.u_id = u_id;
		this.u_name = u_name;
		this.u_phoneNumber = u_phoneNumber;
		this.u_emailAddress = u_emailAddress;
		this.u_password = u_password;
		this.u_carts = u_carts;
		this.u_whitelist = u_whitelist;
		this.__v = __v;
	}

	public Integer getU_id() {
		return u_id;
	}

	public void setU_id(Integer u_id) {
		this.u_id = u_id;
	}

	public String getU_name() {
		return u_name;
	}

	public void setU_name(String u_name) {
		this.u_name = u_name;
	}

	public Long getU_phoneNumber() {
		return u_phoneNumber;
	}

	public void setU_phoneNumber(Long u_phoneNumber) {
		this.u_phoneNumber = u_phoneNumber;
	}

	public String getU_emailAddress() {
		return u_emailAddress;
	}

	public void setU_emailAddress(String u_emailAddress) {
		this.u_emailAddress = u_emailAddress;
	}

	public String getU_password() {
		return u_password;
	}

	public void setU_password(String u_password) {
		this.u_password = u_password;
	}

	public ArrayList<Integer> getU_carts() {
		return u_carts;
	}

	public void setU_carts(ArrayList<Integer> u_carts) {
		this.u_carts = u_carts;
	}

	public ArrayList<Integer> getU_whitelist() {
		return u_whitelist;
	}

	public void setU_whitelist(ArrayList<Integer> u_whitelist) {
		this.u_whitelist = u_whitelist;
	}

	public Integer get__v() {
		return __v;
	}

	public void set__v(Integer __v) {
		this.__v = __v;
	}

	@Override
	public String toString() {
		return "UserDetails [u_id=" + u_id + ", u_name=" + u_name + ", u_phoneNumber=" + u_phoneNumber
				+ ", u_emailAddress=" + u_emailAddress + ", u_password=" + u_password + ", u_carts=" + u_carts
				+ ", u_whitelist=" + u_whitelist + ", __v=" + __v + "]";
	}

	public void getSomeLazyLoadedField() {
		// TODO Auto-generated method stub
		
	}
	
}
