interface MCCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function MCCard({ children, className }: MCCardProps) {
    return (
        <div className={`bg-white rounded-3xl shadow-lg text-center p-12 space-y-8 ${className}`}>
            {children}
        </div>
    )
}