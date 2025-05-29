type roles = "student" | "teacher";
export interface CollectionUserIF {
  role: roles;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  confirmPassword?: string;
}

export interface CollectionCourseIF {
  id?: string;
  name: string;
  category: string;
  level: string;
  image?: string;
  created_at?: Date;
}

export interface CollectionQuestionIF {
  id?: string;
  question: string;
  course_id?: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_option: string;
  created_at?: Date;
}

export interface CollectionStudentCourseIF {
  id?: string;
  user_id: string;
  course_id: string;
  result?: string;
  is_passed?: boolean;
  created_at?: Date;
}
