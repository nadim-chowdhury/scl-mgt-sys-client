import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
  // Note: Do not include "/graphql" for Socket.IO connection
  withCredentials: true,
});

export default socket;
