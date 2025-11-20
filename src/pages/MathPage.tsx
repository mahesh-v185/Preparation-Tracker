import { CategoryPage } from "@/components/CategoryPage";
import { Calculator } from "lucide-react";

const MathPage = () => {
  return (
    <CategoryPage
      category="math"
      title="Mathematics"
      description="Master algebra, geometry, trigonometry, and statistics"
      icon={Calculator}
    />
  );
};

export default MathPage;
