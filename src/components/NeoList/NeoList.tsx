import './NeoList.scss';

import { useEffect, useState } from 'react';

import { getDataNeo } from '../../api/api';
import { Neo } from '../../types/allTypes';
import { NeoCard } from '../NeoCard/NeoCard';

const today = new Date();
const todayDay = today.getDate();

export const NeoList = () => {
  const [neoList, setNeoList] = useState<Neo[]>([]);
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

  const getMostHazardousNeo = () => {
    const copyList = [...neoList];
    return copyList.sort((a, b) => b.hazardous - a.hazardous).slice(0, 2);
  };

  const mostHazardousNeo = getMostHazardousNeo();

  return (
    <div className="neoList">
      <h1 className="neoList__title">near orbital objects (NEO)</h1>
      <div className="neoList__card">
        {neoList.map((neo) => (
          <div key={neo.closest}>
            <NeoCard neo={neo} mostHazardousNeo={mostHazardousNeo} />
          </div>
        ))}
      </div>
    </div>
  );
};
