interface DescriptionLabelProps {
    title: string;
}

export default function DescriptionLabel({ title }: DescriptionLabelProps) {
    return (
        <h6 className="rounded-tr-2xl rounded-bl-2xl bg-[#F2A09D] border-[#FFCECC] border-[3px] max-w-fit px-3 py-1 text-white">
            {title}
        </h6>
    )
}