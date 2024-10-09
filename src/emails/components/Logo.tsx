import { Img } from "@react-email/components";

import { CONFIG } from "@/config";

const Logo = () => (
  <Img
    className="mx-auto py-4 h-9"
    src={`${CONFIG.STATIC_URL}/emails/logo-white.jpg`}
  />
);

export default Logo;
