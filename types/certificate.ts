export interface CertificateData {
  title: string;
  subTitle?: string;
  certifiedBy?: string; // New
  certNumber: string;
  certificationStatus?: string; // New
  issuedDate: string;
  expiryDate?: string;

  // Product Details
  productName: string;
  productCategory?: string; // New
  productForm?: string; // New
  description: string;
  keyActiveIngredients?: string; // New
  dietaryCompliance?: string; // New
  sideEffects?: string; // New
  cautions?: string; // New

  // Manufacturer & Certifier
  companyName: string;
  manufacturerAddress?: string; // New
  personName: string;
  role: string;
  location: string;

  // Ratings & Analysis
  overallExpertRating?: string; // New
  safetyRating?: string; // New
  effectivenessRating?: string; // New
  ingredientsQualityRating?: string; // New
  certificationsQCRating?: string; // New
  valueForMoneyRating?: string; // New
  evidenceStrengthRating?: string; // New
  userExperienceRating?: string; // New
  versatilityUseCaseFit?: string; // New

  // Verification & Verdict
  finalVerdict?: string; // New
  verificationStatement?: string; // New
  certificationsAndApprovals?: string; // New
  thirdPartyTesting?: string; // New
  refundPolicy?: string; // New

  // Contact & Links
  customerSupportEmail?: string; // New
  customerSupportPhone?: string; // New
  buyNowUrl?: string; // New

  // Assets
  qrText?: string;
  logo?: string;
  signature?: string;
  badge?: string;
  watermark?: string;
  showWatermark?: boolean;
  selectedTemplate: number;
}

export interface CertificateTemplateProps {
  data: CertificateData;
  className?: string;
}
