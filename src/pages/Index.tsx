import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadForm from '@/components/UploadForm';
import ResultsTable from '@/components/ResultsTable';
import LanguageToggle from '@/components/LanguageToggle';
import { getTranslation, Language } from '@/utils/translations';

const Index = () => {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const handleAnalysisComplete = (data: any) => {
    setAnalysisResults(data);
  };

  const handleLanguageToggle = (language: string) => {
    setCurrentLanguage(language as Language);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header language={currentLanguage} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Language Toggle */}
          <div className="flex justify-end mb-6">
            <LanguageToggle
              currentLanguage={currentLanguage}
              onToggle={handleLanguageToggle}
            />
          </div>

          {/* Main Content */}
          {!analysisResults ? (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {getTranslation(currentLanguage, 'uploadTitle')}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {getTranslation(currentLanguage, 'uploadDescription')}
                </p>
              </div>
              <UploadForm onAnalysisComplete={handleAnalysisComplete} language={currentLanguage} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {getTranslation(currentLanguage, 'resultsTitle')}
                </h2>
                <button
                  onClick={() => setAnalysisResults(null)}
                  className="text-primary hover:underline transition-base"
                >
                  {getTranslation(currentLanguage, 'analyzeAnother')}
                </button>
              </div>
              <ResultsTable
                results={analysisResults}
                language={currentLanguage}
              />
            </div>
          )}
        </div>
      </main>

      <Footer language={currentLanguage} />
    </div>
  );
};

export default Index;
