'use client';
import { useState } from 'react';

import { delay } from 'utils/utils';
import { ANIMATION_GUESS_DURATION, ANIMATION_GUESS_DELAY, ANIMATION_WAIT_RESULT } from 'config';
import logger from 'loglevel';

export default function useAnimation() {
  const [guessAnimationState, setGuessAnimationState] = useState(false);
  const [wrongGuessAnimationState, setWrongGuessAnimationState] = useState(false);

  const animateGuess = async () => {
    setGuessAnimationState(true);
    await delay(ANIMATION_GUESS_DELAY * 4 + ANIMATION_WAIT_RESULT);
    setGuessAnimationState(false);
    logger.debug('Animation finished');
  };

  const animateWrongGuess = async () => {
    setWrongGuessAnimationState(true);
    await delay(ANIMATION_GUESS_DURATION);
    setWrongGuessAnimationState(false);
  };

  return {
    guessAnimationState,
    wrongGuessAnimationState,
    animateGuess,
    animateWrongGuess,
  };
}
