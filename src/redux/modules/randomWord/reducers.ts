import { createReducer } from '@reduxjs/toolkit';
import {
  updateCurrentPage,
  selectWord,
  getRandomWord,
  postPickedWords,
  getSubjectRW,
  getResultWord,
} from './actions';
import { PURGE } from 'redux-persist';
import { toast } from 'react-toastify';

export type RandomWordState = {
  currentPage: number;
  randomWordList: string[];
  pickedWordList: string[];
  pending: boolean;
  error: boolean;
  subject: string | null;
};

const initialState: RandomWordState = {
  currentPage: 0,
  randomWordList: [],
  pickedWordList: [],
  pending: false,
  error: false,
  subject: null,
};

//createReducer로 reducer 생성.
export const randomWordReducer = createReducer(initialState, builder => {
  builder
    .addCase(updateCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(selectWord, (state, action) => {
      if (state.pickedWordList.length > 5) {
        toast.info('단어는 6개까지 선택할 수 있습니다');
        return;
      }
      const { word, idx } = action.payload;
      state.randomWordList[idx] = '';
      state.pickedWordList.push(word);
    })
    .addCase(getRandomWord.pending, state => {
      state.pending = true;
    })
    .addCase(getRandomWord.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.randomWordList = payload;
    })
    .addCase(getRandomWord.rejected, state => {
      state.pending = false;
      state.error = true;
    })
    .addCase(postPickedWords.fulfilled, state => {
      state.pending = false;
    })
    .addCase(getSubjectRW, (state, action) => {
      state.subject = action.payload;
    })
    .addCase(getResultWord.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.pickedWordList = payload;
    })
    .addCase(PURGE, state => {
      return initialState;
    });
});
