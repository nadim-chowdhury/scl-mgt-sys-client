import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_CLASSES = gql`
  query GetClasses {
    classes {
      id
      name
      teacher {
        name
      }
    }
  }
`;

const CREATE_CLASS = gql`
  mutation CreateClass($name: String!, $teacherId: Int!) {
    createClass(name: $name, teacherId: $teacherId) {
      id
      name
    }
  }
`;

export default function Classes() {
  const { loading, error, data } = useQuery(GET_CLASSES);
  const [createClass] = useMutation(CREATE_CLASS);
  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createClass({ variables: { name, teacherId: parseInt(teacherId) } });
    setName("");
    setTeacherId("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Classes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Class Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Teacher ID"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
        />
        <button type="submit">Create Class</button>
      </form>
      <ul>
        {data.classes.map((cls) => (
          <li key={cls.id}>
            {cls.name} - {cls.teacher.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
