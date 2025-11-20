import { CategoryPage } from "@/components/CategoryPage";
import { Languages } from "lucide-react";

const JapanesePage = () => {
  return (
    <CategoryPage
      category="japanese"
      title="Japanese Learning Path"
      description="Master the basics of Japanese for your journey"
      icon={Languages}
    />
  );
};

export default JapanesePage;
