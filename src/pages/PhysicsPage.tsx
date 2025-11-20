import { CategoryPage } from "@/components/CategoryPage";
import { Atom } from "lucide-react";

const PhysicsPage = () => {
  return (
    <CategoryPage
      category="physics"
      title="Physics"
      description="Cover mechanics, waves, electricity, and thermodynamics"
      icon={Atom}
    />
  );
};

export default PhysicsPage;
