import { Pokemon } from "@/lib/types/pokemon";

const AboutContent = ({ data }: { data: Pokemon }) => {
    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <InfoRow label="Species" value={data.species.name} />
                <InfoRow label="Height" value={data.height} />
                <InfoRow label="Weight" value={data.weight} />
                <InfoRow label="Abilities" value={data.abilities.map((ability) => ability.ability.name).join(', ')} />
            </div>

            <div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">Breeding</h3>
                <div className="space-y-1">
                    <InfoRow label="Gender" value={data.gender ? (
                        <span className="flex items-center gap-2">
                            <span className="text-blue-500">♂</span> {data.gender.male}, <span className="text-pink-500">♀</span> {data.gender.female}
                        </span>
                    ) : "Unknown"} />
                    <InfoRow label="Egg Groups" value={data.egg_groups || "Unknown"} />
                    <InfoRow label="Egg Cycle" value={"Unknown"} />
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ label, value }: { label: string; value: string | number | React.ReactNode }) => {
    return (
        <div className="flex justify-between items-center">
            <div className="w-[40%] lg:w-auto">
                <span className="text-gray-400 font-semibold text-sm lg:text-lg">{label}:</span>
            </div>
            <div className="w-[60%] lg:w-auto">
                <span className="text-gray-800 font-medium capitalize text-sm lg:text-lg">{value}</span>
            </div>
        </div>
    );
};

export default AboutContent;