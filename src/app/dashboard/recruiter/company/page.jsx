import React from 'react';
import CompanyPage from './CompanyPage';
import { getUserSession } from '@/lib/core/session';
import { recruiterCompany } from '@/lib/api/companies';

const CompanyProfile = async () => {
    const user =  await getUserSession(); 
    const company = await recruiterCompany(user?.id);
    return (
        <div>
            <CompanyPage recruiter={user} recruiterCompany={company} />
        </div>
    );
};

export default CompanyProfile;