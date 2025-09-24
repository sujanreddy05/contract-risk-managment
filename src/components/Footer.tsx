import { getTranslation, Language } from "@/utils/translations";

interface FooterProps {
  language: Language;
}

const Footer = ({ language }: FooterProps) => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">
            © 2024 {getTranslation(language, 'appTitle')}. {getTranslation(language, 'allRightsReserved')} |{" "}
            <span className="text-primary cursor-pointer hover:underline">{getTranslation(language, 'privacyPolicy')}</span> |{" "}
            <span className="text-primary cursor-pointer hover:underline">{getTranslation(language, 'termsOfService')}</span>
          </p>
          <p className="text-xs mt-2">
            {getTranslation(language, 'poweredBy')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;