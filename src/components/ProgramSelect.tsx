type ProgramSelectProps = {
    categoryName: string;  // フォームのname属性用
    categoryLabel: string;  // 表示用の日本語ラベル
    options: string[];  // 選択肢リスト
    selectedValue: string;  // 初期表示される選択された値
}

export default function ProgramSelect({ categoryName, categoryLabel, options, selectedValue }: ProgramSelectProps) {
    return (
        <fieldset className="mb-6">
            <legend className="text-lg font-semibold mb-2">{categoryLabel}部門</legend>
            <select
                name={categoryName}
                id={categoryName}
                defaultValue={selectedValue}  // 初期表示される選択された値
                className="w-full px-4 py-2 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">選択してください</option>
                {options.map((option) => (
                    <option key={option} value={option} className="cursor-pointer">
                        {option}
                    </option>
                ))}
            </select>
        </fieldset>
    );
}
