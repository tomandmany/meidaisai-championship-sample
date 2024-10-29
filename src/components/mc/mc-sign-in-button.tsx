import Link from "next/link";

export default function MCSignInButton() {
    return (
        <Link
            href={`${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL}/sign-in`}
            className="block px-4 py-3 rounded-md w-fit mx-auto text-white bg-[#E07594] hover:bg-[#c56681]"
            // className="mt-4 mx-auto block w-fit px-4 py-2 bg-[#F2A09D] hover:bg-[#E07494] text-white rounded-lg shadow-[3px_3px_0_#E07494] hover:shadow-none hover:relative hover:top-1 hover:left-1"
        >
            ログインする
        </Link>
    )
}