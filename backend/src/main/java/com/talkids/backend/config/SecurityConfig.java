package com.talkids.backend.config;

import com.talkids.backend.common.filter.JwtAuthenticationFilter;
import com.talkids.backend.common.token.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

/** HTTP 요청이 들어온 이후의 설정 */

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf().disable()
            //.csrf(Customizer.withDefaults()) // 서버에 인증정보를 저장하지 않기 때문에(stateless, rest api) csrf를 추가할 필요 X
            .formLogin(Customizer.withDefaults())
            .httpBasic(Customizer.withDefaults()) // 기본 인증 로그인 사용하지 않음. (rest api)
            .sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/**").permitAll()
                .requestMatchers("/member/*").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, redisTemplate), UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//        http
//                .csrf().disable()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
//                .authorizeHttpRequests().anyRequest().permitAll();
//
///*        http
//            .csrf(Customizer.withDefaults()) // 서버에 인증정보를 저장하지 않기 때문에(stateless, rest api) csrf를 추가할 필요 X
//            .formLogin(Customizer.withDefaults())
//            .httpBasic(Customizer.withDefaults()) // 기본 인증 로그인 사용하지 않음. (rest api)
//            .cors(Customizer.withDefaults())
//            // session 설정 -> JWT를 사용하기 때문에 세션 사용 X, stateless
//            .sessionManagement((session) -> session
//                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//            // request permission
//            .authorizeHttpRequests(request -> request
//                    .requestMatchers("/", "/favicon.ico", "/auth/**", "/member/**", "/member/signUp", "/login").permitAll()
//                    .anyRequest().authenticated()
//            )
//            // jwt filter -> 인증 정보 필터링 전에(filterBefore) 필터
//            .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);*/
//
//        return http.build();
//    }
}
