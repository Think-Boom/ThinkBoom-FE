import { createReducer } from '@reduxjs/toolkit';

import {
  updateCurrentPage,
  getNickname,
  updateAdminState,
  changeIsSubmitState,
  getMessages,
  getUserHatInfo,
  getMyHat,
  getUserList,
  getRandomHatList,
  clearChatHistory,
  getSubjectSH,
  getSixHatResult,
  getUserCount,
} from './actions';
import { SixHatState } from './types';
import { PURGE } from 'redux-persist';

const initialState: SixHatState = {
  currentPage: 0,
  nickname: null,
  senderId: null,
  isAdmin: false,
  isSubmit: false,
  chatHistory: [],
  subject: undefined,
  userList: [],
  myHat: 'none',
  userCount: {
    totalUser: 0,
    currentUser: 0,
  },
  isDuplicated: false,
};

//createReducer로 reducer 생성.
export const sixHatReducer = createReducer(initialState, builder => {
  builder
    .addCase(updateCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(getNickname.fulfilled, (state, action) => {
      const { nickname, userId, isDuplicated } = action.payload;
      if (isDuplicated) {
        state.isDuplicated = isDuplicated;
      } else {
        state.nickname = nickname;
        state.senderId = userId;
      }
    })
    .addCase(updateAdminState, (state, action) => {
      state.isAdmin = action.payload;
    })
    .addCase(changeIsSubmitState, (state, action) => {
      state.isSubmit = action.payload;
    })
    .addCase(getMessages, (state, action) => {
      if (state.chatHistory) {
        state.chatHistory = [action.payload, ...state.chatHistory];
      }
    })
    .addCase(getUserHatInfo, (state, action) => {
      const { nickname, hat } = action.payload;
      const nicknameList = state.userList?.map(item => item.nickname);
      const idx = nicknameList.indexOf(nickname);
      state.userList[idx].hat = hat;
    })
    .addCase(getMyHat, (state, action) => {
      state.myHat = action.payload;
    })
    .addCase(getUserList, (state, action) => {
      state.userList = action.payload;
    })
    .addCase(getRandomHatList, (state, action) => {
      const mappedList = new Map();
      action.payload.forEach(item => {
        mappedList.set(item.nickname, item.hat);
      });
      state.myHat = mappedList.get(state.nickname);
      state.userList = action.payload;
    })
    .addCase(clearChatHistory, state => {
      state.chatHistory = [];
    })
    .addCase(getSubjectSH, (state, action) => {
      state.subject = action.payload;
    })
    .addCase(getSixHatResult.fulfilled, (state, action) => {
    })
    .addCase(getUserCount, (state, action) => {
      state.userCount = action.payload;
    })
    .addCase(PURGE, state => {
      return initialState;
    });
});

//객체가 담겨 있는 배열안에서, 특정 값을 가지고 있는지 확인하기.
