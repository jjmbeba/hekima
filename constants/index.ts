import {Book, BookPlus, BookType, Home, Logs, MessageSquareText, NotebookPen, School, Users} from "lucide-react";

export const sidebarLinks = [
    {
        name: "Dashboard",
        href: '/dashboard',
        icon: Home,
        accessibleTo: ["admin", "student", "parent", "teacher"]
    },
    {
        name: "Grades",
        href: "/grades",
        icon: Book,
        accessibleTo: ["admin", "student", "parent"],
    },
    {
        name: "Upload Grades",
        href: "/grades/upload",
        icon: BookPlus,
        accessibleTo: ["teacher"]
    },
    {
        name: "Classes Overview",
        href: "/classes",
        icon: School,
        accessibleTo: ["teacher", "admin"]
    },
    {
        name:"Subjects",
        href:"/subjects",
        icon:BookType,
        accessibleTo: ['teacher', "admin"]
    },
    {
        name:"Assessments",
        href:"/assessments",
        icon:NotebookPen,
        accessibleTo: ["teacher", "admin"]
    },
    {
        name:"Audit logs",
        href: "/audit-logs",
        icon:Logs,
        accessibleTo: ["admin","teacher"]
    },
    {
        name:"Users",
        href:"/users",
        icon:Users,
        accessibleTo: ["admin"]
    },
    {
        name:"Notifications",
        href:"/notifications",
        icon:MessageSquareText,
        accessibleTo: ["student","parent","teacher", "admin"]
    }
]