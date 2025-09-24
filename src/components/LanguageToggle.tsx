import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  currentLanguage: string;
  onToggle: (language: string) => void;
}

const LanguageToggle = ({ currentLanguage, onToggle }: LanguageToggleProps) => {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex rounded-lg border border-border bg-card p-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={currentLanguage === lang.code ? "default" : "ghost"}
            size="sm"
            onClick={() => onToggle(lang.code)}
            className="px-3 py-1 text-xs transition-base"
          >
            {lang.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle;