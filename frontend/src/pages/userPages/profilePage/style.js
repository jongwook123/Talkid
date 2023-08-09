import styled from "styled-components";
import IROnly from "styles/IROnly";

export const PageHeader = styled.header`
    & > h1 {
        ${IROnly}
    }
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #C7D1DC;
    height: 30%;
`

export const Body = styled.main`
    & > h2 {
        ${IROnly}
    }
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 35%;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80%;

`

export const PageBody = styled.section`
    & > h2 {
            ${IROnly}
        }
display: flex;
height: 70%;
flex: 1;


`

export const BodyHeader = styled.header`
    & > h2 {
            ${IROnly}
        }
    background-color: white;
    height: 15%;
`
export const ButtonWrapper1 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 300px;
    margin-left:80%;
    height: 100%;
    align-items: center;
    grid-gap: 30px; /* 버튼들 간의 간격을 설정합니다 */
    
`
export const ButtonWrapper2 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 300px;
    margin-left:75%;
    height: 100%;
    align-items: center;
    grid-gap: 30px; /* 버튼들 간의 간격을 설정합니다 */
    
`

export const LeftBody = styled.section`
    & > h3 {
        ${IROnly}
    }
    position: relative;
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* flex: 0.4; */
    top:-45%;
    min-width: 300px; /* 최소 너비 지정 */
    margin-left: 50px;

`
export const Name = styled.span`
    font-size: 35px;
    font-family: 'Righteous', sans-serif;
    margin-top: 50px;
    margin-bottom: 10px;
`

export const Pic = styled.img`
    /* position: absolute; */
    border-radius: 100px;
    width: 200px;
    height: 200px;
    top: -75px;
    left: 6vw;
    /* scale: initial; */
`
export const RightBody = styled.section`
    & > h3 {
        ${IROnly}
    }
    display: flex;
    flex-direction: column;
    width: 75%;
    margin-top: 3%;
    flex: 0.8;
    border-left: 3px solid black;
    padding-left: 80px;
    padding-top: 30px;
    min-width: 400px; /* 최소 너비 지정 */
    margin-left: 50px;
`

export const Title = styled.span`
    font-size: 20px;
    font-family: 'Righteous', sans-serif;
    margin-bottom: 1%;

`

export const Info = styled.span`
    font-size: 15px;
    font-family: 'Righteous', sans-serif;
    margin-bottom: 4%;
`
export const ExpBarBackground = styled.div`
    background-color: #C7D1DC;
    height: 25px;
    width: 230px;
    border-radius: 15px;
    margin-top: 40px;
    
`

export const ExpBar = styled.div`
    background-color: #8EA3BC; /* 바의 배경색 */
    height: 25px; /* 바의 높이 */
    width: ${props => props.width || 0}; /* 바의 너비 설정 */
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    
    
`
export const Exptitle = styled.span`
    position: relative;
    top: 7%;
    bottom: 0;
    left: -90px;
    right: 0;
    font-size: 15px;
    font-family: 'Righteous', sans-serif;

`

export const Follow = styled.div`
    display: flex;
    margin: auto;
`

export const Following = styled.div`
    font-size: 20px;
    font-family: 'Righteous', sans-serif;
    padding: 20px;
    & > p {
        text-align : center;
        font-size: 35px;
        margin: 7px;
    }
`
export const Followers = styled.div`
    font-size: 20px;
    font-family: 'Righteous', sans-serif;
    padding: 20px;
    & > p {
        text-align: center;
        font-size: 35px;
        margin: 7px;
        }
`
