import { FileCheck, Shield } from "lucide-react";
import { getTranslation, Language } from "@/utils/translations";

interface HeaderProps {
  language: Language;
}

const Header = ({ language }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
              <FileCheck className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{getTranslation(language, 'appTitle')}</h1>
              <p className="text-sm text-muted-foreground">{getTranslation(language, 'appSubtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>{getTranslation(language, 'secureConfidential')}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;