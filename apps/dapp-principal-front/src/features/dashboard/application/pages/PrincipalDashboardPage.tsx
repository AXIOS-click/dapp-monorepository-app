import PageContainer from "@/shared/application/components/custom/PageContainer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/application/components/ui/tabs";
import { TabAnalytics } from "../components/TabAnalytics";
import { TabOverview } from "../components/TabOverview";

const PrincipalDashboardPage = () => {
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hola, Bienvenido de nuevo 👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Graficas y resumen</TabsTrigger>
            <TabsTrigger value="analytics">Consultas y analisis</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <TabOverview />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <TabAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default PrincipalDashboardPage;
