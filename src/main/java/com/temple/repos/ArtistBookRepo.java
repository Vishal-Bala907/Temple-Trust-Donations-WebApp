package com.temple.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.temple.Entities.BookArtist;

public interface ArtistBookRepo extends JpaRepository<BookArtist, Integer> {
	BookArtist findByDate(String date);
	
	@Query("SELECT artist FROM BookArtist artist WHERE artist.date = ?1")
	List<BookArtist> findByDateAvaibility(String date);
}
