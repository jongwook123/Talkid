package com.talkids.backend.common.resolver;

import com.talkids.backend.common.token.JwtTokenProvider;
import com.talkids.backend.member.entity.Member;
import com.talkids.backend.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import com.talkids.backend.common.annotation.LoginUser;
import org.springframework.util.StringUtils;

import static com.talkids.backend.common.filter.JwtAuthenticationFilter.AUTHORIZATION_HEADER;


@Component
public class LoginUserResolver implements HandlerMethodArgumentResolver {

    private JwtTokenProvider jwtProvider;
    private MemberService memberService;

    @Autowired
    public void setJwtProvider(JwtTokenProvider jwtProvider){
        this.jwtProvider = jwtProvider;
    }
    @Autowired
    public void setMemberService(MemberService memberService){
        this.memberService = memberService;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterAnnotation(LoginUser.class) != null;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter,
                                  ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest,
                                  WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            String accessToken = bearerToken.substring(7);
            boolean isValid = jwtProvider.validateToken(accessToken);
            if(isValid){
                //유효한 토큰이면 -> service로 요청하여 사용자 정보를 불러오자
                Authentication auth = jwtProvider.getAuthentication(accessToken);
                Member member = memberService.getMember(auth.getName());
                return member;
            }
            else{
                //유효한 토큰이 아니면
                return null;
            }
        }

        return null;
    }
}
