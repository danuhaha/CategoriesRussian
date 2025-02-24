'use client';
import { type ReactNode, useCallback, useRef, useState } from 'react';

export const useModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  // Function to open the modal and set content
  const showModal = useCallback((modalContent: ReactNode) => {
    if (dialogRef.current) {
      setContent(modalContent);
      dialogRef.current.showModal();
      setIsOpen(true);
    }
  }, []);

  // Function to close the modal
  const closeModal = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
      setIsOpen(false);
      setContent(null); // Clear content on close
    }
  }, []);

  return [{ dialogRef, content, closeModal }, showModal, isOpen] as const;
};
