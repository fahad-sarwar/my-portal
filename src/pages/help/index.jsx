import React from "react";
import { useSession } from "next-auth/client";
import Page from "../../components/Page";
import {
  Box,
  Container,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { getPlaylists } from "../../services/youTube";
import YouTube from "react-youtube";

const Help = () => {
  const { data, error } = getPlaylists();

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  if (!data) {
    return <CircularProgress />;
  }

  console.log(data);

  return (
    <Page title="Home">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Help</Typography>
        </Box>
        <Grid container spacing={3}>
          {data.items.map((playlist) => (
            <Grid key={playlist.id} item xs={12} sm={6} md={4}>
              <YouTube
                videoId={playlist.id}
                opts={opts}
                //onReady={this._onReady}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}></Grid>
          <Grid item xs={12} sm={6} md={4}></Grid>
          <Grid item xs={12} sm={6} md={4}></Grid>
          <Grid item xs={12} sm={6} md={4}></Grid>
          <Grid item xs={12} sm={6} md={4}></Grid>
          <Grid item xs={12} sm={6} md={4}></Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Help;
