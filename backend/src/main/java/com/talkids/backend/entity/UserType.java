package com.talkids.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="UserType")
@Getter
@Setter
public class UserType {

    @Id
    @Column(name="userTypeId")
    private int userTypeId;

    @Column(name="userTypeName", nullable=false, length = 45)
    private String userTypeName;
}
