import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_SUBJECTS = gql`
  query GetSubjects {
    subjects {
      id
      name
      class {
        name
      }
    }
  }
`;

const CREATE_SUBJECT = gql`
  mutation CreateSubject($name: String!, $classId: Int!) {
    createSubject(name: $name, classId: $classId) {
      id
      name
    }
  }
`;

export default function Subjects() {
  const { loading, error, data } = useQuery(GET_SUBJECTS);
  const [createSubject] = useMutation(CREATE_SUBJECT);
  const [name, setName] = useState("");
  const [classId, setClassId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSubject({ variables: { name, classId: parseInt(classId) } });
    setName("");
    setClassId("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Subjects</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Class ID"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        />
        <button type="submit">Create Subject</button>
      </form>
      <ul>
        {data.subjects.map((subject) => (
          <li key={subject.id}>
            {subject.name} - {subject.class.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
