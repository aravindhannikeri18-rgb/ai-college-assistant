/**
 * College Information Database & Knowledge Base
 * KLE Society's College of BCA, Gokak
 */

export interface Subject {
  id: number;
  name: string;
  code: string;
  type: 'Theory' | 'Theory + Practical' | 'Compulsory';
  credits: number;
  description: string;
  topics: string[];
}

export interface StaffMember {
  id: number;
  name: string;
  designation: string;
  qualification: string;
  specialization: string;
  experience: string;
  email: string;
  image: string;
}

export const COLLEGE_INFO = {
  name: "KLE Society’s College of BCA, Gokak",
  shortName: "KLE BCA College Gokak",
  tagline: "Empowering Education for a Better Tomorrow",
  established: "2008",
  affiliation: "Rani Channamma University (RCU), Belagavi",
  recognizedBy: "Government of Karnataka",
  principal: "Mr. Prashant Kivati",
  coordinator: "Mr. Malakajan Bagavan",
  staffCount: 6,
  studentCount1stSem: 180,
  bcaFullName: "Bachelor of Computer Applications",
  contactNumber: "101-334-433",
  email: "info@klebca.ac.in",
  website: "www.klebca.ac.in",
  location: "Gokak, near Bellikata, in front",
  city: "Gokak",
  district: "Belagavi",
  state: "Karnataka",
  pincode: "591307",
  timings: "9:00 AM – 4:30 PM (Mon - Sat)",
  facilities: [
    "High-speed Computer Labs with 100+ Systems",
    "Digital Library & E-Learning Resource Center",
    "Smart Interactive Classrooms & Projectors",
    "Placement & Career Guidance Cell",
    "Sports Ground & Indoor Recreation",
    "Wi-Fi Enabled Campus"
  ],
  stats: [
    { label: "1st Sem Students", value: "180" },
    { label: "Faculty & Staff", value: "6" },
    { label: "Computer Labs", value: "3" },
    { label: "Placement Rate", value: "92%" }
  ]
};

export const BCA_FIRST_SEM_SUBJECTS: Subject[] = [
  {
    id: 1,
    name: "Kannada",
    code: "BCA101",
    type: "Compulsory",
    credits: 3,
    description: "Language literature, functional Kannada for communication, and Karnataka cultural heritage.",
    topics: ["Classical & Modern Poetry", "Short Stories & Drama", "Official Kannada Communication", "Grammar & Vocabulary"]
  },
  {
    id: 2,
    name: "English",
    code: "BCA102",
    type: "Theory",
    credits: 3,
    description: "Communicative English, technical writing skills, comprehension, and corporate presentation abilities.",
    topics: ["Phonetics & Pronunciation", "Technical Report Writing", "Business Correspondence", "Reading Comprehension & Essays"]
  },
  {
    id: 3,
    name: "C Programming",
    code: "BCA103",
    type: "Theory + Practical",
    credits: 4,
    description: "Core programming fundamentals, control structures, functions, arrays, pointers, and memory management.",
    topics: ["Data Types & Operators", "Control Statements & Loops", "Arrays & String Handling", "Functions & Recursion", "Pointers & Dynamic Allocation", "Structures & File I/O"]
  },
  {
    id: 4,
    name: "DBMS (Database Management System)",
    code: "BCA104",
    type: "Theory + Practical",
    credits: 4,
    description: "Relational database concepts, ER modeling, SQL querying, normalization, and transaction processing.",
    topics: ["Database Architecture & Models", "ER & Relational Modeling", "SQL DDL, DML & Join Operations", "Normalization (1NF, 2NF, 3NF, BCNF)", "Transaction ACID Properties & Recovery"]
  },
  {
    id: 5,
    name: "Mathematics-I",
    code: "BCA105",
    type: "Theory",
    credits: 4,
    description: "Discrete and foundational mathematics for computing, matrices, calculus, and mathematical logic.",
    topics: ["Matrix Algebra & Determinants", "Differential & Integral Calculus", "Set Theory & Relations", "Boolean Algebra & Logic Gates", "Coordinate Geometry"]
  },
  {
    id: 6,
    name: "Indian Constitution",
    code: "BCA106",
    type: "Compulsory",
    credits: 2,
    description: "Foundations of Indian democratic governance, fundamental rights, duties, and federal structure.",
    topics: ["Preamble & Historical Background", "Fundamental Rights & Duties", "Directive Principles of State Policy", "Union & State Executive & Legislature", "Judiciary & Constitutional Amendments"]
  }
];

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: 1,
    name: "Mr. Prashant Kivati",
    designation: "Principal",
    qualification: "M.Sc. (Comp. Sci.), M.Phil.",
    specialization: "Advanced Computing, Institution Leadership & Algorithm Design",
    experience: "18+ Years",
    email: "principal@klebca.ac.in",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "Mr. Malakajan Bagavan",
    designation: "College Coordinator & HOD",
    qualification: "MCA, M.Tech",
    specialization: "Database Systems, Software Engineering & Student Mentorship",
    experience: "14+ Years",
    email: "coordinator@klebca.ac.in",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "Prof. S. N. Patil",
    designation: "Assistant Professor",
    qualification: "M.Tech (CSE)",
    specialization: "C Programming, Data Structures & Algorithm Analysis",
    experience: "9+ Years",
    email: "snpatil@klebca.ac.in",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    name: "Prof. P. M. Kulkarni",
    designation: "Assistant Professor",
    qualification: "MCA",
    specialization: "DBMS, SQL, Web Technologies & Cloud Fundamentals",
    experience: "7+ Years",
    email: "pmkulkarni@klebca.ac.in",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 5,
    name: "Prof. R. B. Joshi",
    designation: "Assistant Professor",
    qualification: "M.Sc. (Applied Mathematics)",
    specialization: "Discrete Mathematics, Numerical Methods & Logic",
    experience: "11+ Years",
    email: "rbjoshi@klebca.ac.in",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 6,
    name: "Prof. V. K. Desai",
    designation: "Lecturer & Cultural Coordinator",
    qualification: "M.A., B.Ed, PGDCA",
    specialization: "Communicative English, Kannada Literature & Student Welfare",
    experience: "8+ Years",
    email: "vkdesai@klebca.ac.in",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
  }
];

export const SUGGESTED_QUESTIONS = [
  "Who is your college principal?",
  "Who is the college coordinator?",
  "How many staff members are there?",
  "What is the full form of BCA?",
  "How many students are in 1st semester BCA?",
  "What is the name of your college?",
  "What are the BCA 1st semester subjects?",
  "What is the college contact number?",
  "Where is the college located?"
];

/**
 * Smart Question Matching Engine
 * Matches varied phrasing and synonyms to authoritative college answers.
 */
export function matchQuestion(query: string): { answer: string; category: string; followUps?: string[] } {
  const clean = query.trim().toLowerCase();

  // 1. Wake phrase greeting
  if (
    clean === "hey dude" ||
    clean === "hi dude" ||
    clean === "hello dude" ||
    clean === "hey bot" ||
    clean === "hello" ||
    clean === "hi" ||
    clean.startsWith("hey dude")
  ) {
    if (clean === "hey dude" || clean === "hi dude" || clean === "hello dude") {
      return {
        answer: "Hey! I’m listening. How can I help you? Ask me about our principal, coordinator, subjects, staff, or college info!",
        category: "Greeting",
        followUps: ["Who is your college principal?", "What are the BCA 1st semester subjects?"]
      };
    }
  }

  // 2. Principal
  if (
    clean.includes("principal") ||
    clean.includes("head of college") ||
    clean.includes("director") ||
    clean.includes("prashant") ||
    clean.includes("kivati")
  ) {
    return {
      answer: "The principal of our college is Mr. Prashant Kivati.",
      category: "Administration",
      followUps: ["Who is the college coordinator?", "How many staff members are there?"]
    };
  }

  // 3. Coordinator
  if (
    clean.includes("coordinator") ||
    clean.includes("co-ordinator") ||
    clean.includes("hod") ||
    clean.includes("malakajan") ||
    clean.includes("bagavan")
  ) {
    return {
      answer: "The college coordinator is Mr. Malakajan Bagavan.",
      category: "Administration",
      followUps: ["Who is your college principal?", "How many staff members are there?"]
    };
  }

  // 4. Staff members
  if (
    clean.includes("staff") ||
    clean.includes("faculty") ||
    clean.includes("teachers") ||
    clean.includes("professors") ||
    clean.includes("how many staff") ||
    clean.includes("lecturers")
  ) {
    return {
      answer: "There are 6 staff members in our college, dedicated to quality technical education and student guidance.",
      category: "Staff",
      followUps: ["Who is your college principal?", "Who is the college coordinator?"]
    };
  }

  // 5. BCA Full Form
  if (
    clean.includes("full form") ||
    clean.includes("fullform") ||
    clean.includes("stand for") ||
    clean.includes("meaning of bca") ||
    clean.includes("what is bca") ||
    clean.includes("bca abbreviation")
  ) {
    return {
      answer: "BCA stands for Bachelor of Computer Applications.",
      category: "Academics",
      followUps: ["What are the BCA 1st semester subjects?", "How many students are in 1st semester BCA?"]
    };
  }

  // 6. Student count in 1st semester
  if (
    clean.includes("students") ||
    clean.includes("how many students") ||
    clean.includes("student count") ||
    clean.includes("strength") ||
    clean.includes("intake") ||
    clean.includes("admissions")
  ) {
    return {
      answer: "There are 180 students in the 1st semester BCA.",
      category: "Students",
      followUps: ["What are the BCA 1st semester subjects?", "Who is your college principal?"]
    };
  }

  // 7. College Name
  if (
    clean.includes("name of your college") ||
    clean.includes("college name") ||
    clean.includes("what is your college") ||
    clean.includes("which college") ||
    clean.includes("institution name")
  ) {
    return {
      answer: "The name of our college is KLE Society’s College of BCA, Gokak.",
      category: "College Info",
      followUps: ["Where is the college located?", "What is the college contact number?"]
    };
  }

  // 8. BCA 1st semester subjects
  if (
    clean.includes("subject") ||
    clean.includes("syllabus") ||
    clean.includes("course content") ||
    clean.includes("1st sem") ||
    clean.includes("first sem") ||
    clean.includes("first semester") ||
    clean.includes("curriculum")
  ) {
    return {
      answer: "The subjects are Kannada, English, C Programming, DBMS, Mathematics-I and Indian Constitution.",
      category: "Syllabus",
      followUps: ["Tell me about C Programming", "Tell me about DBMS"]
    };
  }

  // 9. Contact number / phone
  if (
    clean.includes("contact") ||
    clean.includes("phone") ||
    clean.includes("mobile") ||
    clean.includes("call") ||
    clean.includes("number") ||
    clean.includes("helpline")
  ) {
    return {
      answer: "The college contact number is 101-334-433.",
      category: "Contact",
      followUps: ["Where is the college located?", "What is the name of your college?"]
    };
  }

  // 10. Location / Address
  if (
    clean.includes("location") ||
    clean.includes("located") ||
    clean.includes("where") ||
    clean.includes("address") ||
    clean.includes("bellikata") ||
    clean.includes("gokak") ||
    clean.includes("place")
  ) {
    return {
      answer: "Our college is located in Gokak, near Bellikata, in front.",
      category: "Location",
      followUps: ["What is the college contact number?", "What is the name of your college?"]
    };
  }

  // Specific Subject Inquiries
  if (clean.includes("c programming") || clean.includes("programming in c")) {
    return {
      answer: "C Programming (BCA103) is a 4-credit core subject with both theory and practical lab. Topics include data types, control flow, functions, arrays, pointers, dynamic memory allocation, and structures.",
      category: "Syllabus",
      followUps: ["What are the BCA 1st semester subjects?", "Who teaches C programming?"]
    };
  }

  if (clean.includes("dbms") || clean.includes("database")) {
    return {
      answer: "DBMS - Database Management System (BCA104) is a 4-credit course covering ER modeling, Relational Algebra, SQL queries, normalization (1NF to BCNF), and ACID transaction properties.",
      category: "Syllabus",
      followUps: ["What are the BCA 1st semester subjects?", "Who is the college coordinator?"]
    };
  }

  if (clean.includes("math") || clean.includes("mathematics")) {
    return {
      answer: "Mathematics-I (BCA105) covers discrete and foundation mathematics essential for computer science: matrices, calculus, coordinate geometry, set theory, and boolean logic.",
      category: "Syllabus"
    };
  }

  if (clean.includes("kannada")) {
    return {
      answer: "Kannada (BCA101) is a 3-credit compulsory language subject focusing on classical/modern literature, functional Kannada communication, and cultural heritage.",
      category: "Syllabus"
    };
  }

  if (clean.includes("english")) {
    return {
      answer: "English (BCA102) is a 3-credit course covering communicative English, technical writing skills, corporate presentations, and reading comprehension.",
      category: "Syllabus"
    };
  }

  if (clean.includes("constitution")) {
    return {
      answer: "Indian Constitution (BCA106) is a 2-credit subject introducing fundamental rights, duties, directive principles, and the democratic federal structure of India.",
      category: "Syllabus"
    };
  }

  // Facilities / Campus
  if (clean.includes("facilities") || clean.includes("lab") || clean.includes("library") || clean.includes("wifi")) {
    return {
      answer: "KLE BCA Gokak provides high-speed Computer Labs with 100+ systems, a Digital Library, Smart Interactive Classrooms, Wi-Fi campus, and an active Placement Cell.",
      category: "Campus"
    };
  }

  // Timings
  if (clean.includes("timing") || clean.includes("time") || clean.includes("hours") || clean.includes("open")) {
    return {
      answer: "College hours are 9:00 AM to 4:30 PM, Monday through Saturday.",
      category: "College Info"
    };
  }

  // Default fallback according to specification
  return {
    answer: "Sorry, I don't have that information yet. Please ask me about our college, BCA courses, subjects, staff, students or contact information.",
    category: "General",
    followUps: [
      "Who is your college principal?",
      "What are the BCA 1st semester subjects?",
      "Where is the college located?"
    ]
  };
}
