import { redirect } from "next/navigation";

export default async function page() {
  redirect(`${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL}`);
};