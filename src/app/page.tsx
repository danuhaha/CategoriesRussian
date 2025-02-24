'use client';
import React from 'react';

import { GameRulesModal } from 'contents/GameRulesModal';
import { GameUI } from 'game/GameUI';
import { Modal, useModal } from 'components/modal';
import { usePopup, Popup } from 'components/popup';
import ConsentBanner from 'components/ConsentBanner';

export default function Home() {
  const [popupState, showPopup] = usePopup();
  const [dialogProps, showModal] = useModal();

  return (
    <>
      <Modal {...dialogProps} />
      <ConsentBanner />
      <div className='flex flex-col min-h-screen'>
        <div className='flex-1 flex flex-col items-center w-11/12 md:w-3/4 lg:w-7/12 mx-auto mt-14 relative'>
          <div className='flex items-center my-4'>
            <h1 className='text-black text-4xl font-semibold'>Категории</h1>
            <button
              className='relative top-0 right-0 mt-1 ml-2 w-6 h-6 border-2 border-black rounded-full bg-transparent flex justify-center items-center'
              onClick={() => showModal(<GameRulesModal />)}
            >
              <span className='text-lg font-bold text-black'>?</span>
            </button>
          </div>

          <Popup message={popupState} />

          <hr className='mb-4 md:mb-4 w-full' />
          <h1 className='text-black mb-4'>Составь 4 группы по 4 слова!</h1>

          <GameUI
            showModalAction={showModal}
            showPopupAction={showPopup}
          />
        </div>
        <div className='flex items-center justify-center my-2 mb-4'>
          <div className='text-stone-400 text-xxs text-center'>
            <a
              href='https://games.onthewifi.com/terms'
              target='_blank'
              rel='noopener noreferrer'
            >
              Пользовательское соглашение
            </a>
            <br />
            <a
              href='https://games.onthewifi.com/policy'
              target='_blank'
              rel='noopener noreferrer'
            >
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
