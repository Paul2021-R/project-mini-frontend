export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'guest' | 'stargazer' | 'protostar';
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  title: string;
  lastMessage?: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
