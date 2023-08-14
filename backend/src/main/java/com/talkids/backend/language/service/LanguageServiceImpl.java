package com.talkids.backend.language.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.talkids.backend.language.entity.Language;
import com.talkids.backend.language.repository.LanguageRepository;
import com.talkids.backend.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.talkids.backend.language.dto.PartOfDictDto;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.LinkedList;
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

    public List<PartOfDictDto> getDictionary(Member member, String from, String to, String text){
        String myLanguageCode = member.getLanguage().getLanguageCode();

        //from -> 영어 -> to의 과정 거치기

        //1. from언어를 영어로 바꾸기
        String enWord = null;
        if(from.equals("en")){
            //from언어가 이미 영어로 주어졌으면
            enWord = text;
        }
        else{
            //영어가 아닌 언어이면 영어로 바꿔서
            enWord = translate(from, "en", text);
        }

        String toWord = translate("en", to, enWord);    //영어로 번역된 거를 to언어로 다시 변환

        //2. 영어 사전 받아오기
        List<PartOfDictDto> dicts = getDictionary(enWord);

        //3. 영어 사전 번역해주기
        List<PartOfDictDto> result = translateDictionary(toWord, dicts, myLanguageCode, to);

        return result;
    }

    public List<PartOfDictDto> translateDictionary(String word, List<PartOfDictDto> dicts, String memberCode, String toCode){
        int length = dicts.size();

        List<PartOfDictDto> resultDicts = new ArrayList<>(length);

        StringBuilder requireToLanguages = new StringBuilder("");
        StringBuilder requireMemberLanguages = new StringBuilder("");

        for(PartOfDictDto dict : dicts){
            //하나의 사전 내용들을 가져와서
            String partOfSpeech = dict.getPartOfSpeech();   //verb, noun와 같은 유형 가져와서
            String definition = dict.getDefinition();       //단어의 의미
            String example = dict.getExample();             //단어에 대한 예시

            requireToLanguages.append(example == null ? "" : example).append("\n");
            requireMemberLanguages.append(partOfSpeech).append("§").append(definition).append("\n");                 //번역이 필요한 곳들로 각각 넣어주고
        }
        String[] translatedToLanguages = translate("en", toCode, requireToLanguages.toString()).split("\n");
        String[] translatedMemberLanguages = translate("en", memberCode, requireMemberLanguages.toString()).split("\n");

        int iLengnth = Math.min(translatedToLanguages.length, translatedMemberLanguages.length);

        for(int i = 0; i < iLengnth ; i++){
            String[] partOfSpeechAndDefinition = translatedMemberLanguages[i].split("§");

            String partOfSpeech = partOfSpeechAndDefinition[0];
            String definition = partOfSpeechAndDefinition[1];
            String example = translatedToLanguages[i];

            PartOfDictDto dict = PartOfDictDto.builder()
                                .word(word)
                                .partOfSpeech(partOfSpeech)
                                .definition(definition)
                                .example(example)
                                .build();

            resultDicts.add(dict);
        }

        return resultDicts;
    }

    private List<PartOfDictDto> getDictionary(String enWord){
        List<PartOfDictDto> dicts = new LinkedList<>();
        String resultString = get(DICTIONARY_URL + enWord);
        try{
            Map<String, Object> json = (Map)mapper.readValue(resultString, List.class).get(0);
            List<Map<String, Object>> meanings = (List)json.get("meanings");

            for(Map<String, Object> meaning: meanings){
                String partOfSpeech = (String)meaning.get("partOfSpeech");                  //noun, verb와 같은 단어의 분류
                List<Map<String, Object>> definitions = (List)meaning.get("definitions");   //단어의 의미들
                for(Map<String, Object> def: definitions){
                    String definition = (String)def.get("definition");  //단어의 의미
                    String example = (String)def.get("example");        //예시

                    PartOfDictDto dict = PartOfDictDto.builder()
                                        .partOfSpeech(partOfSpeech)
                                        .definition(definition)
                                        .example(example)
                                        .build();       // {의미 - 정의 - 예시} 로 구성된 하나의 객체
                    dicts.add(dict);
                }
            }


        } catch(Exception e){}

        return dicts;
    }



    // from -> to 로 text(from언어인 것)를 번역해준다
    public String translate(String from, String to, String text){
        try{
            StringBuilder sb = new StringBuilder(TRANSLATE_URL);
            sb.append("?").append("from=").append(from)
                .append("&").append("to=").append(to)
                .append("&").append("text=").append(URLEncoder.encode(text, "UTF-8"));
            String url = sb.toString();
            String result = get(url);
            Map<String, String> json = mapper.readValue(result, Map.class);

            String translated = json.get("translated");
            return translated;
        } catch(Exception e){}
        return null;
    }

    private String get(String apiURL){
        try{
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setDoOutput(false);

            StringBuilder sb = new StringBuilder();
            if(con.getResponseCode() == HttpURLConnection.HTTP_OK){
                BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
                String line;

                while( (line = br.readLine()) != null){
                    //읽을 내용이 있으면
                    sb.append(line).append("\n");
                }
                br.close();

                return sb.toString();
            }

        } catch(Exception e){}

        return null;
    }
}
