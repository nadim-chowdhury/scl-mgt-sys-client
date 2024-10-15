// "use client";

// const VideoPlayer = ({ videoRef, userId }) => {
//   return (
//     <div>
//       <h3>{userId}</h3>
//       <video ref={videoRef} autoPlay playsInline></video>
//     </div>
//   );
// };

// export default VideoPlayer;

"use client";

import { useEffect, useRef } from "react";

const VideoPlayer = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return (
    <video ref={ref} autoPlay playsInline className="bg-slate-100 rounded-lg" />
  );
};

export default VideoPlayer;
