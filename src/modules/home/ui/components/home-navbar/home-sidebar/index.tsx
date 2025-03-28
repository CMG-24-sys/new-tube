import { Separator } from "@/components/ui/separator"
import { SidebarContent } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/ui/sidebar"
import { MainSection } from "./main-section"


export const HomeSidebar = () => {
return (
<Sidebar className="pt-16 z-40 border-none">
<SidebarContent className="bg-background">
<MainSection />
<Separator />
</SidebarContent>
</Sidebar>
)
}