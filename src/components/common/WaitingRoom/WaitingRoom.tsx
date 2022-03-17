import React from 'react';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';
import { HeaderBar } from '../HeaderBar';
import { SubjectTextField } from '../SubjectTextField';
import { PrimaryButton } from '../PrimaryButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { sixHatSelector } from '../../../redux/modules/sixHat';

type WaitingRoomProps = {
  onClickSubmit?: () => void;
  onClickComplete?: () => void;
  onChange?: () => void;
};

const WaitingRoom = ({ onClickSubmit, onClickComplete, onChange }: WaitingRoomProps) => {
  const { isAdmin, isSubmit } = useAppSelector(sixHatSelector);
  const handleOnclickSubmit = () => {
    if (!onClickSubmit) return;
    onClickSubmit();
  };

  const handleOnClickComplete = () => {
    if (!onClickComplete) return;
    onClickComplete();
  };

  const handleOnChange = () => {
    if (!onChange) return;
    onChange();
  };

  return (
    <>
      <HeaderBar>
        <h1>ThinkBoom</h1>
      </HeaderBar>
      <Grid>
        <Empty />
        <TextFieldWrapper>
          <h2>회의 주제</h2>
          <SubjectTextField onChange={handleOnChange} onClick={handleOnclickSubmit} />
        </TextFieldWrapper>
        <PrimaryButton text="완료" onClick={handleOnClickComplete} disabled={isSubmit && isAdmin} />
      </Grid>
    </>
  );
};

const Grid = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0px;
`;

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Empty = styled.div``;

export { WaitingRoom };
