import { ChevronDown } from "lucide-react";
import DescriptionLabel from "./DescriptionLabel";

type ProgramSelectProps = {
    categoryName: string;  // フォームのname属性用
    categoryLabel: string;  // 表示用の日本語ラベル
    options: string[];  // 選択肢リスト
    selectedValue: string;  // 初期表示される選択された値
}

export default function ProgramSelect({ categoryName, categoryLabel, options, selectedValue }: ProgramSelectProps) {
    return (
        <fieldset className="space-y-2 relative">
            <DescriptionLabel title={`${categoryLabel}部門`} />
            <div className="relative">
                <select
                    name={categoryName}
                    id={categoryName}
                    defaultValue={selectedValue}  // 初期表示される選択された値
                    className="w-full pl-4 pr-16 py-2 border-2 border-[#F2A09D] rounded-lg cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#83CAEF] focus:border-transparent appearance-none"
                >
                    <option value="">選択してください</option>
                    {options.map((option) => (
                        <option key={option} value={option} className="cursor-pointer">
                            {option}
                        </option>
                    ))}
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none bg-[#83CAEF] rounded-full border-2 border-[#CCEEFF]">
                    <ChevronDown className="relative top-px text-white" />
                </div>
            </div>
        </fieldset>
    );
}