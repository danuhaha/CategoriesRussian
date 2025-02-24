'use client';
import {useEffect, useMemo, useRef, useState} from 'react';
//import {categories} from '../_examples';
import {Category, SubmitResult, Word} from '../_types';
import {delay, shuffleArray} from '../_utils';

export const GAME_STATE_STORAGE_ID = 'gameState';
const LAST_DATE_STORAGE_ID = 'lastWordDate';

export default function useGameLogic() {
    const [gameWords, setGameWords] = useState<Word[]>([]);
    const selectedWords = useMemo(() => gameWords.filter((item) => item.selected), [gameWords]);
    const [clearedCategories, setClearedCategories] = useState<Category[]>([]);
    const [categoriesParsed, setCategoriesParsed] = useState<Category[]>([]);

    const [isWon, setIsWon] = useState(false);

    const [isLost, setIsLost] = useState(false);

    const [mistakesRemaining, setMistakesRemaining] = useState(4);

    const guessHistoryRef = useRef<Word[][]>([]);

    useEffect(() => {
        const savedState = localStorage?.getItem(GAME_STATE_STORAGE_ID);

        if (savedState) {
            const {isWon, isLost, mistakesRemaining, clearedCategories, guessHistory} = JSON.parse(savedState);
            setIsWon(isWon);
            setIsLost(isLost);
            setMistakesRemaining(mistakesRemaining);
            setClearedCategories(clearedCategories);
            if (guessHistory) {
                guessHistoryRef.current = guessHistory;
            }
        }
    }, []);

    /*useEffect(() => {
        const words: Word[] = categories
            .map((category) =>
                category.items.map((word) => ({word: word, level: category.level}))
            )
            .flat();
        setGameWords(shuffleArray(words));
    }, []);*/

    useEffect(() => {
        const fetchWords = async () => {
            const apiUrl = process.env.NODE_ENV === 'production'
                ? '/categories/api/fetch-words'  // Production URL
                : '/api/fetch-words';            // Local development URL

            const response = await fetch(apiUrl);

            //const response = await fetch('/api/fetch-words');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const { date, categories } = await response.json();
            console.log('Fetched categories: ', categories);
            setCategoriesParsed(categories);

            // Check if the stored date is different from today's date.
            const storedDate = localStorage.getItem(LAST_DATE_STORAGE_ID);
            if (storedDate !== date) {
                // Clear local storage game state if the date has changed.
                localStorage.removeItem(GAME_STATE_STORAGE_ID);
                localStorage.setItem(LAST_DATE_STORAGE_ID, date);
            }

            const processedWords: Word[] = categories
                .map((category: Category) =>
                    category.items.map((word: string)=> ({word: word, level: category.level}))
                )
                .flat();
            setGameWords(shuffleArray(processedWords));
        };

        fetchWords();
    }, []);

    const selectWord = (word: Word): void => {
        const newGameWords = gameWords.map((item) => {
            // Only allow word to be selected if there are less than 4 selected words
            if (word.word === item.word) {
                return {
                    ...item,
                    selected: selectedWords.length < 4 ? !item.selected : false,
                };
            } else {
                return item;
            }
        });

        setGameWords(newGameWords);
    };

    const shuffleWords = () => {
        setGameWords([...shuffleArray(gameWords)]);
    };

    const deselectAllWords = () => {
        setGameWords(
            gameWords.map((item) => {
                return {...item, selected: false};
            })
        );
    };

    const getSubmitResult = (): SubmitResult => {
        const sameGuess = guessHistoryRef.current.some((guess) => guess.every((g) => selectedWords.map((i) => i.word).includes(g.word)));

        if (sameGuess) {
            console.log("Same!");
            return {result: "same"};
        }

        guessHistoryRef.current.push(selectedWords);

        const likenessCounts = categoriesParsed.map((category: Category) => {
            return selectedWords.filter((item) => category.items.includes(item.word))
                .length;
        });

        const maxLikeness = Math.max(...likenessCounts);
        const maxIndex = likenessCounts.indexOf(maxLikeness);

        if (maxLikeness === 4) {
            return getCorrectResult(categoriesParsed[maxIndex]);
        } else {
            return getIncorrectResult(maxLikeness);
        }
    };

    const getCorrectResult = (category: Category): SubmitResult => {
        setClearedCategories([...clearedCategories, category]);
        setGameWords(
            gameWords.filter((item) => !category.items.includes(item.word))
        );

        if (clearedCategories.length === 3) {
            return {result: "win"};
        } else {
            return {result: "correct"};
        }
    };

    const getIncorrectResult = (maxLikeness: number): SubmitResult => {
        setMistakesRemaining(mistakesRemaining - 1);

        if (mistakesRemaining === 1) {
            return {result: "loss"};
        } else if (maxLikeness === 3) {
            return {result: "one-away"};
        } else {
            return {result: "incorrect"};
        }
    };

    const handleLoss = async () => {
        const remainingCategories = categoriesParsed.filter(
            (category) => !clearedCategories.some((clearedCategory) => clearedCategory.category === category.category)
        );

        deselectAllWords();

        for (const category of remainingCategories) {
            await delay(1000);
            setClearedCategories((prevClearedCategories) => [
                ...prevClearedCategories,
                category,
            ]);
            setGameWords((prevGameWords) =>
                prevGameWords.filter((item) => !category.items.includes(item.word))
            );
        }

        await delay(1000);
        setIsLost(true);
    };

    const handleWin = async () => {
        await delay(1000);
        setIsWon(true);
    };

    return {
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
        handleLoss,
        handleWin,
        setIsWon,
        setIsLost,
        setMistakesRemaining,
        setClearedCategories,
    };
}
