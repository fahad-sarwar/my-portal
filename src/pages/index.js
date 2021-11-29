import { useSession, signIn, signOut } from "next-auth/client";
import Page from "../components/Page";
import { Box, Container, Grid, Typography } from "@mui/material";
import BillingWidget from "../components/billing/billing-widget";
import BroadbandWidget from "../components/services/broadband-widget";
import HomePhoneWidget from "../components/services/home-phone-widget";
import ServiceInfoWidget from "../components/services/service-info-widget";
import ContractWidget from "../components/billing/contract-widget";
import ReferralWidget from "../components/marketing/referral-widget";

const Index = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <div className="text-xl text-zenGreen">Please sign in</div>;
  }

  if (!session) {
    return <div className="text-xl text-zenGreen">Please sign in</div>;
  }

  console.log(session);

  return (
    <Page title="Home">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">
            Hello {session.user.name}, welcome to your Customer Portal!
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <BillingWidget />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <BroadbandWidget />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <HomePhoneWidget />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ServiceInfoWidget />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ContractWidget />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReferralWidget />
          </Grid>
        </Grid>
      </Container>
    </Page>
    // <>
    //   <div className="text-xl text-zenGreen-dark font-bold">
    //     Hello {session.user.name}, welcome to your Customer Portal!
    //   </div>
    //   <div className="grid grid-cols-3 gap-4">
    //     <Card title="My bills">
    //       {/* <BillingWidget /> */}
    //     </Card>
    //     <Card title="Broadband">
    //       {/* <BroadbandWidget /> */}
    //     </Card>
    //     <Card title="Home phone">
    //       {/* <HomePhoneWidget /> */}
    //     </Card>
    //     <Card title="Service info">
    //       {/* <ServiceInfoWidget /> */}
    //     </Card>
    //     <Card title="Your contract">
    //       {/* <ContractWidget /> */}
    //     </Card>
    //     <Card title="Refer a friend">
    //       {/* <ReferralWidget /> */}
    //     </Card>
    //   </div>
    // </>
  );
};

export default Index;
