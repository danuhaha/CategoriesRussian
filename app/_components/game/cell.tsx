"use client";

import {Word} from "@/app/_types";

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
    let size = "text-sm xxs:text-sm xs:text-sm md:text-lg";

    if (charCount > 5 && charCount < 8) {
        size = "text-xs xxs:text-sm xs:text-sm md:text-lg";
    }
    if (charCount == 8) {
        size = "text-xxs xxs:text-xs xs:text-sm md:text-lg";
    }
    if (charCount > 8 && charCount < 11) {
        size = "text-xxxs xxs:text-xxs xs:text-xs md:text-lg";
    }
    if (charCount >= 11) {
        size = "text-xxxs xxs:text-xxxs xs:text-xxs md:text-base xl:text-lg";
    }

    return (
        <button
            className={`${bgColor} py-6 rounded-md break-all px-1 transition ease-in-out ${guessAnimation} ${wrongGuessAnimation}`}
            onClick={handleClick}
        >
            <h2 className={`${textColor} ${size} text-center font-bold`}>
                {props.cellValue.word.toUpperCase()}
            </h2>
        </button>
    );
}
