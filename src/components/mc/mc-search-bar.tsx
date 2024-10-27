import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}

export default function SearchBar({searchTerm, setSearchTerm}: SearchBarProps) {
    return (
        <div className="relative flex-grow">
            <Label htmlFor="search" className="sr-only">企画を検索</Label>
            <Input
                id="search"
                type="text"
                placeholder="検索する"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
            />
            <Search className="absolute right-2 top-2 h-5 w-5" />
        </div>
    )
}