"use client"

import { BarChart, Book, BookMarked, Compass, Layout, List } from 'lucide-react'
import React from 'react'
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: '/',
  },
  {
    icon: Compass,
    label: "Browse",
    href: '/search',
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: '/teacher/courses',
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: '/teacher/analytics',
  },
  {
    icon: Book,
    label: "Mentor",
    href: '/teacher/mentor',
  },
  {
    icon: BarChart,
    label: "Students",
    href: '/teacher/students',
  },
  {
    icon: BookMarked,
    label: "Attendence",
    href: '/teacher/attendence',
  },
]

const SidebarRoutes = () => {

  const pathName = usePathname();
  const isTeacherPage = pathName?.includes("/teacher")
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className='flex flex-col w-full'>
      {routes.map(({icon, label, href}) => (
        <SidebarItem 
          key={href}
          icon={icon}
          label={label}
          href={href}
        />
      ))}
    </div>
  )
}

export default SidebarRoutes