import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_SUBMISSIONS = gql`
  query GetSubmissions {
    submissions {
      id
      content
      submittedAt
      assignment {
        title
      }
      student {
        username
      }
    }
  }
`;

const CREATE_SUBMISSION = gql`
  mutation CreateSubmission(
    $content: String!
    $assignmentId: Int!
    $studentId: Int!
  ) {
    createSubmission(
      content: $content
      assignmentId: $assignmentId
      studentId: $studentId
    ) {
      id
      content
      submittedAt
    }
  }
`;

export default function Submissions() {
  const { loading, error, data } = useQuery(GET_SUBMISSIONS);
  const [createSubmission] = useMutation(CREATE_SUBMISSION);
  const [content, setContent] = useState("");
  const [assignmentId, setAssignmentId] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSubmission({
      variables: {
        content,
        assignmentId: parseInt(assignmentId),
        studentId: parseInt(studentId),
      },
    });
    setContent("");
    setAssignmentId("");
    setStudentId("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Submissions</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="number"
          placeholder="Assignment ID"
          value={assignmentId}
          onChange={(e) => setAssignmentId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button type="submit">Submit Assignment</button>
      </form>
      <ul>
        {data.submissions.map((submission) => (
          <li key={submission.id}>
            <h2>{submission.assignment.title}</h2>
            <p>Submitted by: {submission.student.username}</p>
            <p>Submitted at: {submission.submittedAt}</p>
            <p>Content: {submission.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
