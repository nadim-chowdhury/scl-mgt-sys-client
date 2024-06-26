"use client";

import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import socket from "../lib/socket";
import { GET_ANNOUNCEMENTS } from "@/graphql/query";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_ANNOUNCEMENTS);

  useEffect(() => {
    if (data) {
      setAnnouncements(data.announcements);
    }
  }, [data]);

  useEffect(() => {
    socket.on("newAnnouncement", (announcement) => {
      setAnnouncements((prevAnnouncements) => [
        ...prevAnnouncements,
        announcement,
      ]);
    });

    return () => {
      socket.off("newAnnouncement");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("createAnnouncement", { title, content });
    setTitle("");
    setContent("");
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Announcements</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded h-32"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Announcement
        </button>
      </form>
      <ul className="space-y-4">
        {announcements.map((ann) => (
          <li key={ann.id} className="p-4 border border-gray-300 rounded">
            <strong className="block text-lg">{ann.title}</strong>
            <p>{ann.content}</p>
            <em className="block text-sm text-gray-500">at {ann.createdAt}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
