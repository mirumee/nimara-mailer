import { Img } from "@react-email/components";

import { CONFIG } from "@/config";
import Link from "@/emails/components/Link";
import { type Paths } from "@/lib/paths";

const Logo = ({ paths }: { paths: Paths }) => (
  <Link href={paths.home()}>
    <Img
      className="mx-auto py-4 h-9"
      src={`${CONFIG.STATIC_URL}/logo-white.jpg`}
    />
  </Link>
);

export default Logo;
