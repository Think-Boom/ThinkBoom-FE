import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import { CenterLayout, PrimaryButton } from '../../common';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  brainWritingSelector,
  updateTimerData,
  postIdea,
  getTimerData,
  getUpdatedTimerData,
} from '@redux/modules/brainWriting';
import { useRouter } from 'next/router';
import useTimer from '@hooks/useTimer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CardProps = {
  width: number;
  height: number;
  subject: string | undefined;
  children?: React.ReactChild;
  onClickComplete: () => void;
};
type StyleProps = {
  width: number;
  height: number;
};

const BwCard = ({ width, height, subject, onClickComplete, children }: CardProps) => {
  const dispatch = useAppDispatch();
  const { userId, roomId, isAdmin, isTimerOver, BWtimer } = useAppSelector(brainWritingSelector);
  const [idea, setIdea] = useState<string>('');

  const SendIdea = () => {
    dispatch(postIdea({ userId, idea, roomId }));
  };

  useEffect(() => {
    if (isTimerOver) {
      onClickComplete();
    }
  }, [isTimerOver]);

  useEffect(() => {
    if (BWtimer === 10) {
      toast.info('10초 뒤에 아이디어 입력이 완료됩니다. 아이디어 입력을 완료해주세요.');
    }
  }, [BWtimer]);

  useTimer({ type: 'brainwritingIdea', roomId });

  return (
    <>
      <ToastContainer position="bottom-left" autoClose={10000} theme="dark" />
      <CenterLayout>
        <Container>
          <Empty />
          <CardWrapper>
            <StyledCard width={width} height={height}>
              <Subject>{subject}</Subject>
              <StyledIdea onChange={e => setIdea(e.target.value)}>{children}</StyledIdea>
              <StyledButton onClick={SendIdea}>작성</StyledButton>
            </StyledCard>
          </CardWrapper>
          <ButtonWrapper>
            {isAdmin ? (
              <PrimaryButton text="완료" disabled={!isAdmin} onClick={onClickComplete} />
            ) : null}
          </ButtonWrapper>
        </Container>
      </CenterLayout>
    </>
  );
};

const Empty = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

const CardWrapper = styled.div`
  position: relative;
  padding-bottom: 50px;
`;
const ButtonWrapper = styled.div`
  margin: auto;
`;

const StyledCard = styled.div<StyleProps>`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: ${themedPalette.card_bg_normal};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  position: relative;
  transition: 0.2s ease-in-out;
  text-align: center;
  margin: auto;
`;

const Subject = styled.h3`
  text-align: center;
  font-size: 28px;
`;

const StyledIdea = styled.textarea`
  height: 60%;
  width: 82%;
  border: 5px solid ${themedPalette.border_1};
  border-radius: 12px;
  position: relative;
  text-align: center;
  margin: auto;
  font-size: 20px;
  resize: none;
  padding: 30px;
  outline: none;
  transition: 0.3s ease-in-out;
  :focus {
    border: 5px solid #2962ff;
  }
`;

const StyledButton = styled.button`
  height: 12%;
  width: 82%;
  background-color: ${themedPalette.component_2};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 12px;
  position: relative;
  text-align: center;
  margin: 17px;
  cursor: pointer;
  font-size: 20px;
`;

export { BwCard };
