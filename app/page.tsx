"use client";

import { useCallback, useState } from "react";
import Head from 'next/head';
import ControlButton from "./_components/button/control-button";
import Grid from "./_components/game/grid";
import GameLostModal from "./_components/modal/game-lost-modal";
import GameWonModal from "./_components/modal/game-won-modal";
import Popup from "./_components/popup";
import useAnimation from "./_hooks/use-animation";
import useGameLogic from "./_hooks/use-game-logic";
import usePopup from "./_hooks/use-popup";
import { SubmitResult, Word } from "./_types";
import { getPerfection } from "./_utils";

export default function Home() {
  const [popupState, showPopup] = usePopup();
  const {
    gameWords,
    selectedWords,
    clearedCategories,
    mistakesRemaining,
    isWon,
    isLost,
    guessHistoryRef,
    selectWord,
    shuffleWords,
    deselectAllWords,
    getSubmitResult,
    handleWin,
    handleLoss,
  } = useGameLogic();

  const [showGameWonModal, setShowGameWonModal] = useState(false);
  const [showGameLostModal, setShowGameLostModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    guessAnimationState,
    wrongGuessAnimationState,
    animateGuess,
    animateWrongGuess,
  } = useAnimation();

  const handleSubmit = async () => {
    setSubmitted(true);
    await animateGuess(selectedWords);

    const result: SubmitResult = getSubmitResult();

    switch (result.result) {
      case "same":
        showPopup("Уже было!");
        break;
      case "one-away":
        animateWrongGuess();
        showPopup("Один лишний...");
        break;
      case "loss":
        showPopup("Повезет в другой раз!");
        await handleLoss();
        setShowGameLostModal(true);
        break;
      case "win":
        showPopup(getPerfection(mistakesRemaining));
        await handleWin();
        setShowGameWonModal(true);
        break;
      case "incorrect":
        animateWrongGuess();
        break;
    }
    setSubmitted(false);
  };

  const onClickCell = useCallback(
    (word: Word) => {
      selectWord(word);
    },
    [selectWord]
  );

  const renderControlButtons = () => {
    const showResultsWonButton = (
      <ControlButton
        text="Показать результаты"
        onClick={() => {
          setShowGameWonModal(true);
        }}
      />
    );

    const showResultsLostButton = (
      <ControlButton
        text="Показать результаты"
        onClick={() => {
          setShowGameLostModal(true);
        }}
      />
    );

    const inProgressButtons = (
      <div className="flex gap-2 mb-12">
        <ControlButton
          text="Перемешать"
          onClick={shuffleWords}
          unclickable={submitted}
        />
        <ControlButton
          text="Сбросить"
          onClick={deselectAllWords}
          unclickable={selectedWords.length === 0 || submitted}
        />
        <ControlButton
          text="Проверить"
          unclickable={selectedWords.length !== 4 || submitted}
          onClick={handleSubmit}
        />
      </div>
    );

    if (isWon) {
      return showResultsWonButton;
    } else if (isLost) {
      return showResultsLostButton;
    } else {
      return inProgressButtons;
    }
  };

  return (
    <>
      <Head>
        <title>Категории — Игра</title>
        <meta property="og:title" content="Категории" />
        <meta property="og:description" content="Составь 4 группы по 4 слова!" />
        <meta property="og:image" content="/public/og-image.jpg" />
        <meta property="og:url" content="https://iluvurmom.servebeer.com" />
        <meta property="og:type" content="website" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png" />
      </Head>

      <div className="flex flex-col items-center w-11/12 md:w-3/4 lg:w-7/12 mx-auto mt-14 relative">
        <h1 className="text-black text-4xl font-semibold my-4 ml-4">
          Категории
        </h1>
        <hr className="mb-4 md:mb-4 w-full" />
        <Popup show={popupState.show} message={popupState.message} />
        <h1 className="text-black mb-4">Составь 4 группы по 4 слова!</h1>
        <div className="relative w-full">
          <Grid
              words={gameWords}
              selectedWords={selectedWords}
              onClick={onClickCell}
              clearedCategories={clearedCategories}
              guessAnimationState={guessAnimationState}
              wrongGuessAnimationState={wrongGuessAnimationState}
          />
        </div>
        <h2 className="text-black my-4 md:my-8 mx-8">
          Попыток осталось:{" "}
          {mistakesRemaining > 0 ? Array(mistakesRemaining).fill("✦") : ""}
        </h2>
        {renderControlButtons()}
      </div>
      <GameWonModal
        isOpen={showGameWonModal}
        onClose={() => setShowGameWonModal(false)}
        guessHistory={guessHistoryRef.current}
        perfection={getPerfection(mistakesRemaining)}
      />
      <GameLostModal
        isOpen={showGameLostModal}
        onClose={() => setShowGameLostModal(false)}
        guessHistory={guessHistoryRef.current}
      />
    </>
  );
}
