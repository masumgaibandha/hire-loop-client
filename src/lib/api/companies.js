import { serverQuery } from "../core/server";
import { getUserSession } from "../core/session";


export const recruiterCompany = async (recruiterId) => {
  return serverQuery(`/api/my/companies?recruiterId=${recruiterId}`);
};
export const getLoggedInRecruiterCompany = async () => {
  const user = await getUserSession();
  return recruiterCompany(user?.id);
};