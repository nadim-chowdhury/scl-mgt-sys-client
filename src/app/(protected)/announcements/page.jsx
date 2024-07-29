"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ANNOUNCEMENTS } from "../../../graphql/query";
import socket from "@/lib/socket";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import Heading from "@/components/Heading";
import { mockAnnouncementsData } from "@/utils/demoData";
import { CREATE_ANNOUNCEMENT } from "@/graphql/mutation";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_ANNOUNCEMENTS);
  console.log("🚀 ~ Announcements ~ data:", data);
  const [createAnnouncement] = useMutation(CREATE_ANNOUNCEMENT);

  useEffect(() => {
    if (data?.announcements?.length > 0) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createAnnouncement({
        variables: { title, content },
      });
      setAnnouncements((prevAnnouncements) => [
        ...prevAnnouncements,
        data.createAnnouncement,
      ]);
      setTitle("");
      setContent("");
      socket.emit("createAnnouncement", data.createAnnouncement);
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  return (
    <div>
      <Heading title="Announcements" />
      {/* <LoadingAndErrorMessage loading={loading} error={error} /> */}

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-indigo-50 p-6 rounded-md border space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-32"
        />

        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
        >
          Create Announcement
        </button>
      </form>

      <Heading title="Previous Announcements" />
      <div className="grid grid-cols-2 gap-6">
        {mockAnnouncementsData?.map((ann) => (
          <div
            key={ann?.id}
            className="p-6 border rounded-md bg-amber-50 flex flex-col justify-between"
          >
            <div>
              <strong className="block text-lg">{ann?.title}</strong>
              <p>{ann?.content}</p>
            </div>
            <em className="block text-sm text-gray-500">at {ann?.createdAt}</em>
          </div>
        ))}
      </div>
    </div>
  );
}
