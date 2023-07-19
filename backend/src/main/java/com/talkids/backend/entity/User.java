package com.talkids.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name="User")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="userId")
    private int userId;

    @Column(name="userMail", nullable = false, length = 45)
    private String userMail;

    @Column(name="userPassword", nullable = false, length = 100)
    private String userPassword;

    @Column(name="userActive")
    @ColumnDefault("false")
    private Boolean userActive;

    @Column(name="userName", nullable = false, length = 100)
    private String userName;

    @Column(name="userProfile", nullable = false, columnDefinition = "LONGTEXT")
    private String userProfile;

    @OneToOne
    @JoinColumn(name="languageId")
    private Language language;

    @OneToOne
    @JoinColumn(name="userTypeId")
    private UserType userType;

    @OneToOne
    @JoinColumn(name="schoolId")
    private School school;

}
