import React, { useState } from 'react';
import { CenterLayout, SubjectTextField } from 'components/common';
import styled from 'styled-components';
import { themedPalette } from 'theme/styleTheme';

type SettingProps = {
  onClick: () => void;
};

const Setting = ({ onClick }: SettingProps) => {
  const handleOnClick = () => {
    if (!onClick) return;
    onClick();
  };

  return (
    <CenterLayout>
      <SettingWrapper>
        <Title>단어 입력</Title>
        <Desc>아이디어에 관한 단어를 적어주세요!</Desc>
        <SubjectTextField type="randomWord" onClick={handleOnClick} />
      </SettingWrapper>
    </CenterLayout>
  );
};

const SettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-bottom: 120px;
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: bold;
  color: ${themedPalette.main_text1};
`;

const Desc = styled.div`
  text-align: center;
  padding-bottom: 20px;
  color: ${themedPalette.main_text1};
`;

export { Setting };
