// import PropTypes from 'prop-types';
import * as S from './style';

export default function AlarmModal({ title, message, close}) {
    return (
      <S.ModalOverlay>
        <S.ModalContainer>
          <S.ModalTitle>{title}</S.ModalTitle>
          <S.ModalMessage>{message}</S.ModalMessage>
          <S.ModalButton onClick={close}>Close</S.ModalButton>
        </S.ModalContainer>
      </S.ModalOverlay>
    );
  }
  
