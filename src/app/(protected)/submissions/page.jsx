"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_SUBMISSION } from "@/graphql/mutation";
import { GET_SUBMISSIONS } from "@/graphql/query";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { submissionsDemoData } from "@/utils/demoData";

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
    <div>
      <Heading title="Submissions" />
      {/* <LoadingAndErrorMessage loading={loading} error={error} /> */}

      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-4 bg-indigo-50 p-6 rounded-md border"
      >
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form__input__field"
        ></textarea>
        <input
          type="number"
          placeholder="Assignment ID"
          value={assignmentId}
          onChange={(e) => setAssignmentId(e.target.value)}
          className="form__input__field"
        />
        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="form__input__field"
        />
        <button type="submit" className="form__submit__button">
          Submit Assignment
        </button>
      </form>

      <Heading title="Recent Submissions" />
      <div className="grid grid-cols-3 gap-6">
        {submissionsDemoData?.map((submission) => (
          <div
            key={submission?.id}
            className="p-4 border rounded-md bg-amber-50"
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
          </div>
        ))}
      </div>
    </div>
  );
}
