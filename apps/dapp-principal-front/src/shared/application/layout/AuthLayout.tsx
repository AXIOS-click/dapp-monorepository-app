import { FC } from "react";
import { ViewContainer } from "../components/View/ViewContainer";

interface ViewsProps {
  pageContainerType?: "default" | "gutterless" | "contained";
}

const AuthLayout: FC<ViewsProps> = () => {
  return (
    <div className="flex flex-auto flex-col h-[100vh]">
      <ViewContainer />
    </div>
  );
};
export default AuthLayout;
