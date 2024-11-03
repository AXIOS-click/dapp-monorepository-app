import { NAV_ITEM_TYPE_ITEM } from "@/shared/application/constants/navigation.constant";
import { NavigationTree } from "./config.types";

export const navigationConfig: NavigationTree[] = [
  {
    key: "home",
    path: "/home",
    title: "Dashboard",
    translateKey: "nav.home",
    icon: "home",
    type: NAV_ITEM_TYPE_ITEM,
    authority: ["DASHBOARD"],
    subMenu: [],
  },
];
