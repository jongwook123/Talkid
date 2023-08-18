package com.talkids.backend.common.filter;

import com.talkids.backend.common.token.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;

    public JwtAuthenticationFilter(JwtTokenProvider provider, RedisTemplate template) {
        jwtTokenProvider = provider;
        redisTemplate = template;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 1. Request Header 에서 JWT 토큰 추출
        log.info("get Request: {}", request);
        HttpServletRequest httpServletRequest = request;
        String jwt = resolveAccessToken(httpServletRequest);

        // 2. 유효한 토큰인지 확인
        if (StringUtils.hasText(jwt) && jwtTokenProvider.validateToken(jwt)) {

            // Redis 에 해당 accessToken logout 여부 확인
            String isLogout = (String)redisTemplate.opsForValue().get(jwt);
            if (ObjectUtils.isEmpty(isLogout)) {
                // 토큰이 유효하면 토큰으로부터 유저 정보를 받아온다
                Authentication authentication = jwtTokenProvider.getAuthentication(jwt);
                // SecurityContext 에 Authentication 객체를 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }

    /** Request의 Header에서 token 값을 추출 */
    public String resolveAccessToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

}