import Sec1 from "@/components/section1/Sec1";
import Sec2 from "@/components/section2/Sec2";
import Sec3 from "@/components/section3/Sec3";
import { getCurrentUser } from "@/lib/session";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <Sec1 initialUser={user} />
      <Sec2 />
      <Sec3 />
    </>
  );
}
