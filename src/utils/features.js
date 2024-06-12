import { FaChalkboardTeacher, FaUserGraduate, FaSchool } from "react-icons/fa";

export const features = [
  {
    id: 1,
    icon: <FaChalkboardTeacher size={40} />,
    title: "Teacher Management",
    description: "Manage teacher profiles, schedules, and more.",
    details:
      "Our system provides robust tools for managing teacher profiles, schedules, and performance metrics, ensuring an organized and efficient teaching staff.",
  },
  {
    id: 2,
    icon: <FaUserGraduate size={40} />,
    title: "Student Management",
    description: "Track student attendance, grades, and progress.",
    details:
      "Easily track student attendance, grades, and progress with our comprehensive student management tools, designed to enhance student performance and support.",
  },
  {
    id: 3,
    icon: <FaSchool size={40} />,
    title: "School Administration",
    description: "Simplify administrative tasks with automation.",
    details:
      "Automate administrative tasks such as enrollment, scheduling, and reporting, freeing up time for staff to focus on improving the educational experience.",
  },
];
