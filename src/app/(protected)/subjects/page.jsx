"use client";

import Heading from "@/components/Heading";
import LoadingAndErrorMessage from "@/components/LoadingAndErrorMessage";
import { GET_SUBJECTS } from "@/graphql/query";
import { useQuery } from "@apollo/client";

export default function Subjects() {
  const { loading, error, data } = useQuery(GET_SUBJECTS);

  return (
    <div >
      <Heading title="Subjects" />
      <LoadingAndErrorMessage loading={loading} error={error} />

      <ul>
        {(data?.subjects || [])?.map((subject) => (
          <li key={subject?.id} className={styles["subject-item"]}>
            <span className={styles["subject-details"]}>
              {subject?.name} - {subject?.class?.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
