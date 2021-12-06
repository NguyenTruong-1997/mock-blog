export interface Authentication {
  user: {
    email: string;
    password: string;
  };
}

export interface FormLogin {
  email: string;
  password: string;
}

export interface Registration {
  user:  {
    username: string;
    email: string;
    password: string;
  };
}

export interface FormRegistration {
  username: string;
  email: string;
  password: string;
}

export interface GetUser {
  user: User;
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string | null;
}

export interface UpdateUser {
  user:  {
    email: string;
    bio: string;
    image: string;
  };
}

export interface FormUpdateUser {
  email: string;
  bio: string;
  image: string;
}