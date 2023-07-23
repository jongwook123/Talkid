package com.talkids.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Entity
@Table(name="Member")
@Data
@SQLDelete(sql = "UPDATE Member SET deletedAt = true WHERE memberId = ?")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="memberId")
    private int memberId;

    @Column(name="memberMail", nullable = false, length = 45)
    private String memberMail;

    @Column(name="memberPassword", nullable = false, length = 100)
    private String memberPassword;

    @Column(name="memberActive")
    @ColumnDefault("false")
    private Boolean memberActive;

    @Column(name="memberName", nullable = false, length = 100)
    private String memberName;

    @Column(name="memberIntroduce", nullable = false, length = 200)
    private String memberIntroduce;

    @Column(name="memberImage", nullable = false, columnDefinition = "LONGTEXT")
    private String memberImage;

    @Column(name="memberFilterCount")
    private int memberFilterCount;

    @Column(name="refreshToken", nullable = false, length = 100)
    private String refreshToken;

    /* ---------------------------------- */

    @ManyToOne
    @JoinColumn(name="memberTypeId")
    private MemberType memberType;

    @ManyToOne
    @JoinColumn(name="schoolId")
    private School school;

    @ManyToOne
    @JoinColumn(name="languageId")
    private Language language;

    @ManyToOne
    @JoinColumn(name="countryId")
    private Country country;

    /* ---------------------------------- */

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
