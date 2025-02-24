import { type Word } from 'types';
import GuessHistory from 'components/guessHistory/guess-history';

interface GameWonModalProps {
  readonly guessHistory: Word[][];
  readonly perfection: string;
}

export default function GameWonModal(props: GameWonModalProps) {
  return (
    <>
      <h1 className='text-black text-4xl font-black my-4 ml-4'>{props.perfection}</h1>
      <hr className='mb-2 md:mb-4 w-full' />
      <h2 className='text-black mb-8'>Победа!</h2>
      <GuessHistory guessHistory={props.guessHistory} />
    </>
  );
}
