package com.talkids.backend.dm.repository;

import com.talkids.backend.dm.entity.BadWords;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BadWordsRepository extends JpaRepository<BadWords, String> {

    List<BadWords> findAll();
    BadWords findByWords(String words);

}
