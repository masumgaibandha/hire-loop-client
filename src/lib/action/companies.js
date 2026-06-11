'use server';

import { serverMutation } from "../core/server";

export const createCompany = async (newCompanyData) => {
    return  serverMutation('/api/companies', newCompanyData);
}
// const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// export const createCompany = async (newCompanyData) => {
//     const res = await fetch(`${baseUrl}/api/companies`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newCompanyData),
//     });
//     return res.json();
// }