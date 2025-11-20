import { CategoryPage } from "@/components/CategoryPage";
import { BookOpen } from "lucide-react";

const EnglishPage = () => {
  return (
    <CategoryPage
      category="english"
      title="English Preparation"
      description="Strengthen your academic English skills"
      icon={BookOpen}
    />
  );
};

export default EnglishPage;
