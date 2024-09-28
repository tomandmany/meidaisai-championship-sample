import { Tables } from './supabase.types';

declare global {
  type Vote = Tables<'votes'>;
}
