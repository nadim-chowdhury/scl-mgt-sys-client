// "use client";

// import { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import VideoPlayer from "@/components/VideoPlayer"; // Ensure VideoPlayer is implemented
// import { useParams } from "next/navigation";

// const Classroom = () => {
//   const [peerConnections, setPeerConnections] = useState({});
//   const [remoteStreams, setRemoteStreams] = useState({});
//   const [isMicEnabled, setIsMicEnabled] = useState(true);
//   const [isCameraEnabled, setIsCameraEnabled] = useState(true);
//   const [localStream, setLocalStream] = useState(null);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);

//   const socketRef = useRef(null);
//   const localVideoRef = useRef(null);
//   const { classId } = useParams();

//   // Helper to initialize the WebRTC PeerConnection
//   const initiatePeerConnection = (userId) => {
//     console.log("initiatePeerConnection", userId);

//     const configuration = {
//       iceServers: [
//         { urls: "stun:stun.l.google.com:19302" },
//         { urls: "stun:stun.l.google.com:5349" },
//         { urls: "stun:stun1.l.google.com:3478" },
//         { urls: "stun:stun1.l.google.com:5349" },
//         { urls: "stun:stun2.l.google.com:19302" },
//         { urls: "stun:stun2.l.google.com:5349" },
//         { urls: "stun:stun3.l.google.com:3478" },
//         { urls: "stun:stun3.l.google.com:5349" },
//         { urls: "stun:stun4.l.google.com:19302" },
//         { urls: "stun:stun4.l.google.com:5349" },
//       ],
//     };

//     const peerConnection = new RTCPeerConnection(configuration);

//     // Add local tracks (video and audio) to peer connection
//     localStream
//       .getTracks()
//       .forEach((track) => peerConnection.addTrack(track, localStream));

//     // Handle ICE candidates
//     peerConnection.onicecandidate = (event) => {
//       console.log("onicecandidate", event);

//       if (event.candidate) {
//         socketRef.current.emit("candidate", {
//           to: userId,
//           candidate: event.candidate,
//         });
//       }
//     };

//     // Handle remote stream
//     peerConnection.ontrack = (event) => {
//       console.log("ontrack", event);

//       setRemoteStreams((prevStreams) => ({
//         ...prevStreams,
//         [userId]: event.streams[0],
//       }));
//     };

//     setPeerConnections((prevConnections) => ({
//       ...prevConnections,
//       [userId]: peerConnection,
//     }));

//     return peerConnection;
//   };

//   // Handle offer from another user
//   const handleOffer = async ({ from, offer }) => {
//     const peerConnection = initiatePeerConnection(from);
//     await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
//     const answer = await peerConnection.createAnswer();
//     await peerConnection.setLocalDescription(answer);
//     socketRef.current.emit("answer", {
//       to: from,
//       answer: peerConnection.localDescription,
//     });
//   };

//   // Handle answer from another user
//   const handleAnswer = async ({ from, answer }) => {
//     const peerConnection = peerConnections[from];
//     if (peerConnection) {
//       await peerConnection.setRemoteDescription(
//         new RTCSessionDescription(answer)
//       );
//     }
//   };

//   // Handle ICE candidate from another user
//   const handleCandidate = async ({ from, candidate }) => {
//     const peerConnection = peerConnections[from];
//     if (peerConnection) {
//       await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//     }
//   };

//   // Handle user leaving the room
//   const handleUserLeft = (userId) => {
//     const peerConnection = peerConnections[userId];
//     if (peerConnection) {
//       peerConnection.close();
//     }

//     setPeerConnections((prevConnections) => {
//       const updatedConnections = { ...prevConnections };
//       delete updatedConnections[userId];
//       return updatedConnections;
//     });

//     setRemoteStreams((prevStreams) => {
//       const updatedStreams = { ...prevStreams };
//       delete updatedStreams[userId];
//       return updatedStreams;
//     });
//   };

//   useEffect(() => {
//     // Initialize WebSocket connection
//     socketRef.current = io(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL, {
//       transports: ["websocket", "polling"],
//       withCredentials: true,
//     });

//     // Get user media (camera & microphone)
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setLocalStream(stream);
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }

//         socketRef.current.emit("join-room", classId);
//       })
//       .catch((err) => console.error("Error accessing media devices:", err));

//     socketRef.current.on("user-joined", ({ userId }) => {
//       console.log("user-joined", userId);
//       const peerConnection = initiatePeerConnection(userId);

//       // Create and send offer to the new user
//       peerConnection.createOffer().then((offer) => {
//         console.log("createOffer", offer);
//         peerConnection.setLocalDescription(offer);
//         socketRef.current.emit("offer", {
//           to: userId,
//           offer,
//         });
//       });
//     });

//     socketRef.current.on("offer", handleOffer);
//     socketRef.current.on("answer", handleAnswer);
//     socketRef.current.on("candidate", handleCandidate);
//     socketRef.current.on("user-left", handleUserLeft);

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [classId]);

//   const toggleMic = () => {
//     if (localStream) {
//       const audioTrack = localStream
//         .getTracks()
//         .find((track) => track.kind === "audio");
//       if (audioTrack) {
//         audioTrack.enabled = !audioTrack.enabled;
//         setIsMicEnabled(audioTrack.enabled);
//       }
//     }
//   };

//   const toggleCamera = () => {
//     if (localStream) {
//       const videoTrack = localStream
//         .getTracks()
//         .find((track) => track.kind === "video");
//       if (videoTrack) {
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsCameraEnabled(videoTrack.enabled);
//       }
//     }
//   };

//   const toggleScreenShare = async () => {
//     if (!isScreenSharing) {
//       try {
//         const screenStream = await navigator.mediaDevices.getDisplayMedia({
//           video: true,
//         });
//         const screenTrack = screenStream.getVideoTracks()[0];

//         // Replace the video track of each peer connection with the screen share track
//         Object.values(peerConnections).forEach((peerConnection) => {
//           const sender = peerConnection
//             .getSenders()
//             .find((s) => s.track.kind === "video");
//           if (sender) {
//             sender.replaceTrack(screenTrack);
//           }
//         });

//         setIsScreenSharing(true);

//         // When the screen share stops, revert to the camera video
//         screenTrack.onended = () => {
//           stopScreenShare();
//         };
//       } catch (err) {
//         console.error("Error starting screen share", err);
//       }
//     } else {
//       stopScreenShare();
//     }
//   };

//   const stopScreenShare = () => {
//     if (localStream) {
//       // Revert back to the camera video
//       navigator.mediaDevices
//         .getUserMedia({ video: true, audio: true })
//         .then((stream) => {
//           setLocalStream(stream);
//           if (localVideoRef.current) {
//             localVideoRef.current.srcObject = stream;
//           }

//           // Replace the screen share track with the original video track
//           Object.values(peerConnections).forEach((peerConnection) => {
//             const sender = peerConnection
//               .getSenders()
//               .find((s) => s.track.kind === "video");
//             if (sender) {
//               sender.replaceTrack(stream.getVideoTracks()[0]);
//             }
//           });

//           setIsScreenSharing(false);
//         });
//     }
//   };

//   return (
//     <div className="flex flex-col space-y-4">
//       <h1 className="text-3xl font-bold">Virtual Classroom</h1>

//       {/* Local video stream */}
//       <div className="w-full md:w-1/2 lg:w-1/3">
//         <video
//           ref={localVideoRef}
//           autoPlay
//           playsInline
//           muted
//           className="rounded-lg w-full bg-slate-100"
//         ></video>
//       </div>

//       {/* Controls */}
//       <div className="space-x-4">
//         <button onClick={toggleMic} className="px-4 py-2 bg-blue-500">
//           {isMicEnabled ? "Disable Mic" : "Enable Mic"}
//         </button>
//         <button onClick={toggleCamera} className="px-4 py-2 bg-blue-500">
//           {isCameraEnabled ? "Disable Camera" : "Enable Camera"}
//         </button>
//         <button onClick={toggleScreenShare} className="px-4 py-2 bg-blue-500">
//           {isScreenSharing ? "Stop Sharing" : "Share Screen"}
//         </button>
//       </div>

//       {/* Remote streams */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//         {Object.keys(remoteStreams).map((studentId) => (
//           <VideoPlayer
//             key={studentId}
//             videoRef={(ref) => {
//               if (ref) ref.srcObject = remoteStreams[studentId];
//             }}
//             userId={studentId}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Classroom;

// "use client";

// import { useEffect, useState, useRef } from "react";
// import io from "socket.io-client";
// import Peer from "simple-peer";

// const socket = io("http://localhost:8000"); // Connect to NestJS backend

// const Classroom = () => {
//   const [peers, setPeers] = useState([]);
//   const userVideo = useRef();
//   const peersRef = useRef([]);

//   useEffect(() => {
//     socket.emit("join-room", { roomId: "room-1", userId: "user-1" });

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         userVideo.current.srcObject = stream;
//         socket.on("all-users", (users) => {
//           const peers = [];
//           users.forEach((user) => {
//             const peer = createPeer(user.id, socket.id, stream);
//             peersRef.current.push({ peerID: user.id, peer });
//             peers.push(peer);
//           });
//           setPeers(peers);
//         });

//         socket.on("user-joined", (payload) => {
//           const peer = addPeer(payload.signal, payload.callerID, stream);
//           peersRef.current.push({ peerID: payload.callerID, peer });
//           setPeers((users) => [...users, peer]);
//         });
//       });
//   }, []);

//   function createPeer(userToSignal, callerID, stream) {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream,
//     });
//     peer.on("signal", (signal) => {
//       socket.emit("sending-signal", { userToSignal, callerID, signal });
//     });
//     return peer;
//   }

//   const sendMessage = (message) => {
//     socket.emit("send-message", { roomId: "room-1", content: message });
//   };

//   socket.on("receive-message", (message) => {
//     // Display message in the chat window
//   });

//   const startScreenShare = async () => {
//     const screenStream = await navigator.mediaDevices.getDisplayMedia({
//       video: true,
//     });
//     // Send this screen stream to peers
//   };

//   return (
//     <div>
//       <video ref={userVideo} autoPlay playsInline />
//       {peers.map((peer, index) => {
//         return <Video key={index} peer={peer} />;
//       })}
//     </div>
//   );
// };

// const Video = ({ peer }) => {
//   const ref = useRef();

//   useEffect(() => {
//     peer.on("stream", (stream) => {
//       ref.current.srcObject = stream;
//     });
//   }, [peer]);

//   return (
//     <video ref={ref} autoPlay playsInline className="bg-slate-100 rounded-lg" />
//   );
// };

// export default Classroom;

"use client";

import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import VideoPlayer from "@/components/VideoPlayer"; // Ensure VideoPlayer is implemented
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL, {
  transports: ["websocket", "polling"], // Ensure fallback to polling if websocket fails
  withCredentials: true, // Ensure credentials are sent
}); // Ensure the correct WebSocket URL

const Classroom = () => {
  const [peers, setPeers] = useState([]);
  console.log("🚀 ~ Classroom ~ peers:", peers);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const [localStream, setLocalStream] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const { classId } = useParams();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  const roomId = classId;
  const userId = userInfo?.id;

  useEffect(() => {
    // Emit event to join a room
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
      return () => {
        socket.disconnect();
        peersRef.current.forEach((peerObj) => peerObj.peer.destroy());
      };
    }
  }, [roomId, userId]);

  // Create a peer connection for a new user
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("sending-signal", { userToSignal, callerID, signal });
    });

    peer.on("track", (track, stream) => {
      // Add track to the remote video player
      const remotePeer = peersRef.current.find(
        (p) => p.peerID === userToSignal
      );
      if (remotePeer) {
        remotePeer.stream = stream; // Save the stream in the peer object for video playback
      }
    });

    return peer;
  }

  // Add a peer for a user who joins after the room is created
  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("returning-signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    peer.on("track", (track, stream) => {
      // Add track to the remote video player
      const remotePeer = peersRef.current.find((p) => p.peerID === callerID);
      if (remotePeer) {
        remotePeer.stream = stream; // Save the stream in the peer object for video playback
      }
    });

    return peer;
  }

  // Send chat message
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send-message", { roomId, content: message });
      setMessages((prev) => [...prev, { content: message, self: true }]);
      setMessage("");
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, { content: msg.content, self: false }]);
    });
  }, []);

  return (
    <div className="flex flex-col space-y-4">
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
        {peers.map((peer, index) => (
          <VideoPlayer key={index} peer={peer} />
        ))}
      </div>

      {/* Chat Functionality */}
      <div className="mt-4">
        <div className="space-y-2">
          {messages.map((msg, index) => (
            <p
              key={index}
              className={`p-2 rounded-lg ${
                msg.self ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {msg.content}
            </p>
          ))}
        </div>
        <div className="mt-2 flex">
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
