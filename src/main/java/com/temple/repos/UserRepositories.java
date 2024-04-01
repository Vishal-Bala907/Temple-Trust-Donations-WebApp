package com.temple.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.temple.Entities.Devotee;


public interface UserRepositories extends JpaRepository<Devotee, Long> {
	Devotee	findByEmail(String email);
	Devotee findByUsername(String name);
	
//	@Query("SELECT u FROM Devotee WHERE u.username = ?1 and u.password = ?2")
//	Devotee findUserByUsernameAndPassword(String username,String password);

}
