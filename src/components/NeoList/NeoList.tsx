import './NeoList.scss';

import { useEffect, useState } from 'react';

import { getDataNeo } from '../../api/api';
import { NeoCard } from '../NeoCard/NeoCard';

const today = new Date();
const todayDay = today.getDate();

export const NeoList = () => {
  const [neoList, setNeoList] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);

  const getDataNeoFromServer = async () => {
    try {
      const dataNeo = await getDataNeo(currentDay);

      if (currentDay === 1) {
        setNeoList([dataNeo]);
      }

      if (currentDay > 1 && neoList.length < 6) {
        setNeoList((prev) => [...prev, dataNeo]);
      }

      if (neoList.length === 6) {
        setNeoList((prev) => {
          const withoutFirstEl = prev.slice(1);
          return [...withoutFirstEl, dataNeo];
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentDay > todayDay) {
      setCurrentDay(1);
    }
    const interval = setInterval(async () => {
      await getDataNeoFromServer();
      setCurrentDay((prev) => prev + 1);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentDay]);

  console.log({ neoList });
  return (
    <div className="neoList">
      <h1 className="neoList__title">near orbital objects (NEO)</h1>
      <div className="neoList__Card">
        <NeoCard />
      </div>
    </div>
  );
};
