"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ASSIGNMENTS } from "@/graphql/query";
import { CREATE_ASSIGNMENT, GRADE_SUBMISSION } from "@/graphql/mutation";

export default function Assignments() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [courseId, setCourseId] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");

  const { loading, error, data } = useQuery(GET_ASSIGNMENTS);
  const [createAssignment] = useMutation(CREATE_ASSIGNMENT);
  const [gradeSubmission] = useMutation(GRADE_SUBMISSION);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    await createAssignment({
      variables: { title, description, dueDate, courseId: parseInt(courseId) },
    });
    setTitle("");
    setDescription("");
    setDueDate("");
    setCourseId("");
  };

  const handleGradeSubmission = async (e) => {
    e.preventDefault();
    await gradeSubmission({
      variables: {
        submissionId: parseInt(submissionId),
        grade: parseInt(grade),
        feedback,
      },
    });
    setSubmissionId("");
    setGrade("");
    setFeedback("");
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Assignments</h1>
      <form onSubmit={handleCreateAssignment} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Assignment
        </button>
      </form>
      <form onSubmit={handleGradeSubmission} className="mb-8 space-y-4">
        <input
          type="number"
          placeholder="Submission ID"
          value={submissionId}
          onChange={(e) => setSubmissionId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Grade Submission
        </button>
      </form>
      <ul className="space-y-6">
        {data.assignments.map((assignment) => (
          <li
            key={assignment.id}
            className="p-4 border border-gray-300 rounded"
          >
            <h2 className="text-2xl font-semibold mb-2">{assignment.title}</h2>
            <p className="mb-4">{assignment.description}</p>
            <p className="mb-4">
              <span className="font-medium">Due Date:</span>{" "}
              {assignment.dueDate}
            </p>
            <p className="mb-4">
              <span className="font-medium">Course:</span>{" "}
              {assignment.course.name}
            </p>
            <h3 className="text-xl font-semibold mb-2">Submissions</h3>
            <ul className="space-y-2">
              {assignment.submissions.map((submission) => (
                <li
                  key={submission.id}
                  className="p-2 border border-gray-200 rounded"
                >
                  <p>
                    <span className="font-medium">Submitted by:</span>{" "}
                    {submission.student.username}
                  </p>
                  <p>
                    <span className="font-medium">Submitted at:</span>{" "}
                    {submission.submittedAt}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Content:</span>{" "}
                    {submission.content}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Grade:</span>{" "}
                    {submission.grade}
                  </p>
                  <p>
                    <span className="font-medium">Feedback:</span>{" "}
                    {submission.feedback}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
