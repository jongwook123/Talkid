package com.talkids.backend.repository;

import com.talkids.backend.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository  extends JpaRepository<Country, String> {

    Country findByCountryId(int countryId);

}
