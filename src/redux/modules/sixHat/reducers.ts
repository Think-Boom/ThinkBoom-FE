import { createReducer } from '@reduxjs/toolkit';
import {
  updateCurrentPage,
  updateNickname,
  updateAdminState,
  changeIsSubmitState,
} from './actions';

export type SixHatState = {
  currentPage: number;
  nickname: string | null;
  isAdmin: boolean;
  isSubmit: boolean;
};

const initialState: SixHatState = {
  currentPage: 0,
  nickname: null,
  isAdmin: false,
  isSubmit: false,
};

//createReducer로 reducer 생성.
export const sixHatReducer = createReducer(initialState, builder => {
  builder
    .addCase(updateCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(updateNickname, (state, action) => {
      state.nickname = action.payload;
    })
    .addCase(updateAdminState, (state, action) => {
      state.isAdmin = action.payload;
    })
    .addCase(changeIsSubmitState, (state, action) => {
      state.isSubmit = action.payload;
    });
});
