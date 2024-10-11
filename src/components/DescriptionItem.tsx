import DescriptionLabel from "./DescriptionLabel";

interface DescriptionItemProps {
    title: string;
    children: React.ReactNode;
}

export default function DescriptionItem({ title, children }: DescriptionItemProps) {
    return (
        <div className='space-y-2'>
            <DescriptionLabel title={title} />
            <p className="text-left">{children}</p>
        </div>
    )
}