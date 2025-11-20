import { CategoryPage } from "@/components/CategoryPage";
import { Briefcase } from "lucide-react";

const ProjectsPage = () => {
  return (
    <CategoryPage
      category="projects"
      title="Projects & Portfolio"
      description="Showcase your work with GitHub, personal website, and documentation"
      icon={Briefcase}
    />
  );
};

export default ProjectsPage;
