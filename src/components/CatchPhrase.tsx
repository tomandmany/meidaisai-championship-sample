// app/components/CatchPhrase.tsx

import Image from "next/image";

export default function CatchPhrase() {
    return (
        <div className={`fixed top-20 xl:top-16 left-4 xl:left-0 w-[30vw] max-w-full hidden lg:block lg:w-[200px] xl:w-[350px] z-mc-catchphrase`}>
            <div
                className="relative mb-[1vw] inline-block w-full"
                style={{ aspectRatio: '12 / 7' }}
            >
                <Image
                    src={'/votes/logo.svg'}
                    alt="ロゴ"
                    fill
                    className="object-contain"
                />
            </div>
            <div className="text-center">
                <h3 className="text-[#E07494] lg:text-sm xl:text-2xl font-bold leading-tight sm:leading-8">
                    明大祭のチャンピオンに
                    <br />
                    輝くのは一体誰だ！
                </h3>
            </div>
        </div>
    );
}
