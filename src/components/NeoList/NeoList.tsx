import './NeoList.scss';

import { NeoCard } from '../NeoCard/NeoCard';

export const NeoList = () => {
  return (
    <div className="neoList">
      <div className="neoList__title">near orbital objects (NEO)</div>
      <div className="neoList__Card">
        <NeoCard />
      </div>
    </div>
  );
};
