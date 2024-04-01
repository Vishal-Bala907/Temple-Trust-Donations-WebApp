package com.temple.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.temple.Entities.BookArtist;
import com.temple.Entities.BookHall;
import com.temple.repos.ArtistBookRepo;
import com.temple.repos.BookHallRepo;

@RestController
public class DateAvaibilityController {

	@Autowired
	ArtistBookRepo artistBookRepo;
	@Autowired
	BookHallRepo bookHallRepo;
	
	
	@GetMapping("/get-artist-book-date/{date}")
	public ResponseEntity<List<BookArtist>> getArtistBookDateAvaibility(@PathVariable("date") String date){
		System.out.println(artistBookRepo.findByDateAvaibility(date).size());
		System.out.println(date);
		return ResponseEntity.ok().body(artistBookRepo.findByDateAvaibility(date));
	}
	
	@GetMapping("/get-hall-book-date/{date}")
	public ResponseEntity<List<BookHall>> getHallBookDateAvaibility(@PathVariable("date") String date){
		System.out.println(bookHallRepo.findAvailableHallBookingDates(date).size());
		System.out.println(date); 
		return ResponseEntity.ok().body(bookHallRepo.findAvailableHallBookingDates(date));
	}
	
	@GetMapping("/7days-events")
	public ResponseEntity<List<BookHall>> getEventsOfNext7Days(){
		LocalDate date = LocalDate.now();
		List<BookHall> booked = new ArrayList<>();
		for(int i=0 ; i<=6; i++) {
			BookHall hall = bookHallRepo.findByDate(date.plusDays(i).toString());
			if(hall!= null)
				booked.add(hall);
		}
		
		return ResponseEntity.ok().body(booked);
	}
}
