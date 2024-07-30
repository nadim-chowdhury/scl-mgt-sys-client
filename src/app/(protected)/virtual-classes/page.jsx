"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_VIRTUAL_CLASS, UPDATE_SCHEDULE } from "@/graphql/mutation";
import { GET_VIRTUAL_CLASSES } from "@/graphql/query";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { virtualClassesDemoData } from "@/utils/demoData";

export default function VirtualClasses() {
  const [meetingLink, setMeetingLink] = useState("");
  const [schedule, setSchedule] = useState("");
  const [courseId, setCourseId] = useState("");
  const [classId, setClassId] = useState("");

  const { loading, error, data } = useQuery(GET_VIRTUAL_CLASSES);
  console.log("🚀 ~ VirtualClasses ~ data:", data);
  const [createVirtualClass] = useMutation(CREATE_VIRTUAL_CLASS);
  const [updateSchedule] = useMutation(UPDATE_SCHEDULE);

  const handleCreateVirtualClass = async (e) => {
    e.preventDefault();
    await createVirtualClass({
      variables: { meetingLink, schedule, courseId: parseInt(courseId) },
    });
    setMeetingLink("");
    setSchedule("");
    setCourseId("");
  };

  const handleUpdateSchedule = async (e) => {
    e.preventDefault();
    await updateSchedule({ variables: { id: parseInt(classId), schedule } });
    setClassId("");
    setSchedule("");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6"></h1>

      <Heading title="Virtual Classes" />
      {/* <LoadingAndErrorMessage loading={loading} error={error} /> */}

      <div className="grid grid-cols-2 gap-6">
        <form
          onSubmit={handleCreateVirtualClass}
          className="mb-8 space-y-4 bg-indigo-50 p-6 rounded-md border"
        >
          <input
            type="text"
            placeholder="Meeting Link"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            className="form__input__field"
          />
          <input
            type="datetime-local"
            placeholder="Schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="form__input__field"
          />
          <input
            type="number"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="form__input__field"
          />

          <button type="submit" className="form__submit__button">
            Create Virtual Class
          </button>
        </form>

        <form
          onSubmit={handleUpdateSchedule}
          className="mb-8 space-y-4 bg-indigo-50 p-6 rounded-md border"
        >
          <input
            type="number"
            placeholder="Class ID"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="form__input__field"
          />
          <input
            type="datetime-local"
            placeholder="New Schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="form__input__field"
          />

          <button type="submit" className="form__submit__button">
            Update Schedule
          </button>
        </form>
      </div>

      <Heading title="Recent Virtual Classes" />
      <div className="grid grid-cols-4 gap-6">
        {virtualClassesDemoData?.map((virtualClass) => (
          <div
            key={virtualClass?.id}
            className="p-4 border rounded-md bg-amber-50"
          >
            <p className="mb-2">
              Meeting Link:{" "}
              <a
                href={virtualClass?.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 underline"
              >
                Join
              </a>
            </p>
            <p className="mb-1">Schedule: {virtualClass?.schedule}</p>
            <p className="mb-1">Course: {virtualClass?.course?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
