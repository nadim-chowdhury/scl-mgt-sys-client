"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ASSIGNMENTS, GET_COURSES } from "@/graphql/query";
import { CREATE_ASSIGNMENT, GRADE_SUBMISSION } from "@/graphql/mutation";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import Heading from "@/components/Heading";
import { mockAssignmentsData } from "@/utils/demoData";

export default function Assignments() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [courseId, setCourseId] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_ASSIGNMENTS);
  console.log("🚀 ~ Assignments ~ data:", data);
  const {
    loading: coursesLoading,
    error: coursesError,
    data: coursesData,
    refetch: coursesRefetch,
  } = useQuery(GET_COURSES);
  console.log("coursesData:", coursesData);
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
    refetch();
  };

  return (
    <div>
      <Heading title="Assignments" />
      {/* <LoadingAndErrorMessage loading={loading} error={error} /> */}

      <div className="grid grid-cols-2 gap-6 mb-8">
        <form
          onSubmit={handleCreateAssignment}
          className="space-y-4 bg-indigo-50 p-6 rounded-md border"
        >
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
          {/* <input
            type="number"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          /> */}
          <select
            value={courseId}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">Select Course Id</option>
            {coursesData?.courses?.map((item, i) => (
              <option key={i} value={item?.id}>
                {item?.title}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-amber-500 text-white px-4 py-2 rounded"
          >
            Create Assignment
          </button>
        </form>

        <form
          onSubmit={handleGradeSubmission}
          className="space-y-4 bg-indigo-50 p-6 rounded-md border"
        >
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
            className="bg-amber-500 text-white px-4 py-2 rounded"
          >
            Grade Submission
          </button>
        </form>
      </div>

      <Heading title="All Assignments" />
      <div className="grid grid-cols-4 gap-6">
        {mockAssignmentsData?.map((assignment) => (
          <div
            key={assignment?.id}
            className="p-6 border rounded-md bg-amber-50"
          >
            <div className="">
              <h2 className="text-2xl font-semibold mb-2">
                {assignment?.title}
              </h2>
              <p className="mb-4">{assignment?.description}</p>
              <p className="mb-4">
                <span className="font-medium">Due Date:</span>{" "}
                {assignment?.dueDate}
              </p>
              <p className="mb-4">
                <span className="font-medium">Course:</span>{" "}
                {assignment?.course?.name}
              </p>
            </div>

            <div className="space-y-2 border rounded-md p-4">
              <h3 className="text-xl font-semibold mb-2">Submissions</h3>
              {assignment?.submissions?.map((submission) => (
                <div key={submission?.id} className="">
                  <p>
                    <span className="font-medium">Submitted by:</span>{" "}
                    {submission?.student.username}
                  </p>
                  <p>
                    <span className="font-medium">Submitted at:</span>{" "}
                    {submission?.submittedAt}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Content:</span>{" "}
                    {submission?.content}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Grade:</span>{" "}
                    {submission?.grade}
                  </p>
                  <p>
                    <span className="font-medium">Feedback:</span>{" "}
                    {submission?.feedback}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
