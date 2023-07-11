import './NeoList.scss';

import { useEffect, useState } from 'react';

import { getDataNeo } from '../../api/api';
import { NeoCard } from '../NeoCard/NeoCard';

export const NeoList = () => {
  const [neoList, setNeoList] = useState([]);

  useEffect(() => {
    const getDataNeoFromServer = async () => {
      try {
        const dataNeo = await getDataNeo();
        setNeoList(dataNeo);
      } catch (error) {
        console.log(error);
      }
    };

    getDataNeoFromServer();
  }, []);

  console.log(neoList);
  return (
    <div className="neoList">
      <h1 className="neoList__title">near orbital objects (NEO)</h1>
      <div className="neoList__Card">
        <NeoCard />
      </div>
    </div>
  );
};
