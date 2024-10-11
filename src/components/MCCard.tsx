interface MCCardProps {
    children: React.ReactNode;
}

export default function MCCard({ children }: MCCardProps) {
    return (
        <div className="bg-white rounded-3xl shadow-lg text-center p-12 space-y-8">
            {children}
        </div>
    )
}