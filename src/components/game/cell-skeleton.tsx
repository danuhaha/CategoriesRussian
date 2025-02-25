import cx from 'classnames';
import s from './cell.module.scss';

export default function CellSkeleton() {
  return <div className={cx('bg-gray-300', 'rounded-md', 'min-h-[5rem]', 'w-full', 'max-w-full', s.skeleton)}></div>;
}
