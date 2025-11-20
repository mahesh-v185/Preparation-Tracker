import { CategoryPage } from "@/components/CategoryPage";
import { FileText } from "lucide-react";

const DocumentsPage = () => {
  return (
    <CategoryPage
      category="documents"
      title="Document Preparation"
      description="Essential documents for your MEXT application"
      icon={FileText}
    />
  );
};

export default DocumentsPage;
