"use client";

import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import VideoPlayer from "@/components/VideoPlayer"; // Ensure VideoPlayer is implemented
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL, {
  transports: ["websocket", "polling"], // Ensure fallback to polling if WebSocket fails
  withCredentials: true, // Ensure credentials are sent
});

const Classroom = () => {
  const [peers, setPeers] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isScreenSharing, setIsScreenSharing] = useState(false); // Track screen sharing status

  const userVideo = useRef();
  const screenTrackRef = useRef(null); // Store the screen track to stop it later
  const peersRef = useRef([]);

  const { classId } = useParams();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  const roomId = classId;
  const userId = userInfo?.id;

  useEffect(() => {
    if (userId) {
      socket.emit("join-room", { roomId, userId });

      // Access the user's video and audio stream
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setLocalStream(stream);
          userVideo.current.srcObject = stream;

          // Listen for other users in the room
          socket.on("all-users", (users) => {
            const peersArray = [];
            users.forEach((user) => {
              const peer = createPeer(user.id, socket.id, stream);
              peersRef.current.push({ peerID: user.id, peer });
              peersArray.push(peer);
            });
            setPeers(peersArray);
          });

          // When a new user joins the room
          socket.on("user-joined", (payload) => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({ peerID: payload.callerID, peer });
            setPeers((prevPeers) => [...prevPeers, peer]);
          });

          // When a user disconnects
          socket.on("user-left", (userId) => {
            const peerObj = peersRef.current.find((p) => p.peerID === userId);
            if (peerObj) {
              peerObj.peer.destroy();
            }
            const updatedPeers = peersRef.current.filter(
              (p) => p.peerID !== userId
            );
            peersRef.current = updatedPeers;
            setPeers(updatedPeers.map((p) => p.peer));
          });
        })
        .catch((err) => {
          console.error("Error accessing media devices: ", err);
        });

      // Clean up socket listeners on unmount
      // return () => {
      //   socket.disconnect();
      //   peersRef.current.forEach((peerObj) => peerObj.peer.destroy());
      // };
    }
  }, [roomId, userId]);

  // Create a peer connection for a new user
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream, // Attach the local stream (camera/audio) to the peer
    });

    peer.on("signal", (signal) => {
      socket.emit("sending-signal", { userToSignal, callerID, signal });
    });

    peer.on("stream", (remoteStream) => {
      // Add the remote user's stream to the state
      setPeers((prevPeers) => [
        ...prevPeers,
        { peerID: userToSignal, stream: remoteStream },
      ]);
    });

    return peer;
  }

  // Add a peer for a user who joins after the room is created
  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream, // Attach the local stream (camera/audio) to the peer
    });

    peer.on("signal", (signal) => {
      socket.emit("returning-signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    peer.on("stream", (remoteStream) => {
      // Add the remote user's stream to the state
      setPeers((prevPeers) => [
        ...prevPeers,
        { peerID: callerID, stream: remoteStream },
      ]);
    });

    return peer;
  }

  // Toggle screen sharing
  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        const screenTrack = screenStream.getVideoTracks()[0];

        // Replace the video track of each peer connection with the screen share track
        peersRef.current.forEach(({ peer }) => {
          const videoSender = peer
            .getSenders()
            .find((sender) => sender.track.kind === "video");
          if (videoSender) {
            videoSender.replaceTrack(screenTrack); // Replace video track with screen
          }
        });

        screenTrackRef.current = screenTrack;
        setIsScreenSharing(true);

        // When the screen share stops, revert to the camera video
        screenTrack.onended = stopScreenShare; // Revert automatically when screen sharing stops
      } catch (err) {
        console.error("Error starting screen share: ", err);
      }
    } else {
      stopScreenShare(); // Manually stop screen sharing
    }
  };

  // Stop screen sharing and revert to camera
  const stopScreenShare = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      peersRef.current.forEach(({ peer }) => {
        const videoSender = peer
          .getSenders()
          .find((sender) => sender.track.kind === "video");
        if (videoSender) {
          videoSender.replaceTrack(videoTrack); // Revert back to camera
        }
      });

      setIsScreenSharing(false);
    }
  };

  // Send chat message
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send-message", { roomId, content: message });
      setMessage(""); // Clear the input field after sending the message
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    const handleReceiveMessage = (msg) => {
      // Compare the message sender's ID with the current user's ID
      const isSelf = msg.senderId === socket.id; // Check if the sender is the current user
      setMessages((prev) => [...prev, { content: msg.content, self: isSelf }]);
    };

    // Register the listener for receiving messages
    socket.on("receive-message", handleReceiveMessage);

    // Clean up the listener on component unmount
    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, []); // Add socket.id to dependencies to track it properly

  return (
    <div className="flex flex-col space-y-4 h-full relative">
      <h1 className="text-3xl font-bold">Virtual Classroom</h1>

      {/* Local Video */}
      <div className="w-full md:w-1/2 lg:w-1/3">
        <video
          ref={userVideo}
          autoPlay
          muted
          playsInline
          className="rounded-lg w-full bg-slate-100"
        />
      </div>

      {/* Remote Users' Videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {peers?.map((peer, index) => (
          <VideoPlayer key={index} peer={peer} />
        ))}
      </div>

      {/* Controls */}
      {/* <div className="space-x-4 mt-4">
        <button
          onClick={toggleScreenShare}
          className={`px-4 py-2 rounded-lg ${
            isScreenSharing ? "bg-red-500" : "bg-blue-500"
          } text-white`}
        >
          {isScreenSharing ? "Stop Sharing" : "Share Screen"}
        </button>
      </div> */}

      {/* Chat Functionality */}
      <div className="mt-6 border rounded-lg absolute bottom-0 right-0">
        <div className="space-y-2 p-4 max-h-[50vh] overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.self ? "justify-end" : "justify-start"}`}
            >
              <p
                className={`px-4 py-2 rounded-full w-auto ${
                  msg.self ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {msg.content}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-2 flex border-t p-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-grow px-4 py-2 border rounded-lg"
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
