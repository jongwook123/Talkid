package com.talkids.backend.member.repository;

import com.talkids.backend.member.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CountryRepository  extends JpaRepository<Country, String> {

    Optional<Country> findByCountryId(int countryId);
    List<Country> findAll();

}
