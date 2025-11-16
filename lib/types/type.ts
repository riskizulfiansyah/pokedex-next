export type BasicResource = {
    name: string;
    url: string;
};

export type Progress = {
    value: number;
    max: number;
}

export type TabsType = {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}
