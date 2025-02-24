import { type Word } from 'types';
import { getWordColor } from 'utils/utils';

interface GuessHistoryProps {
  readonly guessHistory: Word[][];
}

export default function GuessHistory(props: GuessHistoryProps) {
  return (
    <div className='grid grid-cols-4 gap-y-1 mb-12'>
      {props.guessHistory.map((guesses) =>
        guesses.map((word, index) => (
          <div
            key={index}
            className={`size-12 rounded-md ${getWordColor(word.level)}`}
          ></div>
        )),
      )}
    </div>
  );
}
