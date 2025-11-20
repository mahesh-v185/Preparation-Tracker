import { CategoryPage } from "@/components/CategoryPage";
import { FlaskConical } from "lucide-react";

const ChemistryPage = () => {
  return (
    <CategoryPage
      category="chemistry"
      title="Chemistry"
      description="Study atomic structure, bonding, and organic basics"
      icon={FlaskConical}
    />
  );
};

export default ChemistryPage;
