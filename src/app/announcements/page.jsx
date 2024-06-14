import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    announcements {
      id
      title
      content
      createdAt
    }
  }
`;

const CREATE_ANNOUNCEMENT = gql`
  mutation CreateAnnouncement($title: String!, $content: String!) {
    createAnnouncement(title: $title, content: $content) {
      id
      title
      content
      createdAt
    }
  }
`;

export default function Announcements() {
  const { loading, error, data } = useQuery(GET_ANNOUNCEMENTS);
  const [createAnnouncement] = useMutation(CREATE_ANNOUNCEMENT);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAnnouncement({ variables: { title, content } });
    setTitle("");
    setContent("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Announcements</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Create Announcement</button>
      </form>
      <ul>
        {data.announcements.map((ann) => (
          <li key={ann.id}>
            <strong>{ann.title}</strong> - {ann.content}{" "}
            <em>at {ann.createdAt}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import { useQuery, gql } from '@apollo/client';
// import socket from '../lib/socket';

// const GET_ANNOUNCEMENTS = gql`
//   query GetAnnouncements {
//     announcements {
//       id
//       title
//       content
//       createdAt
//     }
//   }
// `;

// export default function Announcements() {
//   const { loading, error, data, refetch } = useQuery(GET_ANNOUNCEMENTS);
//   const [announcements, setAnnouncements] = useState([]);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   useEffect(() => {
//     if (data) {
//       setAnnouncements(data.announcements);
//     }
//   }, [data]);

//   useEffect(() => {
//     socket.on('newAnnouncement', (announcement) => {
//       setAnnouncements((prevAnnouncements) => [...prevAnnouncements, announcement]);
//     });

//     return () => {
//       socket.off('newAnnouncement');
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     socket.emit('createAnnouncement', { title, content });
//     setTitle('');
//     setContent('');
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h1>Announcements</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         ></textarea>
//         <button type="submit">Create Announcement</button>
//       </form>
//       <ul>
//         {announcements.map((ann) => (
//           <li key={ann.id}>
//             <strong>{ann.title}</strong> - {ann.content} <em>at {ann.createdAt}</em>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
