import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      name
      description
      assignments {
        id
        title
        dueDate
      }
    }
  }
`;

const CREATE_COURSE = gql`
  mutation CreateCourse($name: String!, $description: String!) {
    createCourse(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export default function Courses() {
  const { loading, error, data } = useQuery(GET_COURSES);
  const [createCourse] = useMutation(CREATE_COURSE);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCourse({ variables: { name, description } });
    setName("");
    setDescription("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Courses</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Create Course</button>
      </form>
      <ul>
        {data.courses.map((course) => (
          <li key={course.id}>
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <h3>Assignments</h3>
            <ul>
              {course.assignments.map((assignment) => (
                <li key={assignment.id}>
                  {assignment.title} - Due: {assignment.dueDate}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
