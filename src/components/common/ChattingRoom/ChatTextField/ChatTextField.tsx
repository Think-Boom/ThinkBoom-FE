import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../theme';

type ChatTextFieldType = {
  sendMessage: (message: string) => void;
};

const ChatTextField = ({ sendMessage }: ChatTextFieldType) => {
  const [content, setContent] = useState<string>('');

  const handleSendMessage = () => {
    sendMessage(content);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
      setContent('');
    }
  };

  return (
    <TextFieldContainer>
      <TextField
        value={content || ''}
        onChange={e => setContent(e.target.value)}
        onKeyPress={e => onKeyPress(e)}
      />
      <Button onClick={handleSendMessage}>입력</Button>
    </TextFieldContainer>
  );
};

const TextField = styled.input`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 18px;
  height: 100%;
  color: ${themedPalette.main_text1};
`;

const TextFieldContainer = styled.div`
  width: 100%;
  height: 60px;
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 50px 0 20px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 40px;
  height: 20px;
  position: absolute;
  right: 15px;
  border: none;
  background-color: transparent;
  color: ${themedPalette.main_text1};
  cursor: pointer;
`;

export { ChatTextField };
