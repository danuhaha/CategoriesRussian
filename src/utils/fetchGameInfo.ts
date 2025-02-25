'use client';

import { API_FETCH_WORDS_ROUTE } from 'config';
import type { GameInfo } from 'types';
import logger from 'loglevel';

// Runtime validation to ensure response matches GameInfo structure
const isGameInfo = (data: any): data is GameInfo => {
  return (
    typeof data.date === 'string' &&
    Array.isArray(data.categories) &&
    data.categories.every(
      (category: any) =>
        typeof category === 'object' &&
        typeof category.level === 'number' &&
        Array.isArray(category.words) &&
        category.words.every((word: any) => typeof word === 'string'),
    )
  );
};

export const fetchGameInfo = async () => {
  const response = await fetch(API_FETCH_WORDS_ROUTE);
  logger.debug('Fetch response: ', response);

  if (!response.ok) {
    logger.error(`HTTP error! status: ${response.status}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { date, categories } = (await response.json()) as GameInfo;

  if (!isGameInfo({ date, categories })) {
    logger.error('Response does not match the expected GameInfo structure.');
    throw new Error('Response does not match the expected GameInfo structure.');
  }

  return { date, categories } as GameInfo;
};
