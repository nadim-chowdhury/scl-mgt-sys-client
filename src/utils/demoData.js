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

export const feesMockData = [
  {
    id: 1,
    amount: 100.0,
    dueDate: "2024-08-01",
    status: "Pending",
    user: {
      username: "john_doe",
    },
  },
  {
    id: 2,
    amount: 150.5,
    dueDate: "2024-08-15",
    status: "Paid",
    user: {
      username: "jane_smith",
    },
  },
  {
    id: 3,
    amount: 200.75,
    dueDate: "2024-09-01",
    status: "Overdue",
    user: {
      username: "alice_johnson",
    },
  },
];

export const financialReportsMockData = {
  totalFees: 5000.0,
  totalPayments: 3500.0,
  outstandingAmount: 1500.0,
};

export const invoicesMockData = [
  {
    id: 1,
    amount: 200.0,
    generatedAt: "2024-07-15",
    payment: {
      id: 101,
    },
    user: {
      username: "john_doe",
    },
  },
  {
    id: 2,
    amount: 350.75,
    generatedAt: "2024-07-16",
    payment: {
      id: 102,
    },
    user: {
      username: "jane_smith",
    },
  },
  {
    id: 3,
    amount: 500.5,
    generatedAt: "2024-07-17",
    payment: {
      id: 103,
    },
    user: {
      username: "alice_johnson",
    },
  },
];

export const messagesMockData = [
  {
    id: 1,
    sender: { username: "john_doe" },
    receiver: { username: "jane_smith" },
    content: "Hey Jane, how are you?",
    timestamp: "2024-07-20T10:00:00Z",
  },
  {
    id: 2,
    sender: { username: "jane_smith" },
    receiver: { username: "john_doe" },
    content: "Hi John! I'm good, thanks for asking.",
    timestamp: "2024-07-20T10:05:00Z",
  },
  {
    id: 3,
    sender: { username: "john_doe" },
    receiver: { username: "jane_smith" },
    content: "Great to hear! Do you have any plans for the weekend?",
    timestamp: "2024-07-20T10:10:00Z",
  },
];

export const paymentsMockData = [
  {
    id: 1,
    amount: 150.0,
    paymentDate: "2024-07-01",
    method: "Credit Card",
    fee: {
      amount: 150.0,
      user: { username: "john_doe" },
    },
  },
  {
    id: 2,
    amount: 200.0,
    paymentDate: "2024-07-05",
    method: "Bank Transfer",
    fee: {
      amount: 200.0,
      user: { username: "jane_smith" },
    },
  },
  {
    id: 3,
    amount: 75.5,
    paymentDate: "2024-07-10",
    method: "PayPal",
    fee: {
      amount: 75.5,
      user: { username: "alice_johnson" },
    },
  },
];

export const paymentsHistoryMockData = [
  {
    id: 1,
    amount: 150.0,
    paymentDate: "2024-07-01",
    method: "Credit Card",
    fee: {
      user: { username: "john_doe" },
      amount: 150.0,
    },
  },
  {
    id: 2,
    amount: 200.0,
    paymentDate: "2024-07-05",
    method: "Bank Transfer",
    fee: {
      user: { username: "jane_smith" },
      amount: 200.0,
    },
  },
  {
    id: 3,
    amount: 75.5,
    paymentDate: "2024-07-10",
    method: "PayPal",
    fee: {
      user: { username: "alice_johnson" },
      amount: 75.5,
    },
  },
];

export const subjectsDemoData = [
  {
    id: "1",
    name: "Mathematics",
    class: { name: "Class 1" },
  },
  {
    id: "2",
    name: "English",
    class: { name: "Class 2" },
  },
  {
    id: "3",
    name: "Science",
    class: { name: "Class 3" },
  },
];

export const submissionsDemoData = [
  {
    id: "1",
    assignment: { title: "Math Assignment 1" },
    student: { username: "student1" },
    submittedAt: "2024-07-30T10:00:00Z",
    content: "Here is my math assignment.",
  },
  {
    id: "2",
    assignment: { title: "English Essay" },
    student: { username: "student2" },
    submittedAt: "2024-07-29T14:00:00Z",
    content: "This is my essay on Shakespeare.",
  },
  {
    id: "3",
    assignment: { title: "Science Project" },
    student: { username: "student3" },
    submittedAt: "2024-07-28T16:00:00Z",
    content: "Science project on renewable energy.",
  },
];

export const timetablesDemoData = [
  {
    id: "1",
    subject: { name: "Math" },
    class: { name: "Class 1" },
    day: "Monday",
    startTime: "08:00",
    endTime: "09:00",
  },
  {
    id: "2",
    subject: { name: "English" },
    class: { name: "Class 2" },
    day: "Tuesday",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: "3",
    subject: { name: "Science" },
    class: { name: "Class 3" },
    day: "Wednesday",
    startTime: "12:00",
    endTime: "13:00",
  },
];

export const virtualClassesDemoData = [
  {
    id: "1",
    meetingLink: "https://zoom.us/j/1234567890",
    schedule: "2024-08-01T10:00:00Z",
    course: { name: "Math Course" },
  },
  {
    id: "2",
    meetingLink: "https://zoom.us/j/0987654321",
    schedule: "2024-08-02T14:00:00Z",
    course: { name: "English Course" },
  },
  {
    id: "3",
    meetingLink: "https://zoom.us/j/1122334455",
    schedule: "2024-08-03T16:00:00Z",
    course: { name: "Science Course" },
  },
];
