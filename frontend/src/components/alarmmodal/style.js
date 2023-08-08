import styled from 'styled-components';

export const  ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  background-color: #C7D1DC;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 10px;
`;

export const ModalMessage = styled.p`
  margin: 0 0 20px;
`;

export const ModalButton = styled.button`
  background-color: #8EA3BC;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;