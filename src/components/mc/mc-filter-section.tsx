import { Grid2x2, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

type FilterSectionProps = {
    label: string
    items: string[]
    selectedItems: Set<string>
    onChange: (value: string) => void
    onReset: () => void
}

export default function FilterSection({ label, items, selectedItems, onChange, onReset }: FilterSectionProps) {
    let labelIcon;

    switch (label) {
        case '企画区分':
            labelIcon = <Users size={18} className='mr-1' />
            break;
        case '場所':
            labelIcon = <MapPin size={18} className='mr-1' />
            break;
        case 'ジャンル':
            labelIcon = <Grid2x2 size={18} className='mr-1' />
            break;
    }

    return (
        <div className="mb-4">
            <div className='flex items-center mb-2'>
                {labelIcon}
                <h3 className="font-semibold">{label}</h3>
                <Button
                    variant='outline'
                    size='sm'
                    className={`ml-auto transition-transform ${selectedItems.size === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
                    onClick={onReset}
                >
                    リセット
                </Button>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
                {items.map(item => (
                    <button
                        key={item}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer
                ${selectedItems.has(item) ? 'bg-[#E07594] text-white' : 'sm:hover:bg-[#E07594]/20'}`}
                        onClick={() => onChange(item)}
                    >
                        <span className="flex-grow">{item}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}