import YouTube from "react-youtube";

const VideoPlayer = ({ videoId }) => {
  const opts = {
    height: "400",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default VideoPlayer;
