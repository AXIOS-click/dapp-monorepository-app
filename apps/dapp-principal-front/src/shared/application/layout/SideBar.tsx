import { Icons } from "@/core/config/Icons";
import { navigationConfig } from "@/core/config/navigationConfig";
import { AuthStore } from "@/features/auth/application/stores/AuthStore";
import { RolesStore } from "@/features/roles/application/stores/RolesStore";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/application/components/ui/collapsible";
import { Separator } from "@/shared/application/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/shared/application/components/ui/sidebar";
import { ChevronRight, GalleryVerticalEnd } from "lucide-react";
import * as React from "react";

export default function AppSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const company = {
    name: "Dapp",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  };
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { allRoles } = RolesStore();
  const { userSession } = AuthStore();
  const userRoles = userSession?.roles || [];

  if (!mounted) {
    return null;
  }
  const hasAuthority = (itemAuthority: string[]) => {
    if (!itemAuthority || itemAuthority.length === 0) {
      return true;
    }

    return userRoles.some((userRole) => {
      const role = allRoles?.find((role) => role.name === userRole);
      if (!role) return false;

      return itemAuthority.every((auth) => role.modules.includes(auth));
    });
  };

  const filteredNavigationConfig = navigationConfig
    .map((item) => {
      const itemHasAuthority = hasAuthority(item.authority);

      if (!itemHasAuthority) {
        return null;
      }

      if (item.subMenu && item.subMenu.length > 0) {
        const filteredSubMenu = item.subMenu.filter((subItem) => {
          return hasAuthority(subItem.authority);
        });

        if (filteredSubMenu.length === 0) {
          return null;
        }

        return {
          ...item,
          subMenu: filteredSubMenu,
        };
      }

      return item;
    })
    .filter((item) => item !== null);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <company.logo className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{company.name}</span>
              <span className="truncate text-xs">{company.plan}</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="overflow-x-hidden">
          <SidebarGroup>
            {/* <SidebarGroupLabel>Overview</SidebarGroupLabel> */}
            <SidebarMenu>
              {filteredNavigationConfig.map((item) => {
                const Icon = item.icon ? Icons[item.icon] : Icons.logo;
                return item?.subMenu && item?.subMenu?.length > 0 ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={false}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={false}
                        >
                          {item.icon && <Icon />}
                          <span>{item.title} a</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subMenu?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={false}>
                                <a href={subItem.path}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={false}
                    >
                      <a href={item.path}>
                        <Icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem></SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className=" hidden w-1/3 items-center gap-2 px-4 md:flex "></div>
          <div className="flex items-center gap-2 px-4"></div>
        </header>
        {/* page main content */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
