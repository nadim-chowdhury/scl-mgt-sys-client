import client from "@/lib/apolloClient";

export default function AllStudents() {
  const { loading, error, data } = useQuery(GET_STUDENTS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Students</h1>
      <ul>
        {data.students.map((student) => (
          <li key={student.id} className="p-2 border-b border-gray-300">
            {student.name} ({student.age} years old)
          </li>
        ))}
      </ul>
    </div>
  );
}
