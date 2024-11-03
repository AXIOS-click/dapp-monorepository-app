import { authority } from "@/infrastructure/route/protectedRoutes";
import { Icons } from "./Icons";

export interface NavigationTree {
  key: string;
  path: string;
  isExternalLink?: boolean;
  title: string;
  translateKey: string;
  icon: keyof typeof Icons;
  type: "title" | "collapse" | "item";
  authority: authority[];
  subMenu: NavigationTree[];
}
