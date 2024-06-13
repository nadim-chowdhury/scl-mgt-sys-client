"use client";

import Loading from "../../../app/loading";
import { GET_STUDENTS } from "../../../graphql/query";
import { useQuery } from "@apollo/client";
import { Table } from "antd";

export default function AllStudents() {
  const { loading, error, data } = useQuery(GET_STUDENTS);
  console.log("AllStudents ~ data:", data);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
  ];

  const paginationConfig = {
    pageSize: 10,
    total: data?.students?.length,
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: (total, range) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Students</h1>
      {/* <ul>
        {data.students.map((student) => (
          <li key={student.id} className="p-2 border-b border-gray-300">
            {student.name} ({student.age} years old)
          </li>
        ))}
      </ul> */}

      <Table
        columns={columns}
        dataSource={data?.students}
        pagination={paginationConfig}
        rowKey="id"
        className="border rounded-md"
      />
    </div>
  );
}
