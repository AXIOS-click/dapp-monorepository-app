import { PrincipalViews } from "../components/view/PrincipalView";

const PublicLayout = () => {
  return (
    <div className="flex flex-auto flex-col h-[100vh]">
      <PrincipalViews />
    </div>
  );
};

export default PublicLayout;
