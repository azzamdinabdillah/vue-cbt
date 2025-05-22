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
  name: string;
  category: string;
  level: string;
  image: string;
  created_at: Date;
}
