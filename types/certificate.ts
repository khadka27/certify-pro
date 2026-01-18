export interface CertificateData {
  title: string;
  productName: string;
  certNumber: string;
  issuedDate: string;
  expiryDate?: string;
  companyName: string;
  personName: string;
  role: string;
  description: string;
  location: string;
  qrText?: string;
  subTitle?: string;
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
