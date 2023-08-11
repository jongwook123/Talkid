package com.talkids.backend.language.service;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.talkids.backend.language.entity.Language;
import com.talkids.backend.language.repository.LanguageRepository;
import com.talkids.backend.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LanguageServiceImpl implements LanguageService{

    private final LanguageRepository languageRepository;
    private final ObjectMapper mapper = new ObjectMapper();
    private final String DICTIONARY_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    private final String TRANSLATE_URL = "https://api.pawan.krd/gtranslate";

    public List<Language> getLanguages() {
        return languageRepository.findAll();
    }

    public void getDictionary(Member member, String from, String to, String text) {
//        String myLanguageCode = member.getLanguage().getLanguageCode();

        //from -> 영어 -> to의 과정 거치기

        //1. from언어를 영어로 바꾸기
        get(DICTIONARY_URL+"dog");

    }

    private String get(String apiURL){
        try{
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setDoOutput(false);

            StringBuilder sb = new StringBuilder();
            if(con.getResponseCode() == HttpURLConnection.HTTP_OK){
                BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
                String line;

                while( (line = br.readLine()) != null){
                    //읽을 내용이 있으면
                    sb.append(line).append("\n");
                }
                br.close();

                List<Map<String, Object>> result = mapper.readValue(sb.toString(), List.class);
                Map<String, Object> json = result.get(0);

                List<Object> phonetics = (List)json.get("phonetics");   //발음
                List<Object> meanings = (List)json.get("meanings");     //사전적 의미

                for(Object phonetic: phonetics){
                    System.out.println(phonetic);
                }

                for(Object meaning: meanings){
                    System.out.println(meaning);
                }

//                for(Map.Entry<String, Object> keyValue : json.entrySet()){
//                    System.out.println(keyValue);
//                }
            }

        } catch(Exception e){
            System.out.println(e.getMessage());
        }

        return null;
    }
}
