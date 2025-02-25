import React from 'react';

interface PopupProps {
  readonly message: string;
}

export const Popup = (props: PopupProps) => {
  if (!props.message) {
    return null;
  }

  return (
    // eslint-disable-next-line max-len
    <div className='absolute left-1/2 transform -translate-x-1/2 top-[58px] px-2 py-1 text-sm bg-black bg-opacity-70 text-white rounded-lg mx-auto text-center max-w-max'>
      {props.message}
    </div>
  );
};
