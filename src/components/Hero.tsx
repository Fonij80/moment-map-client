import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <>
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t("tagline")}
        <span className="text-primary ml-2">{t("brand_name")}</span>
      </motion.h1>

      <motion.p
        className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t("description")}
      </motion.p>
    </>
  );
};
