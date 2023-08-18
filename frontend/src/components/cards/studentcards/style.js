import styled from "styled-components";

export const CardSection = styled.section`
    width: 90%;
    padding: 0 15px;
    position: relative;
    display: grid;
    /* grid-template-columns: 1fr 5fr; */
    border-radius: ${props => props.theme.border_radius.lv2};
    font-size: ${props => props.theme.font_size.lv4};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    align-items: center;
    & > img {
        border-radius: 50%;
        width: 50%;
    }
    

`
export const TextContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 3fr 1fr 1fr;
    align-items: center;
    text-align: center;
    & > h2 {
        font-size: ${props => props.theme.font_size.lv5};
        font-weight: 700
    
    }

    & > h3 {
        text-align: right;
        font-size: ${props => props.theme.font_size.lv4};
        font-weight: 700;
        color: red;
    }
    & > svg {
        margin-left: auto;
        color: ${props => props.theme.colors.theme.orange_dark};
        height: 80%;
    }
`

export const ProgressWrapper = styled.div`

`

export const Progress = styled.div`
  width: 100%;
  height: 20px;
  background-color: gray;
  border-radius: 5px;
  margin:20px 0 20px 0;
`;

export const Dealt = styled.div`
background-color: ${props => props.color === 'orange' ? `${props.theme.colors.theme.orange}` : props.color === 'green' ? `${props.theme.colors.theme.green}` : `${props.theme.colors.theme.blue}`};  width: ${(props) => props.dealt*0.2 + "%"};
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;