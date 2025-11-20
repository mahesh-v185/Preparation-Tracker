import { CategoryPage } from "@/components/CategoryPage";
import { MessageSquare } from "lucide-react";

const InterviewPage = () => {
  return (
    <CategoryPage
      category="interview"
      title="Interview Preparation"
      description="Practice your self-introduction, research plan, and common questions"
      icon={MessageSquare}
    />
  );
};

export default InterviewPage;
