import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getTranslation, Language } from "@/utils/translations";

interface UploadFormProps {
  onAnalysisComplete: (data: any) => void;
  language: Language;
}

const UploadForm = ({ onAnalysisComplete, language }: UploadFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: getTranslation(language, 'dragDropText'),
        description: `${file.name} is ready for analysis.`,
      });
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setUploadProgress(100);
      
      // Mock analysis results
      const mockResults = {
        fileName: uploadedFile.name,
        analysisDate: new Date().toISOString(),
        overallRisk: "Medium",
        riskScore: 65,
        issues: [
          {
            type: "High Risk",
            description: "Unlimited liability clause detected",
            section: "Section 7.2",
            recommendation: "Consider adding liability caps"
          },
          {
            type: "Medium Risk", 
            description: "Ambiguous termination conditions",
            section: "Section 12.1",
            recommendation: "Clarify termination procedures"
          },
          {
            type: "Low Risk",
            description: "Standard payment terms",
            section: "Section 4.1",
            recommendation: "Terms are acceptable"
          }
        ],
        keyTerms: {
          contractValue: "$150,000",
          duration: "24 months",
          terminationNotice: "30 days",
          governingLaw: "New York"
        }
      };

      setTimeout(() => {
        onAnalysisComplete(mockResults);
        toast({
          title: "Analysis completed",
          description: "Your contract has been successfully analyzed.",
        });
      }, 500);

    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      clearInterval(progressInterval);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-base ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              {uploadedFile ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">{uploadedFile.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    File size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {isDragActive ? getTranslation(language, 'dragDropText') : "Upload Contract Document"}
                  </h3>
                  <p className="text-muted-foreground">
                    {getTranslation(language, 'dragDropText')}, {getTranslation(language, 'orText')} {getTranslation(language, 'browseFiles')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {getTranslation(language, 'supportedFormats')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {isUploading && (
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{getTranslation(language, 'analyzing')}</span>
                <span className="text-foreground font-medium">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {uploadedFile && !isUploading && (
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleAnalyze}
                size="lg"
                className="px-8"
              >
                <FileText className="w-5 h-5 mr-2" />
                {getTranslation(language, 'analyzeContract')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-card bg-gradient-secondary">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">{getTranslation(language, 'secureAnalysis')}</h4>
              <p className="text-sm text-muted-foreground">{getTranslation(language, 'secureAnalysisDesc')}</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">{getTranslation(language, 'riskDetection')}</h4>
              <p className="text-sm text-muted-foreground">{getTranslation(language, 'riskDetectionDesc')}</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">{getTranslation(language, 'detailedReports')}</h4>
              <p className="text-sm text-muted-foreground">{getTranslation(language, 'detailedReportsDesc')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadForm;