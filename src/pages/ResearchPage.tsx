import { CategoryPage } from "@/components/CategoryPage";
import { Users } from "lucide-react";

const ResearchPage = () => {
  return (
    <CategoryPage
      category="research"
      title="Research & Professor Outreach"
      description="Find labs, connect with professors, and prepare your research pitch"
      icon={Users}
    />
  );
};

export default ResearchPage;
