import React, { useState, useEffect, createContext } from 'react';
import { GetServerSideProps } from 'next';
import { TutorialIcon } from '@components/common/Icon/TutorialIcon';
import { useAppDispatch, useAppSelector } from '../../../src/redux/hooks';
import { NicknameModal, LimitModal } from '../../../src/components/common';
import { RoutingAlertModal } from '../../../src/components/common/Modals/RoutingAlertModal';
import { BWChattingRoom } from '../../../src/components/common/BWChattingRoom';
import styled from 'styled-components';
import useSocketHook from '../../../src/hooks/useSocketHook';
import { HatType, UserList } from '@redux/modules/sixHat/types';
import { selectPermit, setIsMessageArrived } from '@redux/modules/permit';

import { WaitingRoom, InteractivePage, ShareIcon, ChatIcon } from '@components/common';
import { BwCard } from '../../../src/components/common/BwCard';
import { BwComment } from '@components/common/BwCommnet';
import { VotingRoom } from '@components/layout/BrainWriting';
import {
  getNickname,
  updateCurrentPageBW,
  brainWritingSelector,
  changeIsSubmitState,
  clearChatHistory,
  initializeIdeaCard,
  getTimerBW,
  getIdea,
} from '../../../src/redux/modules/brainWriting';

import { countSelector } from '@redux/modules/CountUser';
import copyUrlHelper from '@utils/copyUrlHelper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChattingRoom } from '@components/common';

//TODO : any 수정하기

type SettingPageProps = {
  roomInfo: string[];
};

let ConnectedSocket: any;

const SettingPage = ({ roomInfo }: SettingPageProps) => {
  const dispatch = useAppDispatch();
  const { currentPage, nickname, chatHistory, senderId, BWsubject, BWUserCount } =
    useAppSelector(brainWritingSelector);

  const { isRoutingModalOpen } = useAppSelector(selectPermit);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFull, setIsFull] = useState(0);
  const [roomTitle, roomId] = roomInfo;

  const HandleSocket = useSocketHook('brainwriting');

  useEffect(() => {
    if (BWUserCount.totalUser !== 0) {
      setIsFull(BWUserCount.currentUser / BWUserCount.totalUser);
    }
    return () => {
      setIsFull(0);
    };
  }, [BWUserCount]);

  useEffect(() => {
    if (nickname) {
      ConnectedSocket = new HandleSocket(`${process.env.NEXT_PUBLIC_API_URL}/websocket`);
      ConnectedSocket.connectBW(senderId, roomId);
    }
  }, [nickname]);

  useEffect(() => {
    window.onbeforeunload = function () {
      ConnectedSocket.disConnect();
    };
    return () => {
      window.onbeforeunload = null;
      ConnectedSocket.disConnect();
    };
  }, []);

  const sendMessage = (message: string) => {
    ConnectedSocket.BWsendMessage(nickname, message);
  };

  const handleNextPage = (pageNum: number) => {
    ConnectedSocket.BWsendCurrentPage(pageNum);
  };

  const handleSubmitSubject = (subject?: string) => {
    ConnectedSocket.BWsubmitSubject(subject);
    dispatch(changeIsSubmitState(true));
  };

  const handleStartbrainWriting = () => {
    handleNextPage(1);
    dispatch(getTimerBW(null));
    dispatch(initializeIdeaCard({ roomId }));
  };

  const handleUpdateNickname = async (enteredName: string) => {
    dispatch(getNickname({ bwRoomId: roomId, nickname: enteredName }));
  };

  const handleSendIdea = () => {
    handleNextPage(2);
    dispatch(getIdea(roomId));
    dispatch(clearChatHistory());
  };

  const handleSendComment = () => {
    handleNextPage(3);
  };

  const handleChatOpen = () => {
    setIsChatOpen(!isChatOpen);
    dispatch(setIsMessageArrived(false));
  };

  const pages = [
    {
      component: (
        <WaitingRoom
          onClickSubmit={handleSubmitSubject}
          onClickComplete={handleStartbrainWriting}
        />
      ),
    },
    {
      component: (
        <BwCard width={510} height={515} subject={BWsubject} onClickComplete={handleSendIdea} />
      ),
    },
    {
      component: (
        <BwComment width={510} height={515} subject={BWsubject} onClick={handleSendComment} />
      ),
    },
    {
      component: <VotingRoom />,
    },
  ];

  //닉네임이 없거나, 방이 가득차지 않았다면.
  return (
    <>
      <ToastContainer position="bottom-left" autoClose={3000} theme="dark" />
      <InteractivePage pages={pages} currentPage={currentPage} />
      {!nickname && isFull <= 1 && (
        <NicknameModal title={roomTitle} onClick={handleUpdateNickname} />
      )}
      {isFull > 1 && <LimitModal />}
      {isRoutingModalOpen && <RoutingAlertModal />}
      <ShareIconWrapper onClick={copyUrlHelper}>
        <ShareIcon />
      </ShareIconWrapper>
      {currentPage !== 4 && (
        <ChatWrapper onClick={handleChatOpen}>
          <ChatIcon isChatOpen={isChatOpen} />
        </ChatWrapper>
      )}
      <TutorialIconWrapper>
        <TutorialIcon type="brainWriting" />
      </TutorialIconWrapper>

      {isChatOpen && currentPage !== 4 && (
        <ChattingContainer>
          <ChattingRoom
            myNickname={nickname}
            chatHistory={chatHistory}
            onClick={handleChatOpen}
            sendMessage={sendMessage}
          />
        </ChattingContainer>
      )}
    </>
  );
};

export default SettingPage;

const ChatWrapper = styled.div`
  position: fixed;
  right: 210px;
  bottom: 70px;
  cursor: pointer;
`;

const ShareIconWrapper = styled.div`
  position: fixed;
  right: 140px;
  bottom: 70px;
  cursor: pointer;
`;

const TutorialIconWrapper = styled.div`
  position: fixed;
  right: 70px;
  bottom: 70px;
  cursor: pointer;
`;

const ChattingContainer = styled.div`
  position: fixed;
  right: 70px;
  bottom: 130px;
  z-index: 9999;
`;

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  const { roomInfo } = query;
  return {
    props: {
      roomInfo,
    },
  };
};
