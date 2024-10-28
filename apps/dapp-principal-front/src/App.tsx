import { ConfigContainer } from "./core/config/ConfigContainer";
import { PrincipalLayout } from "./shared/application/layout/PrincipalLayout";

export function App() {
  return (
    <ConfigContainer>
      <PrincipalLayout />
    </ConfigContainer>
  );
}

export default App;
