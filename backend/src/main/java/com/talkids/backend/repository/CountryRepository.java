package com.talkids.backend.repository;

import com.talkids.backend.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CountryRepository  extends JpaRepository<Country, String> {

    Country findByCountryId(int countryId);
    List<Country> findAll();

}
