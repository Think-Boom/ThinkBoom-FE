import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import { CenterLayout, PrimaryButton } from '../../common';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { postIdea, timerData, ideaCardCreate } from '../../../redux/modules/brainWriting/actions';
import { brainWritingSelector } from '../../../redux/modules/brainWriting/selectors';
import { Timer } from '../Timer';
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
  const { senderId, bwRoomId, BWsubject, nickname, BWtimer, BWisAdmin } =
    useAppSelector(brainWritingSelector);
  const [disabled, setDisabled] = useState();
  const [idea, setIdea] = useState<string>('');
  const SendIdea = () => {
    dispatch(postIdea({ senderId, idea, bwRoomid: bwRoomId }));
  };

  const shareRoomId = window.location.pathname.split('/')[4];
  const [seconds, setSeconds] = useState(BWtimer);
  useEffect(() => {
    if (nickname) {
      dispatch(timerData(shareRoomId));
    }
  }, []);
  //BWtimer= res.timerData

  useEffect(() => {
    if (seconds == null) {
      setSeconds(BWtimer);
    }
  }, [BWtimer]);

  useEffect(() => {
    if (seconds !== null) {
      const interval = setInterval(() => {
        if (seconds === 0) clearInterval(interval);
        else setSeconds(seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  console.log(BWtimer, '리덕스 저장 타이머, BWtimer');
  console.log(seconds, '현 페이지 타이머,seconds state');

  return (
    <CenterLayout>
      <>
        <Timer seconds={seconds} />
        <CardWrapper>
          <StyledCard width={width} height={height}>
            <StlyeSubject>{subject}</StlyeSubject>
            <StyledIdea onChange={e => setIdea(e.target.value)}>{children}</StyledIdea>
            <StyledButton onClick={SendIdea}>작성</StyledButton>
          </StyledCard>
        </CardWrapper>
        <ButtonWrapper>
          {BWisAdmin ? (
            <PrimaryButton text="완료" disabled={!BWisAdmin} onClick={onClickComplete} />
          ) : null}
        </ButtonWrapper>
      </>
    </CenterLayout>
  );
};

const CardWrapper = styled.div`
  position: relative;
  margin-top: 150px;
`;
const ButtonWrapper = styled.div`
  padding-top: 10px;
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

const StlyeSubject = styled.h3`
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
