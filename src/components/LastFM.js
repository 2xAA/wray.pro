import React, { useMemo, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import anime from "animejs";
import { LastFM as LastFMApi } from "../lib/lastfm/lastfm.api";
import { LastFMCache } from "../lib/lastfm/lastfm.api.cache";

const pollTime = 30 * 1000;

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const TrackDisplay = ({ track, artist, nowPlaying }) => (
  <div className="last-fm-display" style={{ width: 0 }}>
    {nowPlaying ? "Now playing: " : ""}
    {track} by {artist}
  </div>
);

TrackDisplay.propTypes = {
  track: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  nowPlaying: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ track, artist, nowPlaying }) => {
  return { track, artist, nowPlaying };
};

const ConnectedTrackDisplay = connect(mapStateToProps)(TrackDisplay);

export default function LastFM() {
  const dispatch = useDispatch();
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useMemo(() => {
    let lastArtist;
    let lastTrack;
    let lastNowPlaying;

    const cache = new LastFMCache();
    /* Create a LastFM object */
    const lastfm = new LastFMApi({
      apiKey: "7e8faf77ea9f5e451591076fae780680",
      apiSecret: "6450f82a1a034de763684b49149f7f5f",
      cache: cache,
    });

    function poll() {
      lastfm.user.getRecentTracks(
        { user: "theonly2xaa" },
        {
          success: (data) => {
            const newArtist = data.recenttracks.track[0].artist["#text"];
            const newTrack = data.recenttracks.track[0].name;
            let nowPlaying = false;
            if (typeof data.recenttracks.track[0]["@attr"] !== "undefined") {
              if (data.recenttracks.track[0]["@attr"].nowplaying === "true")
                nowPlaying = true;
            }

            if (
              lastArtist === newArtist &&
              lastTrack === newTrack &&
              lastNowPlaying === nowPlaying
            ) {
              const id = setTimeout(poll, pollTime);
              setTimerId(id);
              return;
            }

            lastArtist = newArtist;
            lastTrack = newTrack;
            lastNowPlaying = nowPlaying;

            anime({
              targets: ".last-fm-display",
              width: 0,
              easing: "easeInOutQuad",
              complete: async () => {
                await wait(800);

                const lfmDisplay = document.querySelector(".last-fm-display");
                lfmDisplay.style.visibility = "hidden";
                lfmDisplay.style.width = "auto";

                await dispatch({
                  type: "UPDATE_ARTIST",
                  payload: lastArtist,
                });
                await dispatch({ type: "UPDATE_TRACK", payload: lastTrack });
                await dispatch({
                  type: "UPDATE_NOWPLPAYING",
                  payload: nowPlaying,
                });

                const { width } = lfmDisplay.getBoundingClientRect();
                lfmDisplay.style.width = 0;
                lfmDisplay.style.visibility = "visible";

                anime({
                  targets: ".last-fm-display",
                  width,
                  easing: "easeInOutQuad",
                  complete: () => {
                    const id = setTimeout(poll, pollTime);
                    setTimerId(id);
                  },
                });
              },
            });
          },
        }
      );
    }

    poll();
    const id = setTimeout(poll, pollTime);
    setTimerId(id);
  }, []);

  return <ConnectedTrackDisplay />;
}
