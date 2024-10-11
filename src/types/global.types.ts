import { Tables } from './supabase.types';

declare global {
  type Vote = Tables<'votes'>;
  type User = Tables<'users'>;
}
