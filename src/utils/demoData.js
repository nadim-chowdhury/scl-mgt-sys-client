export const mockAcademicPerformanceReport = [
  {
    assignmentTitle: "Assignment 1",
    submissions: 30,
    averageScore: 85,
  },
  {
    assignmentTitle: "Assignment 2",
    submissions: 28,
    averageScore: 78,
  },
  {
    assignmentTitle: "Assignment 3",
    submissions: 32,
    averageScore: 90,
  },
];

export const mockAnnouncementsData = [
  {
    id: "1",
    title: "Welcome Back!",
    content: "We hope you had a great summer break.",
    createdAt: "2024-07-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Exam Schedule",
    content: "The exam schedule has been released. Please check the portal.",
    createdAt: "2024-07-10T15:30:00Z",
  },
];

export const newAnnouncement = {
  id: "3",
  title: "New Assignment",
  content: "A new assignment has been added to your course.",
  createdAt: "2024-07-15T12:00:00Z",
};

export const mockAssignmentsData = [
  {
    id: "1",
    title: "Math Homework",
    description: "Complete the problems on page 42.",
    dueDate: "2024-08-01",
    course: { name: "Mathematics" },
    submissions: [
      {
        id: "1",
        student: { username: "student1" },
        submittedAt: "2024-07-20T10:00:00Z",
        content: "My completed homework",
        grade: 95,
        feedback: "Great job!",
      },
    ],
  },
  {
    id: "2",
    title: "History Essay",
    description: "Write an essay on World War II.",
    dueDate: "2024-08-05",
    course: { name: "History" },
    submissions: [
      {
        id: "2",
        student: { username: "student2" },
        submittedAt: "2024-07-21T12:30:00Z",
        content: "My essay",
        grade: 88,
        feedback: "Well done!",
      },
    ],
  },
  {
    id: "3",
    title: "Math Homework",
    description: "Complete the problems on page 42.",
    dueDate: "2024-08-01",
    course: { name: "Mathematics" },
    submissions: [
      {
        id: "3",
        student: { username: "student1" },
        submittedAt: "2024-07-20T10:00:00Z",
        content: "My completed homework",
        grade: 95,
        feedback: "Great job!",
      },
    ],
  },
  {
    id: "4",
    title: "History Essay",
    description: "Write an essay on World War II.",
    dueDate: "2024-08-05",
    course: { name: "History" },
    submissions: [
      {
        id: "4",
        student: { username: "student2" },
        submittedAt: "2024-07-21T12:30:00Z",
        content: "My essay",
        grade: 88,
        feedback: "Well done!",
      },
    ],
  },
];

export const attendanceReportMockData = [
  {
    student: "Alice Johnson",
    class: "Math 101",
    date: "2024-07-01",
    status: "Present",
  },
  {
    student: "Bob Smith",
    class: "History 202",
    date: "2024-07-01",
    status: "Absent",
  },
  {
    student: "Alice Johnson",
    class: "Math 101",
    date: "2024-07-02",
    status: "Absent",
  },
  {
    student: "Bob Smith",
    class: "History 202",
    date: "2024-07-02",
    status: "Present",
  },
  {
    student: "Charlie Brown",
    class: "Science 303",
    date: "2024-07-02",
    status: "Present",
  },
];

export const classesDemoData = [
  {
    id: "1",
    name: "Math 101",
    teacher: {
      name: "Mr. John Doe",
    },
  },
  {
    id: "2",
    name: "History 202",
    teacher: {
      name: "Ms. Jane Smith",
    },
  },
  {
    id: "3",
    name: "Science 303",
    teacher: {
      name: "Dr. Emily Brown",
    },
  },
];

export const coursesMockData = [
  {
    id: "1",
    name: "Introduction to Programming",
    description: "Learn the basics of programming with JavaScript.",
    assignments: [
      {
        id: "a1",
        title: "Assignment 1",
        dueDate: "2024-08-01",
      },
      {
        id: "a2",
        title: "Assignment 2",
        dueDate: "2024-08-15",
      },
    ],
  },
  {
    id: "2",
    name: "Introduction to Programming",
    description: "Learn the basics of programming with JavaScript.",
    assignments: [
      {
        id: "a1",
        title: "Assignment 1",
        dueDate: "2024-08-01",
      },
      {
        id: "a2",
        title: "Assignment 2",
        dueDate: "2024-08-15",
      },
    ],
  },
  {
    id: "3",
    name: "Introduction to Programming",
    description: "Learn the basics of programming with JavaScript.",
    assignments: [
      {
        id: "a1",
        title: "Assignment 1",
        dueDate: "2024-08-01",
      },
      {
        id: "a2",
        title: "Assignment 2",
        dueDate: "2024-08-15",
      },
    ],
  },
];
