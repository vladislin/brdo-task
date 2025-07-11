import type { SchoolType } from "./School.ts";

export type SchoolFilter = {
    region?: string,
    type?: SchoolType,
    isActive?: boolean,
};