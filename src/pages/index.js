import { useSession, signIn, signOut } from "next-auth/client";
import Card from '@mui/material/Card';

const Index = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <div className="text-xl text-zenGreen">Please sign in</div>;
  }

  if (!session) {
    return <div className="text-xl text-zenGreen">Please sign in</div>;
  }

  return (
    <>
      <div className="text-xl text-zenGreen-dark font-bold">
        Hello {session.user.email}, welcome to your Customer Portal!
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card title="My bills">
          {/* <BillingWidget /> */}
        </Card>
        <Card title="Broadband">
          {/* <BroadbandWidget /> */}
        </Card>
        <Card title="Home phone">
          {/* <HomePhoneWidget /> */}
        </Card>
        <Card title="Service info">
          {/* <ServiceInfoWidget /> */}
        </Card>
        <Card title="Your contract">
          {/* <ContractWidget /> */}
        </Card>
        <Card title="Refer a friend">
          {/* <ReferralWidget /> */}
        </Card>
      </div>
    </>
  );
};

export default Index;
