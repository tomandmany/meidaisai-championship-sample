// app/components/Multiple/multiple-mc-form-filter.tsx

'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ListFilter, X } from "lucide-react"
import FilterSection from "@/components/mc/mc-filter-section"
import { ScrollArea, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from '@radix-ui/react-scroll-area'

interface MultipleMcFormFilterProps {
    types: string[]
    filters: {
        types: Set<string>
        places: Set<string>
        genres: Set<string>
    }
    updateFilter: (type: 'types' | 'places' | 'genres', value: string) => void
    resetFilter: (type: 'types' | 'places' | 'genres') => void
}

const places = ["第一校舎", "メディア棟", "第二学生会館", "和泉ラーニングスクエア", "エントランスエリア", "メインステージ", "パフォーマンスエリア", "その他"];
const genres = ["食べ物", "飲み物", "雑貨", "ゲーム", "音楽", "パフォーマンス"];

export default function MultipleMcFormFilter({
    types,
    filters,
    updateFilter,
    resetFilter
}: MultipleMcFormFilterProps) {

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const togglePopover = () => setIsPopoverOpen(!isPopoverOpen)

    return (
        <Popover open={isPopoverOpen} onOpenChange={togglePopover}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-fit px-3" onClick={togglePopover}>
                    {isPopoverOpen ? <X /> : <ListFilter />}
                    <span className='hidden sm:inline'>
                        {isPopoverOpen ? '閉じる' : '絞り込む'}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-6 w-[350px]">
                <ScrollArea className="h-[500px] relative">
                    <ScrollAreaViewport className="h-full w-full">
                        <FilterSection
                            label="企画区分"
                            items={types}
                            selectedItems={filters.types}
                            onChange={(value) => updateFilter('types', value)}
                            onReset={() => resetFilter('types')}
                        />
                        <FilterSection
                            label="場所"
                            items={places}
                            selectedItems={filters.places}
                            onChange={(value) => updateFilter('places', value)}
                            onReset={() => resetFilter('places')}
                        />
                        <FilterSection
                            label="ジャンル"
                            items={genres}
                            selectedItems={filters.genres}
                            onChange={(value) => updateFilter('genres', value)}
                            onReset={() => resetFilter('genres')}
                        />
                    </ScrollAreaViewport>
                    <ScrollAreaScrollbar orientation="vertical">
                        <ScrollAreaThumb className="bg-gray-300 rounded" />
                    </ScrollAreaScrollbar>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}
