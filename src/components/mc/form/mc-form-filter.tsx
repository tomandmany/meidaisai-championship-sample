// app/components/mc/form/mc-form-filter.tsx

'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ListFilter, X } from "lucide-react"
import MCFormFilterSection from "@/components/mc/form/mc-form-filter-section"

interface MCFormFilterProps {
    departments: string[]
    filters: {
        departments: Set<string>
        places: Set<string>
        genres: Set<string>
    }
    updateFilter: (type: 'departments' | 'places' | 'genres', value: string) => void
    resetFilter: (type: 'departments' | 'places' | 'genres') => void
}

const places = ["第一校舎", "メディア棟", "和泉ラーニングスクエア", "エントランスエリア", "メインステージ", "パフォーマンスエリア", "その他"];
const genres = ["食べ物", "参加体験", "物品販売", "ダンス", "音楽", "パフォーマンス", "ゲスト", "展示発表", "喫茶"];

export default function MCFormFilter({
    departments,
    filters,
    updateFilter,
    resetFilter
}: MCFormFilterProps) {

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const togglePopover = () => setIsPopoverOpen(!isPopoverOpen)

    return (
        <Popover open={isPopoverOpen} onOpenChange={togglePopover}>
            <PopoverTrigger asChild>
                <Button variant="outline" className={`w-fit px-3 bg-white ${isPopoverOpen && 'border-black'}`} onClick={togglePopover}>
                    {isPopoverOpen ? <X /> : <ListFilter />}
                    <span className='hidden sm:inline'>
                        {isPopoverOpen ? '閉じる' : '絞り込む'}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-6 w-[350px]">
                <div className="h-fit relative flex flex-col gap-4">
                    <MCFormFilterSection
                        label="企画区分"
                        items={departments}
                        selectedItems={filters.departments}
                        onChange={(value) => updateFilter('departments', value)}
                        onReset={() => resetFilter('departments')}
                    />
                    <MCFormFilterSection
                        label="場所"
                        items={places}
                        selectedItems={filters.places}
                        onChange={(value) => updateFilter('places', value)}
                        onReset={() => resetFilter('places')}
                    />
                    <MCFormFilterSection
                        label="ジャンル"
                        items={genres}
                        selectedItems={filters.genres}
                        onChange={(value) => updateFilter('genres', value)}
                        onReset={() => resetFilter('genres')}
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
}
