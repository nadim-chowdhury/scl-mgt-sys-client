import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_ATTENDANCES = gql`
  query GetAttendances {
    attendances {
      id
      class {
        name
      }
      student {
        name
      }
      date
      status
    }
  }
`;

const MARK_ATTENDANCE = gql`
  mutation MarkAttendance(
    $classId: Int!
    $studentId: Int!
    $date: String!
    $status: String!
  ) {
    markAttendance(
      classId: $classId
      studentId: $studentId
      date: $date
      status: $status
    ) {
      id
      date
      status
    }
  }
`;

export default function Attendance() {
  const { loading, error, data } = useQuery(GET_ATTENDANCES);
  const [markAttendance] = useMutation(MARK_ATTENDANCE);
  const [classId, setClassId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await markAttendance({
      variables: {
        classId: parseInt(classId),
        studentId: parseInt(studentId),
        date,
        status,
      },
    });
    setClassId("");
    setStudentId("");
    setDate("");
    setStatus("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Attendance</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Class ID"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button type="submit">Mark Attendance</button>
      </form>
      <ul>
        {data.attendances.map((att) => (
          <li key={att.id}>
            {att.class.name} - {att.student.name} - {att.date} - {att.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
