import { getLoggedInRecruiterCompany } from "@/lib/api/companies";
import PostJobForm from "./PostJobForm";

const PostJobPage = async () => {
  const company = await getLoggedInRecruiterCompany();

  return <PostJobForm company={company} />;
};

export default PostJobPage;