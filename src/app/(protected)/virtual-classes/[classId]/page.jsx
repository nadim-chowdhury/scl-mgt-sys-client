"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";
import VideoPlayer from "@/components/VideoPlayer"; // Ensure this path is correct
import { useParams } from "next/navigation";

const Classroom = () => {
  const [peerConnections, setPeerConnections] = useState({});
  const [remoteStreams, setRemoteStreams] = useState({}); // To store remote streams for students
  const [isMicEnabled, setIsMicEnabled] = useState(true); // Track mic state
  const [isCameraEnabled, setIsCameraEnabled] = useState(true); // Track camera state
  const [localStream, setLocalStream] = useState(null);

  const socketRef = useRef(null);
  const localVideoRef = useRef(null);
  const { classId } = useParams();

  useEffect(() => {
    // Initialize WebSocket connection only on client-side
    socketRef.current = io(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    // Get user media (camera & microphone)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Emit 'join-room' to join the class
        socketRef.current.emit("join-room", classId);
      })
      .catch((err) => console.error("Error accessing media devices:", err));

    // Handle new student joining
    socketRef.current.on("user-joined", (userId) => {
      console.log("New student joined:", userId);
      initiatePeerConnection(userId);
    });

    // Handle offers, answers, and ICE candidates
    socketRef.current.on("offer", handleOffer);
    socketRef.current.on("answer", handleAnswer);
    socketRef.current.on("candidate", handleCandidate);

    return () => {
      socketRef.current.disconnect();
    };
  }, [classId]);

  const initiatePeerConnection = useCallback(
    (studentId) => {
      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      // Add local stream tracks to the peer connection
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, localStream);
        });
      }

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
      peerConnection
        .createOffer()
        .then((offer) => peerConnection.setLocalDescription(offer))
        .then(() => {
          socketRef.current.emit("offer", { offer, to: studentId });
        });

      setPeerConnections((prev) => ({
        ...prev,
        [studentId]: peerConnection,
      }));
    },
    [localStream]
  );

  const handleOffer = useCallback(
    (data) => {
      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      peerConnection
        .setRemoteDescription(new RTCSessionDescription(data.offer))
        .then(() => {
          if (localStream) {
            localStream.getTracks().forEach((track) => {
              peerConnection.addTrack(track, localStream);
            });
          }
        })
        .then(() => peerConnection.createAnswer())
        .then((answer) => peerConnection.setLocalDescription(answer))
        .then(() => {
          socketRef.current.emit("answer", { answer, to: data.from });
        });

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
    },
    [localStream]
  );

  const handleAnswer = useCallback(
    (data) => {
      const peerConnection = peerConnections[data.from];
      if (peerConnection) {
        peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
      }
    },
    [peerConnections]
  );

  const handleCandidate = useCallback(
    (data) => {
      const peerConnection = peerConnections[data.from];
      if (peerConnection) {
        peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    },
    [peerConnections]
  );

  // Toggle microphone
  const toggleMic = () => {
    if (localStream) {
      const audioTrack = localStream
        .getTracks()
        .find((track) => track.kind === "audio");
      if (audioTrack) {
        audioTrack.enabled = !isMicEnabled;
        setIsMicEnabled(!isMicEnabled);
      }
    }
  };

  // Toggle camera
  const toggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream
        .getTracks()
        .find((track) => track.kind === "video");
      if (videoTrack) {
        videoTrack.enabled = !isCameraEnabled;
        setIsCameraEnabled(!isCameraEnabled);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-3xl font-bold text-gray-800">Virtual Classroom</h1>

      {/* Local video stream */}
      <div className="w-full md:w-1/2 lg:w-1/3">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted // Avoid audio feedback loop
          className="rounded-lg w-full h-auto"
        ></video>
      </div>

      {/* Toggle buttons */}
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

      {/* Remote students' videos */}
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
