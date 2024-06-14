import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_TIMETABLES = gql`
  query GetTimetables {
    timetables {
      id
      class {
        name
      }
      subject {
        name
      }
      day
      startTime
      endTime
    }
  }
`;

const CREATE_TIMETABLE = gql`
  mutation CreateTimetable(
    $classId: Int!
    $subjectId: Int!
    $day: String!
    $startTime: String!
    $endTime: String!
  ) {
    createTimetable(
      classId: $classId
      subjectId: $subjectId
      day: $day
      startTime: $startTime
      endTime: $endTime
    ) {
      id
      day
      startTime
      endTime
    }
  }
`;

export default function Timetable() {
  const { loading, error, data } = useQuery(GET_TIMETABLES);
  const [createTimetable] = useMutation(CREATE_TIMETABLE);
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Timetable</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Class ID"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Subject ID"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <input
          type="text"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button type="submit">Create Timetable</button>
      </form>
      <ul>
        {data.timetables.map((tt) => (
          <li key={tt.id}>
            {tt.class.name} - {tt.subject.name} - {tt.day} - {tt.startTime} -{" "}
            {tt.endTime}
          </li>
        ))}
      </ul>
    </div>
  );
}
