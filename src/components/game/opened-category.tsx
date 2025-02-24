import { getWordColor } from 'utils/utils';
import { type Category } from 'types';

export default function OpenedCategory(props: { category: Category }) {
  const level = props.category.level;
  const bgColor = getWordColor(level);

  const concatItems = props.category.words.join(', ');

  return (
    <div className={`flex flex-col items-center col-span-4 py-4 rounded-md min-h-[5rem] ${bgColor}`}>
      <h1 className='text-black font-bold text-md md:text-lg'>{props.category.categoryTitle}</h1>
      <h2 className='text-black text-sm md:text-md text-center mx-2'>{concatItems}</h2>
    </div>
  );
}
