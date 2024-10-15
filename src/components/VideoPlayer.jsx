"use client";

const VideoPlayer = ({ videoRef, userId }) => {
  return (
    <div>
      <h3>{userId}</h3>
      <video ref={videoRef} autoPlay playsInline></video>
    </div>
  );
};

export default VideoPlayer;
