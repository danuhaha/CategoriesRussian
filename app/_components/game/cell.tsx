"use client";

import { Word } from "@/app/_types";

type CellProps = {
  cellValue: Word;
  onClick: (word: Word) => void;
  animateGuess: boolean;
  animateWrongGuess: boolean;
};

export default function Cell(props: CellProps) {
  const bgColor = props.cellValue.selected ? "bg-stone-500" : "bg-stone-200";
  const textColor = props.cellValue.selected ? "text-stone-100" : "text-black";

  const handleClick = () => {
    props.onClick(props.cellValue);
  };

  const guessAnimation = props.animateGuess ? "transform -translate-y-2" : "";
  const wrongGuessAnimation = props.animateWrongGuess
    ? "animate-horizontal-shake"
    : "";

  // Count characters in the word
  const charCount = props.cellValue.word.length;
  let size = "text-sm";
  let sizeXXS = "text-sm";
  let sizeXS = "text-sm";
  let sizeMD = "text-lg";

  if (charCount > 5 && charCount <= 7) {
    size = "text-xs";
    sizeXXS = "text-sm";
    sizeXS = "text-sm";

  }
  if (charCount > 7 && charCount <= 8) {
    size = "text-xxs";
    sizeXXS = "text-xs";
    sizeXS = "text-sm";
  }
  if (charCount > 8) {
    size = "text-xxxs";
    sizeXXS = "text-xxs";
    sizeXS = "text-xs";
  }

  return (
    <button
      className={`${bgColor} py-6 rounded-md break-all px-1 transition ease-in-out ${guessAnimation} ${wrongGuessAnimation}`}
      onClick={handleClick}
    >
      <h2 className={`${textColor} ${size} xxs:${sizeXXS} xs:${sizeXS} md:${sizeMD} text-center font-bold`}>
        {props.cellValue.word.toUpperCase()}
      </h2>
    </button>
  );
}
