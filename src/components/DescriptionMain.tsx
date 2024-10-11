interface DescriptionMainProps {
    children: React.ReactNode;
}

export default function DescriptionMain({ children }: DescriptionMainProps) {
    return (
        <h1 className="text-2xl font-bold mb-4 text-center leading-10">
            {children}
        </h1>
    )
}