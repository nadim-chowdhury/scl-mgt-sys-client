import { GiTeacher } from "react-icons/gi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";

export const sidebarMenuItems = [
  { key: "dashboard", icon: <MdSpaceDashboard />, title: "Dashboard" },
  {
    key: "academic-performance",
    icon: <FaHouseUser />,
    title: "Academic Performance",
  },
  { key: "announcements", icon: <FaHouseUser />, title: "Announcements" },
  { key: "assignments", icon: <FaHouseUser />, title: "Assignments" },
  { key: "attendance", icon: <FaHouseUser />, title: "Attendance" },
  { key: "classes", icon: <FaHouseUser />, title: "Classes" },
  // { key: "contact", icon: <FaHouseUser />, title: "Contact" },
  { key: "courses", icon: <FaHouseUser />, title: "Courses" },
  { key: "fees", icon: <FaHouseUser />, title: "Fees" },
  {
    key: "financial-reports",
    icon: <FaHouseUser />,
    title: "Financial Reports",
  },
  { key: "invoices", icon: <FaHouseUser />, title: "Invoices" },
  { key: "messages", icon: <FaHouseUser />, title: "Messages" },
  { key: "payments", icon: <FaHouseUser />, title: "Payments" },
  { key: "payment-history", icon: <FaHouseUser />, title: "Payment History" },
  {
    key: "reports",
    icon: <FaHouseUser />,
    title: "Reports",
    subMenu: [
      { key: "financial", icon: <FaHouseUser />, title: "Financial" },
      {
        key: "student-performance",
        icon: <FaHouseUser />,
        title: "Student Performance",
      },
    ],
  },
  { key: "students", icon: <HiMiniUserGroup />, title: "Students" },
  { key: "subjects", icon: <FaHouseUser />, title: "Subjects" },
  { key: "submissions", icon: <FaHouseUser />, title: "Submissions" },
  { key: "teachers", icon: <GiTeacher />, title: "Teachers" },
  { key: "timetable", icon: <FaHouseUser />, title: "Timetable" },
  { key: "virtual-classes", icon: <FaHouseUser />, title: "Virtual Classes" },
];
