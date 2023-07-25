package com.talkids.backend.service;

import com.talkids.backend.entity.Member;
import com.talkids.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    /** username이 DB에 존재하는지 확인 */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername : " + username);

        return memberRepository.findByMemberMail(username)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
    }

    /** 해당하는 User 의 데이터가 존재한다면 UserDetails 객체로 만들어서 리턴 */
    private UserDetails createUserDetails(Member member) {
        System.out.println("createUserDetails : " + member);

        return User.builder()
                .username(member.getMemberName())
                .password(member.getMemberPassword())
                .build();
    }
}