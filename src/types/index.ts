export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface ConsecutiveDetail {
  id: string;
  category: string;
  date: string;
  codes: string[];
  user: string;
  equipment: string;
  image: string;
}

export interface GeneratedConsecutive {
  category: Category;
  detail: ConsecutiveDetail;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  avatar?: string;
}