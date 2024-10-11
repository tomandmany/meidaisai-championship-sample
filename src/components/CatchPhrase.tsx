import Image from "next/image";

export default function CatchPhrase() {
    return (
        <div className="fixed top-5 left-5 w-80">
            <div className="relative mb-6 inline-block w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl" style={{ aspectRatio: '12 / 7' }}>
                <Image
                    src={'/votes/logo.svg'}
                    alt="ロゴ"
                    fill
                    className="object-contain"
                />
            </div>
            <div className="text-center">
                <h3 className="text-[#E07494] text-xl font-bold leading-8">
                    明大祭のチャンピオンに
                    <br />
                    輝くのは一体誰だ！
                </h3>
            </div>
        </div>
    )
}