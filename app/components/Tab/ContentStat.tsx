import ProgressBar from "../Progress";
import { useParams } from "next/navigation";
import { shortenText } from "@/lib/helper";

const BaseStatsContent = ({ stats }: { stats: { name: string; base_state: number }[] }) => {
    const params = useParams();
    const pokemonName = params.slug;
    return (
        <div className="space-y-2">
            {stats.map((stat, index) => (
                <StatRow key={index} {...stat} />
            ))}

            <div className="pt-4 mt-4 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Type defenses</h3>
                <p className="text-gray-500 text-sm capitalize">
                    The effectiveness of each type on {pokemonName || 'this Pokemon'}.
                </p>
            </div>
        </div>
    );
};

const StatRow = ({ name, base_state }: { name: string; base_state: number }) => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-gray-500 w-15 text-sm capitalize">{shortenText(name)}</span>
            <span className="text-gray-800 font-semibold w-12 text-sm text-right">{base_state}</span>
            <ProgressBar value={base_state} max={100} />
        </div>
    );
};

export default BaseStatsContent;