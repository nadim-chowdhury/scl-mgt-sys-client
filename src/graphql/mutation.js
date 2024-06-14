const { gql } = require("@apollo/client");

// export const REGISTER_MUTATION = gql`
//   mutation Register(
//     $name: String!
//     $email: String!
//     $role: String!
//     $password: String!
//   ) {
//     register(name: $name, email: $email, role: $role, password: $password) {
//       id
//       name
//       email
//       role
//     }
//   }
// `;

// export const LOGIN_MUTATION = gql`
//   mutation Login($email: String!, $password: String!) {
//     login(email: $email, password: $password)
//   }
// `;

export const REGISTER_USER = gql`
  mutation Register($createUserInput: CreateUserInput!) {
    register(createUserInput: $createUserInput) {
      id
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput)
  }
`;

export const CREATE_CLASS = gql`
  mutation CreateClass($username: String!, $teacherId: Int!) {
    createClass(username: $username, teacherId: $teacherId) {
      id
      username
    }
  }
`;

export const CREATE_SUBJECT = gql`
  mutation CreateSubject($name: String!, $classId: Float!) {
    createSubject(name: $name, classId: $classId) {
      id
      name
    }
  }
`;

export const CREATE_TIMETABLE = gql`
  mutation CreateTimetable(
    $classId: Float!
    $subjectId: Float!
    $day: String!
    $startTime: String!
    $endTime: String!
  ) {
    createTimetable(
      classId: $classId
      subjectId: $subjectId
      day: $day
      startTime: $startTime
      endTime: $endTime
    ) {
      id
      day
      startTime
      endTime
    }
  }
`;

export const MARK_ATTENDANCE = gql`
  mutation MarkAttendance(
    $classId: Int!
    $studentId: Int!
    $date: String!
    $status: String!
  ) {
    markAttendance(
      classId: $classId
      studentId: $studentId
      date: $date
      status: $status
    ) {
      id
      date
      status
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($senderId: Int!, $receiverId: Int!, $content: String!) {
    sendMessage(
      senderId: $senderId
      receiverId: $receiverId
      content: $content
    ) {
      id
      content
      timestamp
    }
  }
`;
