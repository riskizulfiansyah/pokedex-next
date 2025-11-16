import { TabsType } from "@/lib/types/type";

const Tabs = ({ tabs, activeTab, onTabChange }: TabsType) => {
    return (
        <div className="flex border-b border-gray-200 justify-between">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`tab-options ${activeTab === tab
                        ? 'text-gray-800'
                        : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    {tab}
                    {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                    )}
                </button>
            ))}
        </div>
    );
};

export default Tabs