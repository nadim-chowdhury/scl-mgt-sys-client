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

export const GET_TEACHERS = gql`
  query GetTeachers {
    teachers {
      id
      name
      subject
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
      name
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

export const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    announcements {
      id
      title
      content
      createdAt
    }
  }
`;

export const GET_FEES = gql`
  query GetFees {
    fees {
      id
      amount
      dueDate
      status
      user {
        username
      }
    }
  }
`;

export const GET_PAYMENTS = gql`
  query GetPayments {
    payments {
      id
      amount
      paymentDate
      method
      fee {
        amount
        user {
          username
        }
      }
    }
  }
`;

export const GET_FEES_AND_PAYMENTS = gql`
  query GetFeesAndPayments {
    fees {
      id
      amount
      dueDate
      status
      user {
        username
      }
    }
    payments {
      id
      amount
      paymentDate
      method
      fee {
        amount
        user {
          username
        }
      }
    }
  }
`;

export const GET_INVOICES = gql`
  query GetInvoices {
    invoices {
      id
      amount
      generatedAt
      user {
        username
      }
      payment {
        id
        amount
      }
    }
  }
`;

export const GET_PAYMENT_HISTORY = gql`
  query GetPayments {
    payments {
      id
      amount
      paymentDate
      method
      fee {
        id
        amount
        user {
          username
        }
      }
    }
  }
`;

export const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      title
      description
      assignments {
        id
        title
        dueDate
      }
    }
  }
`;

export const GET_ASSIGNMENTS = gql`
  query GetAssignments {
    assignments {
      id
      title
      description
      dueDate
      course {
        name
      }
      submissions {
        id
        content
        submittedAt
        grade
        feedback
        student {
          username
        }
      }
    }
  }
`;

export const GET_SUBMISSIONS = gql`
  query GetSubmissions {
    submissions {
      id
      content
      submittedAt
      assignment {
        title
      }
      student {
        username
      }
    }
  }
`;

export const GET_VIRTUAL_CLASSES = gql`
  query GetVirtualClasses {
    virtualClasses {
      id
      meetingLink
      schedule
      course {
        name
      }
    }
  }
`;

export const GET_ACADEMIC_PERFORMANCE_REPORT = gql`
  query GetAcademicPerformanceReport($courseId: Float!) {
    academicPerformanceReport(courseId: $courseId) {
      assignmentTitle
      submissions
      averageScore
    }
  }
`;

export const GET_ATTENDANCE_REPORT = gql`
  query GetAttendanceReport {
    attendanceReport {
      student
      class
      date
      status
    }
  }
`;

export const GET_FINANCIAL_REPORT = gql`
  query GetFinancialReport {
    financialReport {
      totalFees
      totalPayments
      outstandingAmount
    }
  }
`;

export const GET_STUDENT_PERFORMANCE_REPORT = gql`
  query GetStudentPerformanceReport($studentId: Int!) {
    studentPerformanceReport(studentId: $studentId) {
      assignmentTitle
      grade
    }
  }
`;
