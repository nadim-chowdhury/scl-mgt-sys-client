import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
  query GetStudents {
    students {
      id
      name
      age
    }
  }
`;
