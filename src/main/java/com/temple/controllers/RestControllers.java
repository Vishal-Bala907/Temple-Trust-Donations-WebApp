package com.temple.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.temple.Entities.Devotee;
import com.temple.Entities.DonationForm;
import com.temple.Entities.Products;
import com.temple.repos.ArtistBookRepo;
import com.temple.repos.DonationRepo;
import com.temple.repos.FileUploadRepo;
import com.temple.repos.UserRepositories;
import com.temple.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@org.springframework.web.bind.annotation.RestController
public class RestControllers {
	@Autowired
	FileUploadRepo repo;
	@Autowired
	UserService service;
	@Autowired
	UserRepositories repositories;
	@Autowired
	FileUploadRepo fileUploadRepo;
	@Autowired
	DonationRepo donationRepo;
	@Autowired
	ArtistBookRepo artistBookRepo;
	
	@GetMapping(value = "/getAllItems", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Products>> getAllProducts() {
		List<Products> list = new ArrayList<>();
		list = repo.findAll();
		return ResponseEntity.ok().body(list);
	}

	@DeleteMapping("/data")
	public String getDataToUpdate() {
		return "redirect:/Users/Donate";

	}

	@GetMapping(value = "/get/profile", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Devotee> getUserProfile() {

		Devotee byUsername = repositories.findByUsername(this.service.getLoggedInUSer());
		return ResponseEntity.ok().body(byUsername);
	}

	@PutMapping(value = "/updateUser", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Devotee> updateUser(@RequestBody Devotee devotee) throws Exception {
		Devotee updateUser = service.updateUser(repositories.findByUsername(this.service.getLoggedInUSer()), devotee);
		return ResponseEntity.ok().body(updateUser);
	}

	@DeleteMapping(value = "/deleteUser", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Devotee> deleteUser(@RequestBody Devotee devotee) {
//		Devotee byUsername = repositories.findByUsername(this.service.getLoggedInUSer());
		repositories.delete(devotee);
		return ResponseEntity.ok().body(new Devotee());
	}

	@DeleteMapping(value = "/delete-item", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Products>> deleteItems(@RequestBody Products products) {
		fileUploadRepo.delete(products);
		List<Products> all = fileUploadRepo.findAll();
		return ResponseEntity.ok().body(all);
	}

	@GetMapping("/logout")
	public String logout(HttpServletRequest request, HttpServletResponse response) {
		SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
		logoutHandler.logout(request, response, SecurityContextHolder.getContext().getAuthentication());
		return "redirect:/login"; // You can redirect to any page after logout
	}
	
	@GetMapping("/admin/donation-requests")
	public ResponseEntity<List<DonationForm>> getIncompleteDonationRequests() {
		
		return ResponseEntity.ok().body(donationRepo.findIncompleteDonationDetails());
	}
	
	@PutMapping(value="/donation-completed",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<DonationForm>> makeDonationCopmlete(@RequestBody DonationForm donation){
		donation.setCollected(true);
		donationRepo.save(donation);
		return ResponseEntity.ok().body(donationRepo.findIncompleteDonationDetails());
	}
	@DeleteMapping(value="/reject-donation")
	public ResponseEntity<DonationForm> rejectDonation(@RequestBody DonationForm donation){
		donationRepo.delete(donation);
		return ResponseEntity.ok().body(new DonationForm());
	}
	
	

}
