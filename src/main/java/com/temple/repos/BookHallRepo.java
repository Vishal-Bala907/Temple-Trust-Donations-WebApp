package com.temple.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.temple.Entities.BookHall;

public interface BookHallRepo extends JpaRepository<BookHall, Long> {
	BookHall findByDate(String date);
	
	@Query("SELECT u FROM BookHall u WHERE date = ?1")
	List<BookHall> findAvailableHallBookingDates(String date);
}
