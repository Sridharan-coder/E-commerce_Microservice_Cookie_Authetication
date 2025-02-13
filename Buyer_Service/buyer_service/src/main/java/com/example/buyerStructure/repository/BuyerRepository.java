package com.example.buyerStructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.buyerStructure.entity.BuyerDetails;

public interface BuyerRepository extends JpaRepository<BuyerDetails, Integer> {
	
	@Query("SELECT b FROM BuyerDetails b WHERE b.u_emailAddress = :email") 
	BuyerDetails findByEmail(@Param("email") String email);
	
	
}
