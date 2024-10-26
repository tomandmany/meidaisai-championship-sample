import { Tables } from './supabase.types';

declare global {
  // type Vote = Tables<'votes'>;
  // type User = Tables<'users'>;

  type Project = {
    id: string;
    name: string;
    description: string;
    department: string;
    day: string;
    location: string;
    genre: string;
  }
  
  type Vote = {
    projectId: string;
  }
}
