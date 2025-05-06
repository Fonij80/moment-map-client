import { Trans, useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-6 border-t">
      <div className="container text-center text-sm text-muted-foreground">
        <Trans
          i18nKey="footer.copyright"
          values={{ year: new Date().getFullYear(), brand: t("brand_name") }}
          components={{
            creator: (
              <a
                href="https://fonij.dev/"
                className="text-primary hover:border-b-2"
              />
            ),
          }}
        />
      </div>
    </footer>
  );
};
