import BreadCrumbs from "@/components/common/BreadCrumbs";
import MobileMenu from "@/components/common/MobileMenu";
import SearchBar from "@/components/common/SearchBar";
import Sidebar from "@/components/common/Sidebar";
import UserMenu from "@/components/common/UserMenu";
import GoBackButton from "@/components/common/buttons/GoBackButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!data.user || error) redirect("/login");

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
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
