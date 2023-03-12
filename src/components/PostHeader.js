import React from "react";
import YouTube from "react-youtube";
import Scroller from "../components/Scroller";

const youtubePlayerOptions = {
  height: 360,
  width: 640,
  origin: typeof window !== "undefined" ? window.location.origin : null,
  playerVars: {
    autoplay: 1,
    color: "white",
    disablekb: 1,
    mute: 1,
    rel: 0,
    showinfo: 0,
    playsinline: 1,
    loop: 1,
  },
};

export const PostHeader = ({ media = [{}], title, halfHeight }) => (
  <r-cell span="8">
    {media.slice(0, 1).map(({ image, youtube_id, is_playlist }, index) => {
      let playerOptions = { ...youtubePlayerOptions };

      if (youtube_id) {
        if (is_playlist) {
          playerOptions.playerVars.list = youtube_id;
          playerOptions.playerVars.listType = "playlist";
        }

        return (
          <div className="video-container" key={`media-${index}`}>
            <YouTube
              videoId={is_playlist ? "" : youtube_id}
              opts={playerOptions}
            />
          </div>
        );
      } else if (image?.url) {
        return <img key={`media-${index}`} src={image.url} alt={image.alt} />;
      } else {
        return (
          <Scroller
            message={title.text}
            halfHeight={halfHeight}
            backgroundColor={() =>
              getComputedStyle(document.documentElement).getPropertyValue(
                "--background-color"
              )
            }
            textColor={() =>
              `rgba(${getComputedStyle(
                document.documentElement
              ).getPropertyValue("--foreground-color-rgb")}, 0.3)`
            }
          />
        );
      }
    })}
  </r-cell>
);
