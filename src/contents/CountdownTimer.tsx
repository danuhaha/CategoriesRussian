import React, { useEffect, useState } from 'react';
import { getGameSavedDate } from 'utils/localStorage';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const lastGameDate = getGameSavedDate();

    const calculateTimeLeft = () => {
      const nextMidnightInMoscow = new Date(`${lastGameDate}T00:00:00Z`);
      nextMidnightInMoscow.setUTCHours(21, 0, 0, 0); // 21:00 UTC is 00:00 in Moscow (UTC+3)

      const now = new Date();
      const diffInMilliseconds = nextMidnightInMoscow.getTime() - now.getTime();
      // console.log(diffInMilliseconds);

      // if lastGameDate exceeds current date, or last game was more than one day ago
      if (Math.abs(diffInMilliseconds) > 24 * 60 * 60 * 1000) {
        setTimeLeft('');
        return;
      }
      if (diffInMilliseconds < 0) {
        setTimeLeft('00:00:00');
        return;
      }

      const hours = Math.floor((diffInMilliseconds / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffInMilliseconds / (1000 * 60)) % 60);
      const seconds = Math.floor((diffInMilliseconds / 1000) % 60);

      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft) {
    return <div className='text-gray-500 text-xs mb-6'>Следующие категории откроются через: {timeLeft}</div>;
  }
};

export default CountdownTimer;
