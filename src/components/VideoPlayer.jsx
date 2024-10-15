"use client";

import { useEffect, useRef } from "react";

const VideoPlayer = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    if (peer.stream) {
      ref.current.srcObject = peer.stream; // Attach the peer's stream to the video element
    }
  }, [peer.stream]);

  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      className="bg-slate-100 rounded-lg h-40 w-60 object-cover"
    />
  );
};

export default VideoPlayer;
