import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useAppDispatch } from '@redux/hooks';
import {
  ChatData,
  BWUserData,
  BWUserCount,
  BWUserList,
  InitializeIdeaCardArgType,
  PostIdeaArgType,
  GetIdeaPayLoadType,
} from './types';

type GetNicknameArgType = {
  bwRoomId: string;
  nickname: string;
};

const prefix = 'brainWriting';

export const updateStartCurrentPageBW = createAction<number>(`${prefix}/UPDATE_START_CURRENT_PAGE`);
export const updateCurrentPageBW = createAction<number>(`${prefix}/UPDATE_CURRENT_PAGE`);

export const updateAdminState = createAction<boolean>(`${prefix}/UPDATE_ADMIN_STATE`);
export const getSubjectBW = createAction<string>(`${prefix}/GET_SUBJECT`);
export const getRoomIdBW = createAction<string>(`${prefix}/GET_ROOMID`);
export const getTimerBW = createAction<number | null>(`${prefix}/GET_TIMER`);
export const getMessagesBW = createAction<ChatData>(`${prefix}/GET_MESSAGES`);

export const getUserListBW = createAction<BWUserList>(`${prefix}/GET_USER_LIST`);
export const changeIsSubmitState = createAction<boolean>(`${prefix}/CHANGE_IS_SUBMIT_STATE`);

export const clearChatHistory = createAction(`${prefix}/CLEAR_CHAT_HISTORY`);
export const getUserCount = createAction<BWUserCount>(`${prefix}/GET_TOTAL_USER_COUNT`);

export const getNickname = createAsyncThunk(
  `${prefix}/GET_NICKNAME`,
  async ({ bwRoomId, nickname }: GetNicknameArgType) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brainwriting/user/nickname/${bwRoomId}`,
      {
        nickname: nickname,
      },
    );
    return response.data;
  },
);

export const initializeIdeaCard = createAsyncThunk(
  `${prefix}/INITIALIZE_IDEA_CARD`,
  async ({ roomId }: InitializeIdeaCardArgType) => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/brainwriting/idea/${roomId}`);
  },
);

export const postIdea = createAsyncThunk(
  `${prefix}/POST_IDEA`,
  async ({ userId, idea, bwRoomId }: PostIdeaArgType) => {
    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/brainwriting/idea/${bwRoomId}`, {
      userId,
      idea,
    });
  },
);

export const getIdea = createAsyncThunk(`${prefix}/GET_IDEA`, async (bwRoomId: string | null) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/brainwriting/idea/${bwRoomId}`,
  );
  return response.data as GetIdeaPayLoadType;
});

export const getTimerData = createAsyncThunk(
  `${prefix}/GET_TIMER_DATA`,
  async (bwRoomId: string | null) => {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brainwriting/timer/${bwRoomId}`,
    );

    return response.data;
  },
);
export const getUpdatedTimerData = createAsyncThunk(
  `${prefix}/GET_UPDATED_TIMER_DATA`,
  async (bwRoomId: string | null) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brainwriting/timer/${bwRoomId}`,
    );

    return response.data;
  },
);

export const updateTimerData = createAction<number | null>(`${prefix}/UPDATE_TIMER_DATA`);
export const setIsTimerCalled = createAction<boolean>(`${prefix}/SET_IS_TIMER_CALLED`);
export const setIsTimerOver = createAction<boolean>(`${prefix}/SET_IS_TIMER_OVER`);
export const initializeTimerData = createAction(`${prefix}/INITIALIZE_TIMER_DATA`);
