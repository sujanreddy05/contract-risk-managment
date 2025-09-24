import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, CheckCircle, XCircle, Download, Share2 } from "lucide-react";
import { getTranslation, Language } from "@/utils/translations";

interface Issue {
  type: string;
  description: string;
  section: string;
  recommendation: string;
}

interface KeyTerms {
  contractValue: string;
  duration: string;
  terminationNotice: string;
  governingLaw: string;
}

interface ResultsProps {
  results: {
    fileName: string;
    analysisDate: string;
    overallRisk: string;
    riskScore: number;
    issues: Issue[];
    keyTerms: KeyTerms;
  };
  language: Language;
}

const ResultsTable = ({ results, language }: ResultsProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return <XCircle className="w-4 h-4" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4" />;
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{results.fileName}</h2>
          <p className="text-sm text-muted-foreground">
            Analyzed on {new Date(results.analysisDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            {getTranslation(language, 'export')}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            {getTranslation(language, 'share')}
          </Button>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                {getRiskIcon(results.overallRisk)}
              </div>
              <span>{getTranslation(language, 'overallRisk')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Risk Level</span>
                <Badge className={getRiskColor(results.overallRisk)}>
                  {getTranslation(language, results.overallRisk.toLowerCase() as 'low' | 'medium' | 'high')}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{getTranslation(language, 'riskScore')}</span>
                  <span className="font-medium">{results.riskScore}/100</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-smooth"
                    style={{ width: `${results.riskScore}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>{getTranslation(language, 'keyTerms')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{getTranslation(language, 'contractValue')}</span>
                <span className="font-medium">{results.keyTerms.contractValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{getTranslation(language, 'duration')}</span>
                <span className="font-medium">{results.keyTerms.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{getTranslation(language, 'terminationNotice')}</span>
                <span className="font-medium">{results.keyTerms.terminationNotice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{getTranslation(language, 'governingLaw')}</span>
                <span className="font-medium">{results.keyTerms.governingLaw}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issues Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>{getTranslation(language, 'identifiedIssues')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{getTranslation(language, 'type')}</TableHead>
                <TableHead>{getTranslation(language, 'description')}</TableHead>
                <TableHead>{getTranslation(language, 'section')}</TableHead>
                <TableHead>{getTranslation(language, 'recommendation')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.issues.map((issue, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Badge className={getRiskColor(issue.type.split(' ')[0])}>
                      {issue.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {issue.description}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {issue.section}
                  </TableCell>
                  <TableCell className="text-sm">
                    {issue.recommendation}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsTable;