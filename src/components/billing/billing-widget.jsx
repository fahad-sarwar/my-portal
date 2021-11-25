import { Card, CardHeader, CardContent } from '@mui/material';

// ----------------------------------------------------------------------

export default function BillingWidget() {
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="My Bills" />
      <CardContent>
      </CardContent>
    </Card>
  );
}