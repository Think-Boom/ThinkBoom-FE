import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type SelectWordPayload = {
  word: string;
  idx: number;
};

const prefix = 'randomWord';

export const updateCurrentPage = createAction<number>(`${prefix}/UPDATE_CURRENT_PAGE`);
export const selectWord = createAction<SelectWordPayload>(`${prefix}/SELECT_WORD`);

export const getRandomWord = createAsyncThunk(`${prefix}/GET_RANDOM_WORD`, async () => {
  const response = await axios.get('http://ebaa-121-131-137-167.ngrok.io/randomword');
  return response.data;
});

export const postPickedWords = createAsyncThunk(
  `${prefix}/POST_PICKED_WORDS`,
  async (arg, { getState }) => {
    const { randomWord } = getState() as RootState;
    const { pickedWordList } = randomWord;
    const response = await axios.post('http://c906-121-131-137-167.ngrok.io/randomword', {
      wordList: pickedWordList,
    });

    console.log(response);
  },
);
