import { redirect } from "next/navigation";

export default async function page() {
  redirect('/votes/champ');
};