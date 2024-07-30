"use client";

import { useQuery } from "@apollo/client";
import { Table } from "antd";
import { teachersDemoData } from "@/utils/teachers-demo-data";
import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { GET_TEACHERS } from "../../../graphql/query";

export default function AllTeachers() {
  const { loading, error, data } = useQuery(GET_TEACHERS);
  console.log("AllTeachers ~ data:", data);

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
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
  ];

  const paginationConfig = {
    pageSize: 10,
    total: data?.teachers?.length,
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: (total, range) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
  };

  return (
    <div>
      <Heading title="Teachers" />
      {/* <LoadingAndErrorMessage loading={loading} error={error} /> */}

      <div>
        {(data?.teachers || [])?.map((teacher) => (
          <div key={teacher?.id} className="p-2 border-b ">
            {teacher?.name} ({teacher?.subject} - {teacher?.age} years old)
          </div>
        ))}
      </div>

      <Table
        columns={columns}
        dataSource={data?.teachers || teachersDemoData}
        pagination={paginationConfig}
        rowKey="id"
        className="border rounded-md"
        rowClassName="bg-amber-50"
      />
    </div>
  );
}
