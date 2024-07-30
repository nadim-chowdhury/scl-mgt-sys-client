"use client";

import { useMutation, useQuery } from "@apollo/client";
import { GET_TIMETABLES } from "@/graphql/query";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { timetablesDemoData } from "@/utils/demoData";
import { CREATE_TIMETABLE } from "@/graphql/mutation";
import { useState } from "react";

export default function Timetable() {
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { loading, error, data } = useQuery(GET_TIMETABLES);
  console.log("🚀 ~ Timetable ~ data:", data);
  const [createTimetable] = useMutation(CREATE_TIMETABLE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTimetable({
      variables: {
        classId: parseInt(classId),
        subjectId: parseInt(subjectId),
        day,
        startTime,
        endTime,
      },
    });
    setClassId("");
    setSubjectId("");
    setDay("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <div>
      <Heading title="Timetable" />
      {/* <LoadingAndErrorMessage loading={loading} error={error} /> */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8 bg-indigo-50 p-6 rounded-md border"
      >
        <div>
          <label
            htmlFor="classId"
            className="block text-sm font-medium text-gray-700"
          >
            Class ID
          </label>
          <input
            id="classId"
            type="number"
            placeholder="Enter Class ID"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="form__input__field"
          />
        </div>
        <div>
          <label
            htmlFor="subjectId"
            className="block text-sm font-medium text-gray-700"
          >
            Subject ID
          </label>
          <input
            id="subjectId"
            type="number"
            placeholder="Enter Subject ID"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="form__input__field"
          />
        </div>
        <div>
          <label
            htmlFor="day"
            className="block text-sm font-medium text-gray-700"
          >
            Day
          </label>
          <input
            id="day"
            type="text"
            placeholder="Enter Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="form__input__field"
          />
        </div>
        <div>
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700"
          >
            Start Time
          </label>
          <input
            id="startTime"
            type="text"
            placeholder="Enter Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="form__input__field"
          />
        </div>
        <div>
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700"
          >
            End Time
          </label>
          <input
            id="endTime"
            type="text"
            placeholder="Enter End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="form__input__field"
          />
        </div>

        <button type="submit" className="form__submit__button">
          Create Timetable
        </button>
      </form>

      <Heading title="All Timetable" />
      <div className="space-y-4">
        {timetablesDemoData?.map((tt) => (
          <div key={tt.id} className="py-2 bg-amber-50 px-4 rounded-md border">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-lg font-semibold">{tt?.subject?.name}</p>
                <p className="text-sm text-gray-600">{tt?.class?.name}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm">Day: {tt?.day}</p>
                <p className="text-sm">
                  Time: {tt?.startTime} - {tt?.endTime}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
