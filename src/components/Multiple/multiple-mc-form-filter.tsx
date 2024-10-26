// app/components/Multiple/multiple-mc-form-filter.tsx

'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ListFilter, X } from "lucide-react"
import FilterSection from "@/components/Multiple/filter-section"

interface MultipleMcFormFilterProps {
    departments: string[]
    locations: string[]
    genres: string[]
    filters: {
        departments: Set<string>
        locations: Set<string>
        genres: Set<string>
    }
    updateFilter: (type: 'departments' | 'locations' | 'genres', value: string) => void
    resetFilter: (type: 'departments' | 'locations' | 'genres') => void
}

export default function MultipleMcFormFilter({ 
    departments, 
    locations, 
    genres, 
    filters, 
    updateFilter, 
    resetFilter 
}: MultipleMcFormFilterProps) {
    
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const togglePopover = () => setIsPopoverOpen(!isPopoverOpen)

    return (
        <Popover 
            open={isPopoverOpen} 
            onOpenChange={togglePopover}
        >
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-fit px-3" onClick={togglePopover}>
                    {isPopoverOpen ? <X /> : <ListFilter />}
                    <span className='hidden sm:inline'>
                        {isPopoverOpen ? '閉じる' : '絞り込む'}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-6">
                <FilterSection
                    label="企画区分"
                    items={departments}
                    selectedItems={filters.departments}
                    onChange={(value) => updateFilter('departments', value)}
                    onReset={() => resetFilter('departments')}
                />
                <FilterSection
                    label="場所"
                    items={locations}
                    selectedItems={filters.locations}
                    onChange={(value) => updateFilter('locations', value)}
                    onReset={() => resetFilter('locations')}
                />
                <FilterSection
                    label="ジャンル"
                    items={genres}
                    selectedItems={filters.genres}
                    onChange={(value) => updateFilter('genres', value)}
                    onReset={() => resetFilter('genres')}
                />
            </PopoverContent>
        </Popover>
    )
}
