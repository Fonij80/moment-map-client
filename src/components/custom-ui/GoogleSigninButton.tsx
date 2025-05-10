import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const GoogleSigninButton = () => {
  const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        alert(
          "To implement Google Login, please connect this project to Supabase using the Supabase integration button in the top-right corner."
        )
      }
    >
      {t("signin_btn")}
    </Button>
  );
};
