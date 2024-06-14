import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
  query GetStudents {
    students {
      id
      username
      age
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile($username: String!) {
    profile(username: $username) {
      id
      username
      role
    }
  }
`;

export const GET_CLASSES = gql`
  query GetClasses {
    classes {
      id
      username
      teacher {
        username
      }
    }
  }
`;

export const GET_SUBJECTS = gql`
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

export const GET_TIMETABLES = gql`
  query GetTimetables {
    timetables {
      id
      class {
        name
      }
      subject {
        name
      }
      day
      startTime
      endTime
    }
  }
`;

export const GET_ATTENDANCES = gql`
  query GetAttendances {
    attendances {
      id
      student {
        name
      }
      date
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      content
      timestamp
      sender {
        username
      }
      receiver {
        username
      }
    }
  }
`;
