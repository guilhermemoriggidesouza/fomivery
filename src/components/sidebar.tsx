import { Box, TableOfContents, Store, ChartArea, Bookmark } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar";
import { headers } from "next/headers";
import { ReactElement } from "react";

const items = [
    {
        title: "Pedidos",
        url: "/admin/pedidos",
        icon: Store,
    },
    {
        title: "Produtos",
        url: "/admin/produtos",
        icon: Box,
    },
    {
        title: "Seções",
        url: "/admin/secoes",
        icon: TableOfContents,
    },
    {
        title: "Categorias de produtos",
        url: "/admin/categorias",
        icon: Bookmark,
    },
    {
        title: "Gráficos",
        url: "/admin/graficos",
        icon: ChartArea,
    },
];

const SidebarItemTile = ({ title, url, iconCustom, path }: { title: string, url: string, iconCustom: ReactElement, path: string }) => (
    <a href={url} className="w-full">
        {iconCustom}
        <span className={path.includes(url) ? "font-bold" : ''}>{title}</span>
    </a>
);

export async function AppSidebar() {
    const headersList = await headers();

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarGroupLabel>
                    <div className="flex justify-center gap-3 items-center">
                        <a href="/admin" className="flex gap-2 items-center">
                            <span>Painel do admin</span>
                        </a>
                    </div>
                </SidebarGroupLabel>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {items.map((item) =>
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <SidebarItemTile
                                        {...item}
                                        iconCustom={<item.icon />}
                                        path={headersList.get("x-pathname") ?? ''}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
