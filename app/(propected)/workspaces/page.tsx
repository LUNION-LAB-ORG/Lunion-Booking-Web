import Header from "@/components/layouts/header";
import Content from "./content";

import { SiteFooter } from "@/components/marketing/about/site-footer";
import { getUserProfile } from "@/src/actions/auth.actions";
import { getUserTeams } from "@/src/actions/team.actions";

export default async function Page() {
  const profile = await getUserProfile();
  const teams: any = await getUserTeams();

  return (
    <>
      <Header  />
      <main className="container min-h-[600px] overflow-hidden">
        <Content teams={teams} />
      </main>
      <SiteFooter />
    </>
  );
}
