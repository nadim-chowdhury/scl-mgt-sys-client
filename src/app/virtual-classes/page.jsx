import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_VIRTUAL_CLASSES = gql`
  query GetVirtualClasses {
    virtualClasses {
      id
      meetingLink
      schedule
      course {
        name
      }
    }
  }
`;

const CREATE_VIRTUAL_CLASS = gql`
  mutation CreateVirtualClass(
    $meetingLink: String!
    $schedule: String!
    $courseId: Int!
  ) {
    createVirtualClass(
      meetingLink: $meetingLink
      schedule: $schedule
      courseId: $courseId
    ) {
      id
      meetingLink
      schedule
    }
  }
`;

const UPDATE_SCHEDULE = gql`
  mutation UpdateSchedule($id: Int!, $schedule: String!) {
    updateSchedule(id: $id, schedule: $schedule) {
      id
      schedule
    }
  }
`;

export default function VirtualClasses() {
  const { loading, error, data } = useQuery(GET_VIRTUAL_CLASSES);
  const [createVirtualClass] = useMutation(CREATE_VIRTUAL_CLASS);
  const [updateSchedule] = useMutation(UPDATE_SCHEDULE);
  const [meetingLink, setMeetingLink] = useState("");
  const [schedule, setSchedule] = useState("");
  const [courseId, setCourseId] = useState("");
  const [classId, setClassId] = useState("");

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Virtual Classes</h1>
      <form onSubmit={handleCreateVirtualClass}>
        <input
          type="text"
          placeholder="Meeting Link"
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Schedule"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <input
          type="number"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <button type="submit">Create Virtual Class</button>
      </form>
      <form onSubmit={handleUpdateSchedule}>
        <input
          type="number"
          placeholder="Class ID"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="New Schedule"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <button type="submit">Update Schedule</button>
      </form>
      <ul>
        {data.virtualClasses.map((virtualClass) => (
          <li key={virtualClass.id}>
            <p>
              Meeting Link:{" "}
              <a
                href={virtualClass.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join
              </a>
            </p>
            <p>Schedule: {virtualClass.schedule}</p>
            <p>Course: {virtualClass.course.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
