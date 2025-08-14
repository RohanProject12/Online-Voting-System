// Authentication utilities for the voting system
export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hasVoted?: boolean; // Only relevant for students
}

// Mock user data
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@voting.edu',
    role: 'admin'
  },
  {
    id: '2',
    name: 'John Student',
    email: 'john@student.edu',
    role: 'student',
    hasVoted: false
  },
  {
    id: '3',
    name: 'Jane Student',
    email: 'jane@student.edu',
    role: 'student',
    hasVoted: true
  }
];

export const login = (email: string, password: string): User | null => {
  const user = MOCK_USERS.find(u => u.email === email);
  if (user && password === 'password') { // Simple mock validation
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', user.role);
    return user;
  }
  return null;
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const getUserRole = (): UserRole | null => {
  return localStorage.getItem('role') as UserRole | null;
};

export const logout = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('role');
};

export const markAsVoted = (): void => {
  const user = getCurrentUser();
  if (user && user.role === 'student') {
    user.hasVoted = true;
    localStorage.setItem('user', JSON.stringify(user));
  }
};