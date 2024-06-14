import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_ASSIGNMENTS = gql`
  query GetAssignments {
    assignments {
      id
      title
      description
      dueDate
      course {
        name
      }
    }
  }
`;

const CREATE_ASSIGNMENT = gql`
  mutation CreateAssignment(
    $title: String!
    $description: String!
    $dueDate: String!
    $courseId: Int!
  ) {
    createAssignment(
      title: $title
      description: $description
      dueDate: $dueDate
      courseId: $courseId
    ) {
      id
      title
      description
      dueDate
    }
  }
`;

export default function Assignments() {
  const { loading, error, data } = useQuery(GET_ASSIGNMENTS);
  const [createAssignment] = useMutation(CREATE_ASSIGNMENT);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [courseId, setCourseId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAssignment({
      variables: { title, description, dueDate, courseId: parseInt(courseId) },
    });
    setTitle("");
    setDescription("");
    setDueDate("");
    setCourseId("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Assignments</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <button type="submit">Create Assignment</button>
      </form>
      <ul>
        {data.assignments.map((assignment) => (
          <li key={assignment.id}>
            <h2>{assignment.title}</h2>
            <p>{assignment.description}</p>
            <p>Due Date: {assignment.dueDate}</p>
            <p>Course: {assignment.course.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// import { useState } from 'react';
// import { useQuery, useMutation, gql } from '@apollo/client';

// const GET_ASSIGNMENTS = gql`
//   query GetAssignments {
//     assignments {
//       id
//       title
//       description
//       dueDate
//       course {
//         name
//       }
//       submissions {
//         id
//         content
//         submittedAt
//         grade
//         feedback
//         student {
//           username
//         }
//       }
//     }
//   }
// `;

// const CREATE_ASSIGNMENT = gql`
//   mutation CreateAssignment($title: String!, $description: String!, $dueDate: String!, $courseId: Int!) {
//     createAssignment(title: $title, description: $description, dueDate: $dueDate, courseId: $courseId) {
//       id
//       title
//       description
//       dueDate
//     }
//   }
// `;

// const GRADE_SUBMISSION = gql`
//   mutation GradeSubmission($submissionId: Int!, $grade: Int!, $feedback: String!) {
//     gradeSubmission(submissionId: $submissionId, grade: $grade, feedback: $feedback) {
//       id
//       grade
//       feedback
//     }
//   }
// `;

// export default function Assignments() {
//   const { loading, error, data } = useQuery(GET_ASSIGNMENTS);
//   const [createAssignment] = useMutation(CREATE_ASSIGNMENT);
//   const [gradeSubmission] = useMutation(GRADE_SUBMISSION);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [courseId, setCourseId] = useState('');
//   const [submissionId, setSubmissionId] = useState('');
//   const [grade, setGrade] = useState('');
//   const [feedback, setFeedback] = useState('');

//   const handleCreateAssignment = async (e) => {
//     e.preventDefault();
//     await createAssignment({ variables: { title, description, dueDate, courseId: parseInt(courseId) } });
//     setTitle('');
//     setDescription('');
//     setDueDate('');
//     setCourseId('');
//   };

//   const handleGradeSubmission = async (e) => {
//     e.preventDefault();
//     await gradeSubmission({ variables: { submissionId: parseInt(submissionId), grade: parseInt(grade), feedback } });
//     setSubmissionId('');
//     setGrade('');
//     setFeedback('');
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h1>Assignments</h1>
//       <form onSubmit={handleCreateAssignment}>
//         <input

//  type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         ></textarea>
//         <input
//           type="date"
//           placeholder="Due Date"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Course ID"
//           value={courseId}
//           onChange={(e) => setCourseId(e.target.value)}
//         />
//         <button type="submit">Create Assignment</button>
//       </form>
//       <form onSubmit={handleGradeSubmission}>
//         <input
//           type="number"
//           placeholder="Submission ID"
//           value={submissionId}
//           onChange={(e) => setSubmissionId(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Grade"
//           value={grade}
//           onChange={(e) => setGrade(e.target.value)}
//         />
//         <textarea
//           placeholder="Feedback"
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//         ></textarea>
//         <button type="submit">Grade Submission</button>
//       </form>
//       <ul>
//         {data.assignments.map((assignment) => (
//           <li key={assignment.id}>
//             <h2>{assignment.title}</h2>
//             <p>{assignment.description}</p>
//             <p>Due Date: {assignment.dueDate}</p>
//             <p>Course: {assignment.course.name}</p>
//             <h3>Submissions</h3>
//             <ul>
//               {assignment.submissions.map((submission) => (
//                 <li key={submission.id}>
//                   <p>Submitted by: {submission.student.username}</p>
//                   <p>Submitted at: {submission.submittedAt}</p>
//                   <p>Content: {submission.content}</p>
//                   <p>Grade: {submission.grade}</p>
//                   <p>Feedback: {submission.feedback}</p>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
