"use client";

import { useQuery } from "@apollo/client";
import { Table } from "antd";
import { studentsDemoData } from "@/utils/students-demo-data";
import { GET_STUDENTS } from "../../../graphql/query";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";

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

  return (
    <div>
      <Heading title="Students" />
      <LoadingAndErrorMessage loading={loading} error={error} />

      <ul>
        {data?.students?.map((student) => (
          <li key={student.id} className="p-2 border-b border-gray-300">
            {student.name} ({student.age} years old)
          </li>
        ))}
      </ul>

      <Table
        columns={columns}
        dataSource={data?.students || studentsDemoData}
        pagination={paginationConfig}
        rowKey="id"
        className="border rounded-md"
      />
    </div>
  );
}
