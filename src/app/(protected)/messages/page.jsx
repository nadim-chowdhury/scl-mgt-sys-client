"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "@/graphql/query";
import socket from "@/lib/socket";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_MESSAGES);

  useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      senderId: parseInt(senderId),
      receiverId: parseInt(receiverId),
      content,
    });
    setSenderId("");
    setReceiverId("");
    setContent("");
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Heading title="Messages" />
      <LoadingAndErrorMessage loading={loading} error={error} />

      <form
        onSubmit={handleSubmit}
        className="mb-4 p-4 bg-white shadow rounded-lg"
      >
        <div className="mb-4">
          <input
            type="number"
            placeholder="Sender ID"
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Receiver ID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Message Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send Message
        </button>
      </form>
      <ul className="bg-white shadow rounded-lg p-4">
        {messages.map((msg) => (
          <li key={msg.id} className="mb-2 border-b pb-2">
            <strong>{msg.sender.username}</strong> to{" "}
            <strong>{msg.receiver.username}</strong>: {msg.content}{" "}
            <em className="text-gray-500 text-sm">at {msg.timestamp}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
