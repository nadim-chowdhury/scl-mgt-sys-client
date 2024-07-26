"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_SUBMISSION } from "@/graphql/mutation";
import { GET_SUBMISSIONS } from "@/graphql/query";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";

export default function Submissions() {
  const [content, setContent] = useState("");
  const [assignmentId, setAssignmentId] = useState("");
  const [studentId, setStudentId] = useState("");

  const { loading, error, data } = useQuery(GET_SUBMISSIONS);
  const [createSubmission] = useMutation(CREATE_SUBMISSION);

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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Heading title="Submissions" />
      <LoadingAndErrorMessage loading={loading} error={error} />

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
        <input
          type="number"
          placeholder="Assignment ID"
          value={assignmentId}
          onChange={(e) => setAssignmentId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Assignment
        </button>
      </form>

      <ul className="space-y-6">
        {data?.submissions?.map((submission) => (
          <li
            key={submission?.id}
            className="p-4 border border-gray-300 rounded"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {submission?.assignment?.title}
            </h2>
            <p>
              <span className="font-medium">Submitted by:</span>{" "}
              {submission?.student?.username}
            </p>
            <p>
              <span className="font-medium">Submitted at:</span>{" "}
              {submission?.submittedAt}
            </p>
            <p>
              <span className="font-medium">Content:</span>{" "}
              {submission?.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
