import { useTranslation } from "react-i18next";
import { GoogleSigninButton } from "../custom-ui/GoogleSigninButton";

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="border-b w-full print:hidden">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium text-lg">{t("brand_name")}</span>
        </div>

        <div className="flex items-center gap-3">
          <GoogleSigninButton />
        </div>
      </div>
    </nav>
  );
};
