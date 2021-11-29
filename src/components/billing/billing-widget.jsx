import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography
} from "@mui/material";
import { format } from "date-fns";
import { useSession } from "next-auth/client";
import { getLatestBill } from "../../services/billing";

// ----------------------------------------------------------------------

export default function BillingWidget() {
  const [session, loading] = useSession();
  const { data, error } = getLatestBill();

  if (loading) {
    return <CircularProgress />;
  }

  if (!session) {
    return <CircularProgress />;
  }

  if (!data) {
    return <CircularProgress />;
  }

  console.log(data);

  return (
    <Paper elevation={3}>
      <Box s={3} p={1}>
        <Typography variant="h4" component="div">My Bills</Typography>
        <Typography variant="subtitle1" component="div">{data.primaryProductName}</Typography>
        <Typography variant="subtitle1" component="div">Bill date: {format(new Date(data.due), "do MMM yyyy")}</Typography>
        <Typography variant="h4" component="div">£{data.amount.amountIncVat}</Typography>
        <Button variant="contained" size="medium" color="primary" onClick={() => push(`/bills`)}>
          View Billing
        </Button>
      </Box>
    </Paper>
  );
}
