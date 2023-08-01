# nginx 이미지를 사용
FROM nginx

# 컨테이너 내부에 app폴더를 생성
RUN mkdir /app

# working directory를 설정
WORKDIR /app

# work directory에 build폴더 생성
RUN mkdir ./build

# host pc의 현재 경로의 buidl 폴더를 container의 build폴더로 복사
ADD ./build ./build

# nginx의 default.conf를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc의 nginx.conf를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

# 80 포트 오픈
EXPOSE 80

# container 실행 시 자동으로 실행할 command. nginx 시작합니다.
CMD ["nginx", "-g", "daemon off;"]
