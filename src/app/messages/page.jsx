import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      content
      timestamp
      sender {
        username
      }
      receiver {
        username
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($senderId: Int!, $receiverId: Int!, $content: String!) {
    sendMessage(
      senderId: $senderId
      receiverId: $receiverId
      content: $content
    ) {
      id
      content
      timestamp
    }
  }
`;

export default function Messages() {
  const { loading, error, data } = useQuery(GET_MESSAGES);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage({
      variables: {
        senderId: parseInt(senderId),
        receiverId: parseInt(receiverId),
        content,
      },
    });
    setSenderId("");
    setReceiverId("");
    setContent("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Messages</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Sender ID"
          value={senderId}
          onChange={(e) => setSenderId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Receiver ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
        />
        <textarea
          placeholder="Message Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      <ul>
        {data.messages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.sender.username}</strong> to{" "}
            <strong>{msg.receiver.username}</strong>: {msg.content}{" "}
            <em>at {msg.timestamp}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import { useQuery, gql } from '@apollo/client';
// import socket from '../lib/socket';

// const GET_MESSAGES = gql`
//   query GetMessages {
//     messages {
//       id
//       content
//       timestamp
//       sender {
//         username
//       }
//       receiver {
//         username
//       }
//     }
//   }
// `;

// export default function Messages() {
//   const { loading, error, data, refetch } = useQuery(GET_MESSAGES);
//   const [messages, setMessages] = useState([]);
//   const [senderId, setSenderId] = useState('');
//   const [receiverId, setReceiverId] = useState('');
//   const [content, setContent] = useState('');

//   useEffect(() => {
//     if (data) {
//       setMessages(data.messages);
//     }
//   }, [data]);

//   useEffect(() => {
//     socket.on('receiveMessage', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('receiveMessage');
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     socket.emit('sendMessage', { senderId: parseInt(senderId), receiverId: parseInt(receiverId), content });
//     setSenderId('');
//     setReceiverId('');
//     setContent('');
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h1>Messages</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           placeholder="Sender ID"
//           value={senderId}
//           onChange={(e) => setSenderId(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Receiver ID"
//           value={receiverId}
//           onChange={(e) => setReceiverId(e.target.value)}
//         />
//         <textarea
//           placeholder="Message Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         ></textarea>
//         <button type="submit">Send Message</button>
//       </form>
//       <ul>
//         {messages.map((msg) => (
//           <li key={msg.id}>
//             <strong>{msg.sender.username}</strong> to <strong>{msg.receiver.username}</strong>: {msg.content} <em>at {msg.timestamp}</em>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
