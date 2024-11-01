import { Tables } from './supabase.types';

declare global {
  type Vote = Tables<'votes'>;
  type User = Tables<'users'>;

  type Program = {
    id: string;
    department: string;
    group: string;
    title: string;
    catch: string;
    detail: string;
    genre: string;
    place: string;
    room: string;
    date: string;
    status: string[];
    insta: string;
    x: string;
    tiktok: string;
    hp: string;
    keyword: string;
  };
  
  // type Program = {
  //   id: string;
  //   department: string;
  //   group: string;
  //   title: string;
  //   catch: string;
  //   detail: string;
  //   genre: string;
  //   place: string;
  //   room: string;
  //   date: string;
  //   status: string[];
  //   insta: string;
  //   x: string;
  //   tiktok: string;
  //   hp: string;
  // };

  // type Vote = {
  //   projectId: string;
  // }
}
