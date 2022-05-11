export interface Iuser {
  name: string;
  emailId: string;
  password: string;
  id: string;
}

export interface Ibook {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  authId: string
}

export interface Ireview {
  review: string;
  createdAt: string;
  userId: string;
  bookId: string;
  id: string;
}