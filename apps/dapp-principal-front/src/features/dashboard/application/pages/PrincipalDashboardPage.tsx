import PageContainer from "@/shared/application/components/custom/PageContainer";
import { TabAnalytics } from "../components/TabAnalytics";

const PrincipalDashboardPage = () => {
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hola, Bienvenido de nuevo 👋
          </h2>
        </div>
        <TabAnalytics />
      </div>
    </PageContainer>
  );
};

export default PrincipalDashboardPage;
