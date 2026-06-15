import Sec1 from "@/components/section1/Sec1";
import Sec2 from "@/components/section2/Sec2";
import PremiumBenefitsSection from "@/components/PremiumBenefitsSection";
import Sec3 from "@/components/section3/Sec3";
import { getCurrentUser } from "@/lib/session";
/**
 * @typedef {{ id: string; name: string | null; email: string | null } | null} NavbarInitialUser
 */

/**
 * @param {{ initialUser?: NavbarInitialUser }} props
 */

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <Sec1 initialUser={user} />
      <Sec2 />
      <PremiumBenefitsSection />
      <Sec3 />
    </>
  );
}
