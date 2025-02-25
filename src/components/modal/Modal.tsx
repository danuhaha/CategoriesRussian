import React, { type MouseEventHandler, type RefObject, useCallback, useMemo } from 'react';

import ControlButton from 'components/button/control-button';

interface ModalProps {
  readonly dialogRef: RefObject<HTMLDialogElement>;
  readonly closeModal: () => void;
  readonly content: React.ReactNode; // Dynamic content passed to modal
}

export const Modal = ({ dialogRef, closeModal, content }: ModalProps) => {
  const handleModalClickOutside: MouseEventHandler<HTMLDialogElement> = useCallback(
    ({ currentTarget, target }) => {
      const isClickedOnBackdrop = target === currentTarget;

      if (isClickedOnBackdrop) {
        closeModal();
      }
    },
    [closeModal],
  );

  const dialogContent = useMemo(() => {
    if (!content) return null;

    return (
      <>
        {content}

        <ControlButton
          text='Закрыть'
          onClick={closeModal}
        />
      </>
    );
  }, [closeModal, content]);

  return (
    <dialog
      ref={dialogRef}
      onClick={handleModalClickOutside}
      style={{ backgroundColor: '#faf9f6' }}
      className='backdrop:bg-black backdrop:opacity-75 rounded-md p-8 flex flex-col items-center justify-center px-12 modal'
    >
      {dialogContent}
    </dialog>
  );
};
