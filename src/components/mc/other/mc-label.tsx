// app/components/mc/other/mc-label.tsx

interface MCLabelProps {
    children: React.ReactNode;
}

export default function MCLabel({ children }: MCLabelProps) {
    return (
        <h3 className="rounded-tr-2xl rounded-bl-2xl bg-[#F2A09D] border-[#FFCECC] border-[3px] max-w-fit px-3 py-1 text-white">
            {children}
        </h3>
    )
}