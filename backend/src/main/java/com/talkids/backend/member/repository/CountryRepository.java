package com.talkids.backend.member.repository;

import com.talkids.backend.member.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CountryRepository  extends JpaRepository<Country, String> {

    Country findByCountryId(int countryId);
    List<Country> findAll();

}
