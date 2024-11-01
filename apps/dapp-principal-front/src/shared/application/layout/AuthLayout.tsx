import { FC } from "react";
import { PrincipalViews } from "../components/view/PrincipalView";

interface ViewsProps {
  pageContainerType?: "default" | "gutterless" | "contained";
}

const AuthLayout: FC<ViewsProps> = () => {
  return (
    <div className="flex flex-auto flex-col h-[100vh]">
      <PrincipalViews />
    </div>
  );
};
export default AuthLayout;
