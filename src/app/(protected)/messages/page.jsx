"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "@/graphql/query";
import socket from "@/lib/socket";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { messagesMockData } from "@/utils/demoData";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_MESSAGES);
  console.log("🚀 ~ Messages ~ data:", data);

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

  return (
    <div>
      <Heading title="Messages" />
      <LoadingAndErrorMessage loading={loading} error={error} />

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-indigo-50 p-6 rounded-md border"
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
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
        >
          Send Message
        </button>
      </form>

      <Heading title="Recent Messages" />
      <div className="space-y-4">
        {messagesMockData?.map((msg) => (
          <div
            key={msg?.id}
            className="mb-2 py-2 px-4 bg-amber-50 rounded-md border"
          >
            <strong>{msg?.sender?.username}</strong> to{" "}
            <strong>{msg?.receiver?.username}</strong>: {msg?.content}{" "}
            <em className="text-gray-500 text-sm">at {msg?.timestamp}</em>
          </div>
        ))}
      </div>
    </div>
  );
}
