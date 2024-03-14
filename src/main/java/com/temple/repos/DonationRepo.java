package com.temple.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.temple.Entities.DonationForm;

public interface DonationRepo extends JpaRepository<DonationForm, Long> {
	@Query(value = "SELECT d FROM DonationForm d WHERE collected = false")
	List<DonationForm> findIncompleteDonationDetails();

}
