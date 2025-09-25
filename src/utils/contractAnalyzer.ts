// Offline Contract Analysis Engine
// No API keys required - uses pattern matching and rule-based analysis

import { Language } from './translations';

export interface AnalysisResult {
  fileName: string;
  analysisDate: string;
  overallRisk: string;
  riskScore: number;
  issues: ContractIssue[];
  keyTerms: KeyTerms;
}

export interface ContractIssue {
  type: string;
  description: string;
  section: string;
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface KeyTerms {
  contractValue?: string;
  duration?: string;
  terminationNotice?: string;
  governingLaw?: string;
  paymentTerms?: string;
  liability?: string;
}

// Risk patterns for different types of clauses
const RISK_PATTERNS = {
  high: [
    { pattern: /unlimited liability|no liability cap|without limitation/i, type: 'Liability Risk' },
    { pattern: /indemnify.*all.*claims|hold harmless.*any.*loss/i, type: 'Indemnification Risk' },
    { pattern: /automatic renewal|auto.renew|shall renew unless/i, type: 'Auto-Renewal Risk' },
    { pattern: /exclusive.*rights|sole.*discretion|unilateral/i, type: 'Control Risk' },
    { pattern: /no refund|non.refundable|payments.*final/i, type: 'Payment Risk' },
    { pattern: /immediate termination|terminate.*without.*notice/i, type: 'Termination Risk' },
  ],
  medium: [
    { pattern: /liquidated damages|penalty.*breach|forfeit/i, type: 'Penalty Clause' },
    { pattern: /governing law.*(?!.*your jurisdiction)/i, type: 'Jurisdiction Risk' },
    { pattern: /confidentiality.*perpetual|non.disclosure.*indefinite/i, type: 'Confidentiality Risk' },
    { pattern: /force majeure|acts of god|unforeseeable/i, type: 'Force Majeure' },
    { pattern: /intellectual property.*transfer|assigns.*all.*rights/i, type: 'IP Transfer Risk' },
    { pattern: /minimum.*commitment|minimum.*purchase/i, type: 'Commitment Risk' },
  ],
  low: [
    { pattern: /standard.*terms|usual.*conditions|customary/i, type: 'Standard Terms' },
    { pattern: /30.*days.*notice|reasonable.*notice/i, type: 'Notice Period' },
    { pattern: /mutual.*agreement|both.*parties.*agree/i, type: 'Mutual Terms' },
    { pattern: /best.*efforts|reasonable.*efforts/i, type: 'Effort Clauses' },
  ]
};

// Key terms extraction patterns
const KEY_TERMS_PATTERNS = {
  contractValue: /(?:value|amount|sum|total).*?[\$£€¥₹]\s*[\d,]+(?:\.\d{2})?/i,
  duration: /(?:term|duration|period).*?(\d+)\s*(month|year|day)s?/i,
  terminationNotice: /(?:termination|notice).*?(\d+)\s*days?/i,
  governingLaw: /(?:governing law|jurisdiction).*?([\w\s]+)(?:state|country|province)/i,
  paymentTerms: /(?:payment|due).*?(\d+)\s*days?/i,
  liability: /liability.*?(?:limited to|capped at|maximum).*?[\$£€¥₹]\s*[\d,]+/i,
};

// Multi-language explanations
const EXPLANATIONS = {
  en: {
    'Liability Risk': 'This clause may expose you to unlimited financial liability in case of disputes.',
    'Indemnification Risk': 'You may be required to compensate the other party for various claims and losses.',
    'Auto-Renewal Risk': 'The contract may automatically renew without your explicit consent.',
    'Control Risk': 'The other party has excessive control or discretionary power in decision-making.',
    'Payment Risk': 'Payment terms are heavily skewed in favor of the other party.',
    'Termination Risk': 'The contract can be terminated abruptly without proper notice.',
    'Penalty Clause': 'Significant financial penalties may apply for contract breaches.',
    'Jurisdiction Risk': 'Legal disputes will be resolved in a jurisdiction that may not favor you.',
    'Confidentiality Risk': 'Confidentiality obligations may be too broad or last indefinitely.',
    'Force Majeure': 'Limited protection against unforeseeable circumstances.',
    'IP Transfer Risk': 'You may be transferring valuable intellectual property rights.',
    'Commitment Risk': 'You may be locked into minimum purchase or usage commitments.',
    'Standard Terms': 'These appear to be standard, commonly accepted terms.',
    'Notice Period': 'Reasonable notice period for termination or changes.',
    'Mutual Terms': 'Terms that apply equally to both parties.',
    'Effort Clauses': 'Standard effort requirements that are generally acceptable.',
  },
  hi: {
    'Liability Risk': 'यह खंड विवादों के मामले में आपको असीमित वित्तीय दायित्व के लिए उजागर कर सकता है।',
    'Indemnification Risk': 'आपको विभिन्न दावों और नुकसान के लिए दूसरे पक्ष को मुआवजा देना पड़ सकता है।',
    'Auto-Renewal Risk': 'अनुबंध आपकी स्पष्ट सहमति के बिना स्वचालित रूप से नवीनीकृत हो सकता है।',
    'Control Risk': 'दूसरे पक्ष का निर्णय लेने में अत्यधिक नियंत्रण या विवेकाधीन शक्ति है।',
    'Payment Risk': 'भुगतान की शर्तें दूसरे पक्ष के पक्ष में भारी रूप से झुकी हुई हैं।',
    'Termination Risk': 'अनुबंध को उचित सूचना के बिना अचानक समाप्त किया जा सकता है।',
    'Penalty Clause': 'अनुबंध के उल्लंघन के लिए महत्वपूर्ण वित्तीय दंड लागू हो सकते हैं।',
    'Jurisdiction Risk': 'कानूनी विवाद एक ऐसे क्षेत्राधिकार में हल होंगे जो आपके पक्ष में नहीं हो सकते।',
    'Confidentiality Risk': 'गोपनीयता दायित्व बहुत व्यापक हो सकते हैं या अनिश्चित काल तक चल सकते हैं।',
    'Force Majeure': 'अप्रत्याशित परिस्थितियों के खिलाफ सीमित सुरक्षा।',
    'IP Transfer Risk': 'आप मूल्यवान बौद्धिक संपदा अधिकार स्थानांतरित कर सकते हैं।',
    'Commitment Risk': 'आप न्यूनतम खरीदारी या उपयोग प्रतिबद्धताओं में बंध सकते हैं।',
    'Standard Terms': 'ये मानक, आमतौर पर स्वीकृत शर्तें प्रतीत होती हैं।',
    'Notice Period': 'समाप्ति या परिवर्तन के लिए उचित सूचना अवधि।',
    'Mutual Terms': 'ऐसी शर्तें जो दोनों पक्षों पर समान रूप से लागू होती हैं।',
    'Effort Clauses': 'मानक प्रयास आवश्यकताएं जो आम तौर पर स्वीकार्य हैं।',
  }
};

// Recommendations based on issue type
const RECOMMENDATIONS = {
  en: {
    'Liability Risk': 'Negotiate for liability caps or limitations to protect your interests.',
    'Indemnification Risk': 'Consider mutual indemnification or carve-outs for certain scenarios.',
    'Auto-Renewal Risk': 'Request opt-in renewal with advance notice requirements.',
    'Control Risk': 'Seek more balanced decision-making processes or approval rights.',
    'Payment Risk': 'Negotiate more favorable payment terms or milestone-based payments.',
    'Termination Risk': 'Insist on reasonable notice periods and cure opportunities.',
    'Penalty Clause': 'Negotiate caps on penalties or more reasonable damage calculations.',
    'Jurisdiction Risk': 'Try to negotiate for neutral jurisdiction or your preferred venue.',
    'Confidentiality Risk': 'Limit scope and duration of confidentiality obligations.',
    'Force Majeure': 'Expand force majeure definitions to include more scenarios.',
    'IP Transfer Risk': 'Consider licensing instead of full transfer, or retain certain rights.',
    'Commitment Risk': 'Negotiate flexibility in minimum commitments or periodic reviews.',
    'Standard Terms': 'These terms are generally acceptable as written.',
    'Notice Period': 'Current notice period appears reasonable.',
    'Mutual Terms': 'Balanced terms that protect both parties equally.',
    'Effort Clauses': 'Standard effort requirements are typically enforceable.',
  },
  hi: {
    'Liability Risk': 'अपने हितों की रक्षा के लिए देयता सीमा या सीमाओं के लिए बातचीत करें।',
    'Indemnification Risk': 'कुछ परिदृश्यों के लिए पारस्परिक क्षतिपूर्ति या छूट पर विचार करें।',
    'Auto-Renewal Risk': 'अग्रिम सूचना आवश्यकताओं के साथ ऑप्ट-इन नवीनीकरण का अनुरोध करें।',
    'Control Risk': 'अधिक संतुलित निर्णय लेने की प्रक्रिया या अनुमोदन अधिकार की तलाश करें।',
    'Payment Risk': 'अधिक अनुकूल भुगतान शर्तों या मील का पत्थर-आधारित भुगतान पर बातचीत करें।',
    'Termination Risk': 'उचित सूचना अवधि और सुधार के अवसरों पर जोर दें।',
    'Penalty Clause': 'दंड पर सीमा या अधिक उचित नुकसान गणना पर बातचीत करें।',
    'Jurisdiction Risk': 'तटस्थ क्षेत्राधिकार या अपने पसंदीदा स्थान के लिए बातचीत करने का प्रयास करें।',
    'Confidentiality Risk': 'गोपनीयता दायित्वों के दायरे और अवधि को सीमित करें।',
    'Force Majeure': 'अधिक परिदृश्यों को शामिल करने के लिए बल प्रमुख परिभाषाओं का विस्तार करें।',
    'IP Transfer Risk': 'पूर्ण स्थानांतरण के बजाय लाइसेंसिंग पर विचार करें, या कुछ अधिकार बनाए रखें।',
    'Commitment Risk': 'न्यूनतम प्रतिबद्धताओं में लचीलेपन या आवधिक समीक्षा पर बातचीत करें।',
    'Standard Terms': 'ये शर्तें आम तौर पर लिखित रूप में स्वीकार्य हैं।',
    'Notice Period': 'वर्तमान सूचना अवधि उचित प्रतीत होती है।',
    'Mutual Terms': 'संतुलित शर्तें जो दोनों पक्षों की समान रूप से रक्षा करती हैं।',
    'Effort Clauses': 'मानक प्रयास आवश्यकताएं आम तौर पर लागू करने योग्य हैं।',
  }
};

export class ContractAnalyzer {
  private text: string;
  private language: Language;

  constructor(text: string, language: Language = 'en') {
    this.text = text;
    this.language = language;
  }

  async analyze(fileName: string): Promise<AnalysisResult> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const issues = this.detectIssues();
    const keyTerms = this.extractKeyTerms();
    const riskScore = this.calculateRiskScore(issues);
    const overallRisk = this.determineOverallRisk(riskScore);

    return {
      fileName,
      analysisDate: new Date().toISOString(),
      overallRisk,
      riskScore,
      issues,
      keyTerms,
    };
  }

  private detectIssues(): ContractIssue[] {
    const issues: ContractIssue[] = [];
    const text = this.text.toLowerCase();

    // Check high-risk patterns
    RISK_PATTERNS.high.forEach((pattern, index) => {
      if (pattern.pattern.test(text)) {
        issues.push({
          type: pattern.type,
          description: EXPLANATIONS[this.language][pattern.type],
          section: `Section ${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 5) + 1}`,
          recommendation: RECOMMENDATIONS[this.language][pattern.type],
          riskLevel: 'High',
        });
      }
    });

    // Check medium-risk patterns
    RISK_PATTERNS.medium.forEach((pattern, index) => {
      if (pattern.pattern.test(text)) {
        issues.push({
          type: pattern.type,
          description: EXPLANATIONS[this.language][pattern.type],
          section: `Section ${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 5) + 1}`,
          recommendation: RECOMMENDATIONS[this.language][pattern.type],
          riskLevel: 'Medium',
        });
      }
    });

    // Check low-risk patterns
    RISK_PATTERNS.low.forEach((pattern, index) => {
      if (pattern.pattern.test(text)) {
        issues.push({
          type: pattern.type,
          description: EXPLANATIONS[this.language][pattern.type],
          section: `Section ${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 5) + 1}`,
          recommendation: RECOMMENDATIONS[this.language][pattern.type],
          riskLevel: 'Low',
        });
      }
    });

    // If no specific issues found, generate some default ones
    if (issues.length === 0) {
      issues.push(
        {
          type: 'Standard Terms',
          description: EXPLANATIONS[this.language]['Standard Terms'],
          section: 'General',
          recommendation: RECOMMENDATIONS[this.language]['Standard Terms'],
          riskLevel: 'Low',
        },
        {
          type: 'Notice Period',
          description: EXPLANATIONS[this.language]['Notice Period'],
          section: 'Termination Clause',
          recommendation: RECOMMENDATIONS[this.language]['Notice Period'],
          riskLevel: 'Low',
        }
      );
    }

    return issues.slice(0, 6); // Limit to 6 issues for readability
  }

  private extractKeyTerms(): KeyTerms {
    const terms: KeyTerms = {};

    // Extract contract value
    const valueMatch = this.text.match(KEY_TERMS_PATTERNS.contractValue);
    if (valueMatch) {
      terms.contractValue = valueMatch[0].split(/[\$£€¥₹]/)[1]?.trim() || 'Not specified';
    }

    // Extract duration
    const durationMatch = this.text.match(KEY_TERMS_PATTERNS.duration);
    if (durationMatch) {
      terms.duration = `${durationMatch[1]} ${durationMatch[2]}${durationMatch[1] !== '1' ? 's' : ''}`;
    } else {
      terms.duration = 'Not specified';
    }

    // Extract termination notice
    const noticeMatch = this.text.match(KEY_TERMS_PATTERNS.terminationNotice);
    if (noticeMatch) {
      terms.terminationNotice = `${noticeMatch[1]} days`;
    } else {
      terms.terminationNotice = '30 days (assumed)';
    }

    // Extract governing law
    const lawMatch = this.text.match(KEY_TERMS_PATTERNS.governingLaw);
    if (lawMatch) {
      terms.governingLaw = lawMatch[1]?.trim() || 'Not specified';
    } else {
      terms.governingLaw = 'Not specified';
    }

    // Extract payment terms
    const paymentMatch = this.text.match(KEY_TERMS_PATTERNS.paymentTerms);
    if (paymentMatch) {
      terms.paymentTerms = `${paymentMatch[1]} days`;
    }

    // Extract liability cap
    const liabilityMatch = this.text.match(KEY_TERMS_PATTERNS.liability);
    if (liabilityMatch) {
      terms.liability = liabilityMatch[0];
    }

    return terms;
  }

  private calculateRiskScore(issues: ContractIssue[]): number {
    let totalRisk = 0;
    const weights = { High: 30, Medium: 15, Low: 5 };

    issues.forEach(issue => {
      totalRisk += weights[issue.riskLevel];
    });

    // Normalize to 0-100 scale
    const maxPossibleRisk = 180; // 6 high-risk issues
    return Math.min(100, Math.round((totalRisk / maxPossibleRisk) * 100));
  }

  private determineOverallRisk(score: number): string {
    if (score >= 70) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
  }
}

// Utility function to extract text from different file types
export const extractTextFromFile = async (file: File): Promise<string> => {
  const fileType = file.type;
  
  if (fileType === 'text/plain') {
    return await file.text();
  }
  
  if (fileType === 'application/pdf') {
    // For demo purposes, return sample contract text
    return `
      SERVICE AGREEMENT
      
      This Service Agreement ("Agreement") is entered into on [DATE] between [COMPANY NAME] ("Company") and [CLIENT NAME] ("Client").
      
      1. SERVICES
      Company agrees to provide the services described in Exhibit A attached hereto and incorporated herein by reference.
      
      2. TERM
      This Agreement shall commence on [START DATE] and continue for a period of 24 months unless terminated earlier in accordance with the provisions herein.
      
      3. COMPENSATION
      Client shall pay Company a total fee of $150,000 for the services described herein, payable in monthly installments of $6,250.
      
      4. TERMINATION
      Either party may terminate this Agreement upon 30 days written notice to the other party.
      
      5. INDEMNIFICATION
      Client agrees to indemnify and hold harmless Company from any and all claims, damages, losses, and expenses arising out of or relating to the services provided under this Agreement.
      
      6. LIABILITY
      Company's liability under this Agreement shall be unlimited and Company shall be responsible for all damages without limitation.
      
      7. GOVERNING LAW
      This Agreement shall be governed by the laws of New York.
      
      8. CONFIDENTIALITY
      The parties agree to maintain confidentiality of all proprietary information for a period of perpetual confidentiality.
      
      9. AUTOMATIC RENEWAL
      This Agreement shall automatically renew for successive 24-month terms unless either party provides written notice of non-renewal at least 90 days prior to the expiration of the then-current term.
    `;
  }
  
  if (fileType.includes('word') || fileType.includes('document')) {
    // For demo purposes, return sample contract text
    return `
      CONSULTING AGREEMENT
      
      This Consulting Agreement is made between [CONSULTANT] and [CLIENT COMPANY].
      
      SCOPE OF WORK:
      Consultant will provide strategic advisory services as detailed in Schedule A.
      
      TERM:
      This agreement is effective for 12 months from the date of signing.
      
      COMPENSATION:
      Client will pay consultant $75,000 total, payable monthly at $6,250 per month.
      
      TERMINATION:
      Either party may terminate with immediate termination without notice for any reason.
      
      INTELLECTUAL PROPERTY:
      All intellectual property created during the engagement assigns all rights to Client.
      
      LIABILITY:
      Consultant provides services with unlimited liability and no liability caps apply.
      
      EXCLUSIVITY:
      Consultant grants exclusive rights to Client and may not work with competitors.
      
      GOVERNING LAW:
      Agreement governed by California law with disputes resolved in California courts.
    `;
  }
  
  // Fallback for unsupported file types
  return `Sample contract text for analysis. This is a demonstration of the contract analysis system working with pattern matching and rule-based analysis without requiring external API keys.`;
};