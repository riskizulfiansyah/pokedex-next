import { Progress } from "@/lib/types/type";

const ProgressBar = ({ value, max = 100 }: Progress) => {
    const percentage = (value / max) * 100;
    const color = value >= 60 ? 'bg-green-500' : 'bg-red-400';

    return (
        <div className="flex-1 bg-gray-200 rounded-full h-1 overflow-hidden">
            <div
                className={`h-full ${color} transition-all duration-300`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
            />
        </div>
    );
};

export default ProgressBar;