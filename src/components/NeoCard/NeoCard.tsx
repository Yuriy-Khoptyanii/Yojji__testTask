import './NeoCard.scss';

import { Card, CardContent, Typography } from '@mui/material';

export const NeoCard = ({
  maxDiameter = 0,
  hazardousCount = 0,
  closestNeo = 0,
  fastestNeo = 0,
}) => {
  return (
    <Card className="neoCard">
      <CardContent>
        <Typography variant="h5">NEO Information</Typography>
        <div className="neoCard__data">
          <Typography variant="body1">Max Diameter: {maxDiameter} km</Typography>
          <Typography variant="body1">
            Potentially Hazardous NEOs: {hazardousCount}
          </Typography>
          <Typography variant="body1">Closest NEO: {closestNeo} km</Typography>
          <Typography variant="body1">Fastest NEO: {fastestNeo} kph</Typography>
        </div>
      </CardContent>
    </Card>
  );
};
