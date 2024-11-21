import { SiteFooter } from "@/components/marketing/about/site-footer";
import { getUserProfile } from "@/src/actions/auth.actions";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const profile = await getUserProfile();

  return (
    <>
      {/* <Navbar profile={profile} /> */}
      <main className="overflow-hidden container">{children}</main>
      <SiteFooter />
    </>
  );
}
