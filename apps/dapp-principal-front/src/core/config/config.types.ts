import { authority } from "@/infrastructure/route/protectedRoutes";

export interface NavigationTree {
  key: string;
  path: string;
  isExternalLink?: boolean;
  title: string;
  translateKey: string;
  icon: string;
  type: "title" | "collapse" | "item";
  authority: authority[];
  subMenu: NavigationTree[];
}
