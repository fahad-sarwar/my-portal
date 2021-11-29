import { useSession } from "next-auth/client";
import axios from "axios";
import useSWR from "swr";

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/billing`,
});

export const getLatestBill = () => {
  const [session, loading] = useSession();
  const address = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/billing/invoices/latest`;

  const fetcher = async (url) =>
    await axios
      .get(url, {
        headers: {
          Authorization: `bearer ${session.accessToken}`,
        },
      })
      .then((res) => res.data);

  const { data, error } = useSWR(address, fetcher);

  return { data: data, error: error };
};
