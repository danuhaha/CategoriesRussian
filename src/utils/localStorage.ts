import logger from 'loglevel';
import { type Category, type GameInfo, type GameStatus, type Word } from 'types';
import { GAME_STATE_STORAGE_ID, LAST_DATE_STORAGE_ID, LAST_GAME_DATA_HASH } from 'config';
import hash from 'object-hash';

interface GameLocalSavedState {
  readonly status: GameStatus;
  readonly openedCategories: Category[];
  readonly unopenedCategories: Category[];
  readonly mistakesRemaining: number;

  readonly guessHistory: Word[][];
}

const getFetchResponseHash = (response: GameInfo) => {
  return hash(JSON.stringify(response));
};

export const getGameSavedDate = () => {
  return localStorage.getItem(LAST_DATE_STORAGE_ID);
};

export const getOrCleanGameLocalSavedState = (gameInfo: GameInfo) => {
  const savedDate = localStorage.getItem(LAST_DATE_STORAGE_ID);
  const savedHash = localStorage.getItem(LAST_GAME_DATA_HASH);

  const responseHash = getFetchResponseHash(gameInfo);

  // in case when new game has dropped
  if (savedDate !== gameInfo.date || responseHash !== savedHash) {
    logger.debug('New game become available, clearing local storage...');
    localStorage.removeItem(GAME_STATE_STORAGE_ID);
    localStorage.setItem(LAST_DATE_STORAGE_ID, gameInfo.date);
    localStorage.setItem(LAST_GAME_DATA_HASH, responseHash);
    return null;
  }

  const state = localStorage.getItem(GAME_STATE_STORAGE_ID);

  if (state) {
    return JSON.parse(state) as GameLocalSavedState;
  }
};

export const saveGameStateToLocalStorage = (state: GameLocalSavedState) => {
  logger.debug('Saved new game state to local storage: ', state);
  localStorage.setItem(GAME_STATE_STORAGE_ID, JSON.stringify(state));
};
