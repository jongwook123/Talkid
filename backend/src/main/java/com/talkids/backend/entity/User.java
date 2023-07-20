package com.talkids.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Entity
@Table(name="User")
@Data
@SQLDelete(sql = "UPDATE user SET deletedAt = true WHERE userId = ?")
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

    @ManyToOne
    @JoinColumn(name="languageId")
    private Language language;

    @ManyToOne
    @JoinColumn(name="userTypeId")
    private UserType userType;

    @ManyToOne
    @JoinColumn(name="schoolId")
    private School school;

    @Column(name="createdAt")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name="updatedAt")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Column(name="deleatedAt")
    @ColumnDefault("false")
    private Boolean deletedAt;

}
