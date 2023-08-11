package com.talkids.backend.member.repository;

import com.talkids.backend.member.entity.Follower;
import com.talkids.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowerRepository extends JpaRepository<Follower, String> {

    Optional<Follower> findByMemberAndFollowerMember(Member member, Member followerMember);

    List<Follower> findByMember(Member member);// 팔로잉

    List<Follower> findByFollowerMember(Member member); // 팔로워
}
