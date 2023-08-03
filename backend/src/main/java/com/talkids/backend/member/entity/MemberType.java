package com.talkids.backend.member.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="MemberType")
@Data
public class MemberType {

    @Id
    @Column(name="memberTypeId")
    private int memberTypeId;

    @Column(name="memberTypeName", nullable=false, length = 50)
    private String memberTypeName;
}
