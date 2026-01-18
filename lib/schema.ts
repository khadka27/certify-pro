import { z } from "zod";

export const certificateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  productName: z.string().min(1, "Product name is required"),
  certNumber: z.string().min(1, "Certificate number is required"),
  issuedDate: z.string().min(1, "Issued date is required"),
  expiryDate: z.string().optional(),
  companyName: z.string().min(1, "Company name is required"),
  personName: z.string().min(1, "Person name is required"),
  role: z.string().min(1, "Role is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  qrText: z.string().optional(),
  logo: z.string().optional(),
  signature: z.string().optional(),
  badge: z.string().optional(),
  watermark: z.string().optional(),
  showWatermark: z.boolean().optional(),
  selectedTemplate: z.number().min(1).max(13),
});

export type CertificateFormData = z.infer<typeof certificateSchema>;
