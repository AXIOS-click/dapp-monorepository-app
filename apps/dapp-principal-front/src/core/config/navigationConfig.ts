import { NAV_ITEM_TYPE_ITEM } from "@/shared/application/constants/navigation.constant";
import { NavigationTree } from "./config.types";

export const navigationConfig: NavigationTree[] = [
  {
    key: "home",
    path: "/home",
    title: "Dashboard",
    translateKey: "nav.home",
    icon: "dashboard",
    type: NAV_ITEM_TYPE_ITEM,
    authority: ["DASHBOARD"],
    subMenu: [],
  },
  {
    key: "home",
    path: "/home",
    title: "Administración",
    translateKey: "nav.home",
    icon: "user",
    type: NAV_ITEM_TYPE_ITEM,
    authority: ["USUARIOS"],
    subMenu: [
      {
        key: "home",
        path: "/home",
        title: "",
        translateKey: "nav.home",
        icon: "user",
        type: NAV_ITEM_TYPE_ITEM,
        authority: ["USUARIOS"],
        subMenu: [],
      },
    ],
  },
];
