import React, { useState } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../theme/styleTheme';
import { Card } from '../../../common';
import { HatImage } from 'components/common';

import { UserList, HatType } from 'redux/modules/sixHat/types';
import { useAppSelector } from 'redux/hooks';
import { sixHatSelector } from 'redux/modules/sixHat';
import BGHatLeft from '../../../../../public/asset/backgrounds/bg_hat_left.png';
import BGHatRight from '../../../../../public/asset/backgrounds/bg_hat_right.png';
import Image from 'next/image';
import useHatData from 'hooks/useHatData';

type SelectHatBoxProps = {
  myHat: HatType;
  userList: UserList;
  onClickHat?: (arg: any) => void;
  onClickRandom: (userHatList: UserList) => void;
};

type StyleProps = {
  width?: number;
  height?: number;
  isMouseOver?: boolean;
};

const SelectHatBox = ({ myHat, userList, onClickHat, onClickRandom }: SelectHatBoxProps) => {
  const { isAdmin, subject } = useAppSelector(sixHatSelector);
  const hatData = useHatData();

  const handleOnClickHat = (hat: string) => {
    if (!onClickHat) return;
    onClickHat(hat);
  };

  return (
    <Container>
      <BGLeft>
        <Image src={BGHatLeft} alt="background_image" />
      </BGLeft>
      <SubjectBox>
        {subject}
        {isAdmin && <RandomButton onClick={() => onClickRandom(userList)}>랜덤</RandomButton>}
      </SubjectBox>
      <DownBox>
        <UserListBox>
          <MyHatBox>
            <HatImage isMe={true} type={myHat} width={100} height={100} />
          </MyHatBox>
          <UserListColumn>
            {userList.map(user => {
              return (
                <UserProfile key={user.nickname}>
                  <HatImage type={user.hat} width={25} height={25} />
                  <UserNickname>{user.nickname}</UserNickname>
                </UserProfile>
              );
            })}
          </UserListColumn>
        </UserListBox>
        <CardListBox>
          {hatData.map((hat, idx) => {
            return (
              <Card width={200} height={200} key={idx}>
                {hat.isOver ? (
                  <HatBox isMouseOver={hat.isOver}>
                    <h3>{hat.text}</h3>
                    <DescText>{hat.desc}</DescText>
                    <TouchArea
                      onMouseOver={() => hat.setIsOver()}
                      onMouseOut={() => hat.setIsOver()}
                      onClick={() => handleOnClickHat(hat.value)}
                    />
                  </HatBox>
                ) : (
                  <HatBox>
                    <HatImage type={hat.value as HatType} width={120} height={120} />
                    <div>{hat.text}</div>
                    <TouchArea
                      onMouseOver={() => hat.setIsOver()}
                      onMouseOut={() => hat.setIsOver()}
                      onClick={() => handleOnClickHat(hat.value)}
                    />
                  </HatBox>
                )}
              </Card>
            );
          })}
        </CardListBox>
      </DownBox>
      <BGRight>
        <Image src={BGHatRight} alt="background_image" />
      </BGRight>
    </Container>
  );
};

const Container = styled.div`
  width: 1044px;
  height: 586px;
  border: 5px solid ${themedPalette.border_1};
  background-color: ${themedPalette.box_bg};
  border-radius: 18px;
  position: relative;
`;

const BGLeft = styled.div`
  position: absolute;
  top: 0;
  left: -220px;
`;

const BGRight = styled.div`
  position: absolute;
  top: 0;
  right: -280px;
`;

const MyHatBox = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 18px;
  border: 5px solid ${themedPalette.border_1};
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubjectBox = styled.div`
  width: 100%;
  height: 72px;
  background-color: ${themedPalette.box_subject};
  color: ${themedPalette.main_text2};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  position: relative;
  border-radius: 13px 13px 0 0;
  border-bottom: 5px solid ${themedPalette.border_1};
`;

const RandomButton = styled.button`
  width: 70px;
  height: 45px;
  position: absolute;
  right: 70px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;

const DownBox = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
`;

const UserListBox = styled.div`
  width: 212px;
  height: 508px;
  border-right: 5px solid ${themedPalette.black};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
`;

const CardListBox = styled.div`
  width: 832px;
  height: 512px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 24px;
  padding: 32px 48px;
`;

const UserListColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserNickname = styled.div`
  color: ${themedPalette.main_text1};
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
`;

const HatBox = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  color: ${themedPalette.main_text1};
  ${props => props.isMouseOver && `background-color : #2B2C31`};
`;

const TouchArea = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const DescText = styled.span`
  text-align: center;
`;

export { SelectHatBox };

// NOTE : 이 페이지에서 처리해야 할 내용 1.모자선택시 로직 2.랜덤 로직
