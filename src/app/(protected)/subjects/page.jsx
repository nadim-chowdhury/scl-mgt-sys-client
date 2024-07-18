"use client";

import { useQuery } from "@apollo/client";
import { GET_SUBJECTS } from "../../../graphql/query";

export default function Subjects() {
  const { loading, error, data } = useQuery(GET_SUBJECTS);

  return (
    <div className="max-w-3xl mx-auto bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Subjects</h1>
      <ul>
        {data?.subjects?.map((subject) => (
          <li key={subject.id} className={styles["subject-item"]}>
            <span className={styles["subject-details"]}>
              {subject.name} - {subject.class.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
