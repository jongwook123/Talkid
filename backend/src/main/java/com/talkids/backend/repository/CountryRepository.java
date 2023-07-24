package com.talkids.backend.repository;

import com.talkids.backend.entity.Country;
import com.talkids.backend.entity.Language;
import com.talkids.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository  extends JpaRepository<Country, String> {

    Country findByCountryName(String countryName);
}
