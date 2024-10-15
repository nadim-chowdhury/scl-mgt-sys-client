"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import VideoPlayer from "@/components/VideoPlayer"; // Ensure this path is correct
import { useParams } from "next/navigation";

const Classroom = () => {
  const [peerConnections, setPeerConnections] = useState({});
  const [remoteStreams, setRemoteStreams] = useState({}); // To store remote streams for students
  const [isMicEnabled, setIsMicEnabled] = useState(true); // Track mic state
  const [isCameraEnabled, setIsCameraEnabled] = useState(true); // Track camera state
  const [localStream, setLocalStream] = useState(null);

  const socketRef = useRef();
  const localVideoRef = useRef();
  const { classId } = useParams();
  console.log(classId);

  useEffect(() => {
    // Initialize WebSocket connection only on client-side
    socketRef.current = io(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL);

    // Get user media (camera & microphone)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        localVideoRef.current.srcObject = stream;

        // Emit 'join-room' to join the class
        socketRef.current.emit("join-room", classId); // Replace with unique class ID
      })
      .catch((err) => console.error("Error accessing media devices", err));

    // Handle new student joining
    socketRef.current.on("user-joined", (userId) => {
      console.log("New student joined:", userId);
      initiatePeerConnection(userId);
    });

    socketRef.current.on("offer", handleOffer);
    socketRef.current.on("answer", handleAnswer);
    socketRef.current.on("candidate", handleCandidate);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const initiatePeerConnection = (studentId) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Add local stream tracks to the peer connection
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("candidate", {
          candidate: event.candidate,
          to: studentId,
        });
      }
    };

    // Handle incoming media stream from remote peer
    peerConnection.ontrack = (event) => {
      setRemoteStreams((prev) => ({
        ...prev,
        [studentId]: event.streams[0], // Store the remote stream for the student
      }));
    };

    // Create an offer and send to the student
    peerConnection.createOffer().then((offer) => {
      peerConnection.setLocalDescription(offer);
      socketRef.current.emit("offer", { offer, to: studentId });
    });

    setPeerConnections((prev) => ({
      ...prev,
      [studentId]: peerConnection,
    }));
  };

  const handleOffer = (data) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Set the received offer as remote description
    peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));

    // Add local stream tracks
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    // Create and send an answer
    peerConnection.createAnswer().then((answer) => {
      peerConnection.setLocalDescription(answer);
      socketRef.current.emit("answer", { answer, to: data.from });
    });

    // Handle remote stream from peer
    peerConnection.ontrack = (event) => {
      setRemoteStreams((prev) => ({
        ...prev,
        [data.from]: event.streams[0],
      }));
    };

    setPeerConnections((prev) => ({
      ...prev,
      [data.from]: peerConnection,
    }));
  };

  const handleAnswer = (data) => {
    const peerConnection = peerConnections[data.from];
    if (peerConnection) {
      peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
    }
  };

  const handleCandidate = (data) => {
    const peerConnection = peerConnections[data.from];
    if (peerConnection) {
      peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  };

  // Toggle microphone
  const toggleMic = () => {
    if (localStream) {
      // Ensure localStream is available
      const audioTrack = localStream
        .getTracks()
        .find((track) => track.kind === "audio");
      if (audioTrack) {
        audioTrack.enabled = !isMicEnabled;
        setIsMicEnabled(!isMicEnabled);
      }
    } else {
      console.error("Local stream is not available.");
    }
  };

  // Toggle camera
  const toggleCamera = () => {
    if (localStream) {
      // Ensure localStream is available
      const videoTrack = localStream
        .getTracks()
        .find((track) => track.kind === "video");
      if (videoTrack) {
        videoTrack.enabled = !isCameraEnabled;
        setIsCameraEnabled(!isCameraEnabled);
      }
    } else {
      console.error("Local stream is not available.");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-3xl font-bold text-gray-800">Virtual Classroom</h1>
      {/* Local video stream */}
      <div className="w-full md:w-1/2 lg:w-1/3">
        <video
          id="localVideo"
          ref={localVideoRef}
          autoPlay
          playsInline
          muted // Ensure your own audio is muted to avoid feedback
          className="rounded-lg w-full h-auto"
        ></video>
      </div>
      {/* Buttons for toggling mic and camera */}
      <div className="space-x-4">
        {localStream ? (
          <>
            <button
              onClick={toggleMic}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              {isMicEnabled ? "Disable Mic" : "Enable Mic"}
            </button>
            <button
              onClick={toggleCamera}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              {isCameraEnabled ? "Disable Camera" : "Enable Camera"}
            </button>
          </>
        ) : (
          <div>Loading media stream...</div>
        )}
      </div>

      {/* Render remote students dynamically */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Object.keys(remoteStreams).map((studentId) => (
          <VideoPlayer
            key={studentId}
            videoRef={(ref) => {
              if (ref) ref.srcObject = remoteStreams[studentId];
            }}
            userId={studentId}
          />
        ))}
      </div>
    </div>
  );
};

export default Classroom;
