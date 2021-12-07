import axios from "axios";
import useSWR from "swr";

const client = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

export const getPlaylists = () => {
  const address = `https://www.googleapis.com/youtube/v3/playlists?key=${process.env.NEXT_PUBLIC_YOUTUBE_KEY}&channelId=${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID_HOWTO}&part=snippet`;
  
  console.log(address);

  const fetcher = async (url) => await axios.get(url).then((res) => res.data);

  const { data, error } = useSWR(address, fetcher);

  console.log(data)
  return { data: data, error: error };
};
