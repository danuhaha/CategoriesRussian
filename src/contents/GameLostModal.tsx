import { type Word } from 'types';
import GuessHistory from 'components/guessHistory/guess-history';

interface GameLostModalProps {
  readonly guessHistory: Word[][];
}

export default function GameLostModal(props: GameLostModalProps) {
  return (
    <>
      <h1 className='text-black text-3xl font-black my-4 ml-4'>{'До следующего раза!'}</h1>
      <hr className='mb-2 md:mb-4 w-full'></hr>
      <GuessHistory guessHistory={props.guessHistory} />
    </>
  );
}
