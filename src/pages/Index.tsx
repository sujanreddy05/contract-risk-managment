import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadForm from '@/components/UploadForm';
import ResultsTable from '@/components/ResultsTable';
import LanguageToggle from '@/components/LanguageToggle';

const Index = () => {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const handleAnalysisComplete = (data: any) => {
    setAnalysisResults(data);
  };

  const handleLanguageToggle = (language: string) => {
    setCurrentLanguage(language);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

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
                  Upload Your Contract for Analysis
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our AI-powered system will analyze your contract, identify potential
                  risks, and provide actionable insights to help you make informed
                  decisions.
                </p>
              </div>
              <UploadForm onAnalysisComplete={handleAnalysisComplete} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Contract Analysis Results
                </h2>
                <button
                  onClick={() => setAnalysisResults(null)}
                  className="text-primary hover:underline transition-base"
                >
                  Analyze Another Contract
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

      <Footer />
    </div>
  );
};

export default Index;
