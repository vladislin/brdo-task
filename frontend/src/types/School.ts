export type SchoolType = "ГІМНАЗІЯ" | "ЛІЦЕЙ" | "ЗЗСО";

export interface School {
    id: number;
    name: string;
    edrpou: string;
    region: string;
    type: SchoolType;
    active: boolean;
}