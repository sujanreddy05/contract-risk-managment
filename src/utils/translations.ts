export const translations = {
  en: {
    // Header
    appTitle: "ContractAnalyzer",
    appSubtitle: "AI-Powered Contract Review",
    secureConfidential: "Secure & Confidential",
    
    // Main page
    uploadTitle: "Upload Your Contract for Analysis", 
    uploadDescription: "Our AI-powered system will analyze your contract, identify potential risks, and provide actionable insights to help you make informed decisions.",
    analyzeAnother: "Analyze Another Contract",
    resultsTitle: "Contract Analysis Results",
    
    // Upload form
    dragDropText: "Drag and drop your contract here",
    orText: "or",
    browseFiles: "Browse Files",
    supportedFormats: "Supported formats: PDF, DOCX, TXT (Max 10MB)",
    analyzing: "Analyzing Contract...",
    uploadProgress: "Upload Progress",
    analyzeContract: "Analyze Contract",
    analysisCompleted: "Analysis completed",
    analysisCompletedDesc: "Your contract has been successfully analyzed.",
    analysisFailed: "Analysis failed", 
    analysisFailedDesc: "Please try again or contact support.",
    secureAnalysis: "Secure Analysis",
    secureAnalysisDesc: "Your documents are processed securely and confidentially", 
    riskDetection: "Risk Detection",
    riskDetectionDesc: "AI identifies potential risks and problematic clauses",
    detailedReports: "Detailed Reports",
    detailedReportsDesc: "Get comprehensive analysis with actionable recommendations",
    
    // Results
    overallRisk: "Overall Risk Assessment",
    riskScore: "Risk Score",
    keyTerms: "Key Contract Terms",
    contractValue: "Contract Value",
    duration: "Duration",
    terminationNotice: "Termination Notice", 
    governingLaw: "Governing Law",
    identifiedIssues: "Identified Issues & Recommendations",
    type: "Type",
    description: "Description",
    section: "Section",
    recommendation: "Recommendation",
    export: "Export",
    share: "Share",
    
    // Risk levels
    low: "Low",
    medium: "Medium", 
    high: "High",
    
    // Footer
    allRightsReserved: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service", 
    poweredBy: "Powered by advanced AI technology for reliable contract analysis"
  },
  hi: {
    // Header
    appTitle: "कॉन्ट्रैक्ट एनालाइजर",
    appSubtitle: "एआई-संचालित अनुबंध समीक्षा",
    secureConfidential: "सुरक्षित और गोपनीय",
    
    // Main page
    uploadTitle: "विश्लेषण के लिए अपना अनुबंध अपलोड करें",
    uploadDescription: "हमारी एआई-संचालित प्रणाली आपके अनुबंध का विश्लेषण करेगी, संभावित जोखिमों की पहचान करेगी, और सूचित निर्णय लेने में मदद के लिए कार्यक्षेत्र प्रदान करेगी।",
    analyzeAnother: "दूसरा अनुबंध विश्लेषित करें",
    resultsTitle: "अनुबंध विश्लेषण परिणाम",
    
    // Upload form  
    dragDropText: "अपना अनुबंध यहाँ खींचें और छोड़ें",
    orText: "या",
    browseFiles: "फाइलें ब्राउज़ करें",
    supportedFormats: "समर्थित प्रारूप: PDF, DOCX, TXT (अधिकतम 10MB)",
    analyzing: "अनुबंध का विश्लेषण हो रहा है...",
    uploadProgress: "अपलोड प्रगति",
    analyzeContract: "अनुबंध का विश्लेषण करें", 
    analysisCompleted: "विश्लेषण पूर्ण",
    analysisCompletedDesc: "आपके अनुबंध का सफलतापूर्वक विश्लेषण किया गया है।",
    analysisFailed: "विश्लेषण असफल",
    analysisFailedDesc: "कृपया फिर से प्रयास करें या सहायता से संपर्क करें।",
    secureAnalysis: "सुरक्षित विश्लेषण",
    secureAnalysisDesc: "आपके दस्तावेज़ सुरक्षित और गोपनीय रूप से संसाधित किए जाते हैं",
    riskDetection: "जोखिम पहचान", 
    riskDetectionDesc: "एआई संभावित जोखिमों और समस्याग्रस्त खंडों की पहचान करता है",
    detailedReports: "विस्तृत रिपोर्ट",
    detailedReportsDesc: "कार्यक्षेत्र सुझावों के साथ व्यापक विश्लेषण प्राप्त करें",
    
    // Results
    overallRisk: "समग्र जोखिम मूल्यांकन",
    riskScore: "जोखिम स्कोर",
    keyTerms: "मुख्य अनुबंध शर्तें",
    contractValue: "अनुबंध मूल्य",
    duration: "अवधि",
    terminationNotice: "समाप्ति सूचना",
    governingLaw: "शासी कानून", 
    identifiedIssues: "पहचाने गए मुद्दे और सुझाव",
    type: "प्रकार",
    description: "विवरण",
    section: "अनुभाग",
    recommendation: "सुझाव",
    export: "निर्यात",
    share: "साझा करें",
    
    // Risk levels
    low: "कम",
    medium: "मध्यम",
    high: "उच्च",
    
    // Footer
    allRightsReserved: "सभी अधिकार सुरक्षित।",
    privacyPolicy: "गोपनीयता नीति", 
    termsOfService: "सेवा की शर्तें",
    poweredBy: "विश्वसनीय अनुबंध विश्लेषण के लिए उन्नत एआई तकनीक द्वारा संचालित"
  }
};

export type Language = 'en' | 'hi';
export type TranslationKey = keyof typeof translations.en;

export const getTranslation = (language: Language, key: TranslationKey): string => {
  return translations[language][key] || translations.en[key];
};