import './NeoCard.scss';

import { Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

import { Neo } from '../../types/allTypes';

type Props = {
  neo: Neo;
  mostHazardousNeo: Neo[];
};

export const NeoCard: FC<Props> = ({ neo, mostHazardousNeo }) => {
  const { maxDiameter, hazardous, closest, velocity } = neo;

  const cardStyle = {
    backgroundColor: mostHazardousNeo.includes(neo) ? 'red' : '',
    width: '280px',
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <Typography variant="h5">NEO Information</Typography>
        <div className="neoCard__data">
          <Typography variant="body1">Max Diameter: {maxDiameter} km</Typography>
          <Typography variant="body1">Potentially Hazardous NEOs: {hazardous}</Typography>
          <Typography variant="body1">Closest NEO: {closest} km</Typography>
          <Typography variant="body1">Fastest NEO: {velocity} kph</Typography>
        </div>
      </CardContent>
    </Card>
  );
};
