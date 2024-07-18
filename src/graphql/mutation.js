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

export const CREATE_ANNOUNCEMENT = gql`
  mutation CreateAnnouncement($title: String!, $content: String!) {
    createAnnouncement(title: $title, content: $content) {
      id
      title
      content
      createdAt
    }
  }
`;

export const CREATE_FEE = gql`
  mutation CreateFee($userId: Int!, $amount: Float!, $dueDate: String!) {
    createFee(userId: $userId, amount: $amount, dueDate: $dueDate) {
      id
      amount
      dueDate
      status
    }
  }
`;

export const UPDATE_FEE_STATUS = gql`
  mutation UpdateFeeStatus($id: Int!, $status: String!) {
    updateFeeStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($feeId: Int!, $amount: Float!, $method: String!) {
    createPayment(feeId: $feeId, amount: $amount, method: $method) {
      id
      amount
      paymentDate
      method
    }
  }
`;

export const CREATE_INVOICE = gql`
  mutation CreateInvoice($userId: Int!, $paymentId: Int!, $amount: Float!) {
    createInvoice(userId: $userId, paymentId: $paymentId, amount: $amount) {
      id
      amount
      generatedAt
    }
  }
`;

export const CREATE_COURSE = gql`
  mutation CreateCourse($name: String!, $description: String!) {
    createCourse(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const CREATE_ASSIGNMENT = gql`
  mutation CreateAssignment(
    $title: String!
    $description: String!
    $dueDate: String!
    $courseId: Int!
  ) {
    createAssignment(
      title: $title
      description: $description
      dueDate: $dueDate
      courseId: $courseId
    ) {
      id
      title
      description
      dueDate
    }
  }
`;

export const GRADE_SUBMISSION = gql`
  mutation GradeSubmission(
    $submissionId: Int!
    $grade: Int!
    $feedback: String!
  ) {
    gradeSubmission(
      submissionId: $submissionId
      grade: $grade
      feedback: $feedback
    ) {
      id
      grade
      feedback
    }
  }
`;

export const CREATE_SUBMISSION = gql`
  mutation CreateSubmission(
    $content: String!
    $assignmentId: Int!
    $studentId: Int!
  ) {
    createSubmission(
      content: $content
      assignmentId: $assignmentId
      studentId: $studentId
    ) {
      id
      content
      submittedAt
    }
  }
`;

export const CREATE_VIRTUAL_CLASS = gql`
  mutation CreateVirtualClass(
    $meetingLink: String!
    $schedule: String!
    $courseId: Int!
  ) {
    createVirtualClass(
      meetingLink: $meetingLink
      schedule: $schedule
      courseId: $courseId
    ) {
      id
      meetingLink
      schedule
    }
  }
`;

export const UPDATE_SCHEDULE = gql`
  mutation UpdateSchedule($id: Int!, $schedule: String!) {
    updateSchedule(id: $id, schedule: $schedule) {
      id
      schedule
    }
  }
`;
