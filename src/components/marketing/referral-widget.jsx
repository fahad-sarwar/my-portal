import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Typography
  } from "@mui/material";
  import { useSession } from "next-auth/client";
  
  // ----------------------------------------------------------------------
  
  export default function ReferralWidget() {
    const [session, loading] = useSession();
  
    if (loading) {
      return <CircularProgress />;
    }
  
    if (!session) {
      return <CircularProgress />;
    }
  
    return (
      <Paper elevation={3}>
        <Box s={3} p={1}>
          <Typography variant="h4" component="div">Refer a friend</Typography>
          <Button variant="contained" size="medium" color="primary" onClick={() => push(`/bills`)}>
            Find out more
          </Button>
        </Box>
      </Paper>
    );
  }
  