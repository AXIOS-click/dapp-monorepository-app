import { IMessageResponse } from "../../infrastructure/messageService";
import { BarGraph } from "../components/BgGraph";

export const TabOverview = ({ data }: { data: IMessageResponse }) => {
  return (
    <div className="w-full">
      <div className="w-full">
        <BarGraph data={data} />
      </div>
    </div>
  );
};
