type roles = "student" | "teacher";
export interface CollectionUserIF {
  role: roles;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}
