import type { School } from "../types/School.ts";
import type { SchoolFilter } from "../types/SchoolFilter.ts";
import axios from 'axios';

export class SchoolService {
    BASE_URL = import.meta.env.VITE_API_BASE_URL;

    async fetchSchools(params: SchoolFilter) {
        const response = await axios.get(this.BASE_URL, { params });
        return response.data;
    };

    async createSchool(school: School) {
        const response = await axios.post(this.BASE_URL, {
            "name": school.name,
            "edrpou": school.edrpou,
            "region": school.region,
            "type": school.type
        })
        return response.data
    }

    async deactivateSchool(id: number) {
        const response = await axios.patch(`${this.BASE_URL}/${id}/deactivate`);
        return response.data;
    };
}

const schoolServiceInstance = new SchoolService();
export default schoolServiceInstance;