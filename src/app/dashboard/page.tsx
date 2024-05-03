import BreadCrumbs from "@/components/common/BreadCrumbs";
import MobileMenu from "@/components/common/MobileMenu";
import SearchBar from "@/components/common/SearchBar";
import Sidebar from "@/components/common/Sidebar";
import UserMenu from "@/components/common/UserMenu";
import GoBackButton from "@/components/common/buttons/GoBackButton";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileMenu />
          <BreadCrumbs />
          <SearchBar />
          <UserMenu />
        </header>
        <main className="">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <GoBackButton />
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Dashboard
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm">Save Product</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
