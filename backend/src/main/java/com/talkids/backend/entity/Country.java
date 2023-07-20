package com.talkids.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Country")
@Data
public class Country {

    @Id
    @Column(name="countryId")
    private int countryId;

    @Column(name="countryName", nullable=false, length=100)
    private String countryName;

    @Column(name="countryCode", nullable=false, length=3)
    private String countryCode;
}
