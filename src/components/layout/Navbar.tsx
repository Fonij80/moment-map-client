import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="border-b print:hidden">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <header className="pt-6 px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">{t("brand_name")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create a beautiful timeline of your life's most important moments.
            Add events, include photos, and share your journey with others.
          </p>
        </header>
        {/* <div className="flex items-center gap-2">
          <span className="font-medium text-lg">Moment Map</span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              alert(
                "To implement Google Login, please connect this project to Supabase using the Supabase integration button in the top-right corner."
              )
            }
          >
            Sign in with Google
          </Button>
        </div> */}
      </div>
    </nav>
  );
};
