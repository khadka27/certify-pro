import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CertificateData } from "@/types/certificate";

interface CertificateStore {
  certificateData: CertificateData;
  updateField: <K extends keyof CertificateData>(
    field: K,
    value: CertificateData[K],
  ) => void;
  resetData: () => void;
  loadData: (data: CertificateData) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

const getInitialData = (): CertificateData => ({
  title: "Certificate of Authenticity",
  subTitle: "Premium Verification",
  certifiedBy: "Authoritative Body",
  certNumber: "CERT-2026-0001",
  certificationStatus: "Active",
  issuedDate: new Date().toISOString().split("T")[0],
  expiryDate: "",

  productName: "Premium Product Name",
  productCategory: "Health & Wellness",
  productForm: "Capsules",
  description:
    "This is to certify that the above-mentioned product has been thoroughly inspected and meets all quality standards and specifications required for authenticity verification.",
  keyActiveIngredients: "Vitamin C, Zinc, Elderberry",
  dietaryCompliance: "Vegan, Gluten-Free",
  sideEffects: "None reported",
  cautions: "Consult a physician if pregnant",

  companyName: "Your Company Name",
  manufacturerAddress: "123 Business Rd, Innovation City",
  personName: "John Doe",
  role: "Quality Assurance Manager",
  location: "New York, USA",

  overallExpertRating: "9.8/10",
  safetyRating: "10/10",
  effectivenessRating: "9.5/10",
  ingredientsQualityRating: "9.9/10",
  certificationsQCRating: "10/10",
  valueForMoneyRating: "9.0/10",
  evidenceStrengthRating: "High",
  userExperienceRating: "Excellent",
  versatilityUseCaseFit: "Versatile",

  finalVerdict: "Highly Recommended",
  verificationStatement: "Verified by independent laboratory testing.",
  certificationsAndApprovals: "ISO 9001, COMPLIANCE CHECKED",
  thirdPartyTesting: "Passed",
  refundPolicy: "30-Day Money Back Guarantee",

  customerSupportEmail: "support@example.com",
  customerSupportPhone: "+1 (555) 123-4567",
  buyNowUrl: "https://example.com/buy",

  qrText: "",
  logo: "",
  signature: "",
  badge: "",
  watermark: "",
  showWatermark: false,
  selectedTemplate: 1,
});

export const useCertificateStore = create<CertificateStore>()(
  persist(
    (set) => ({
      certificateData: getInitialData(),
      _hasHydrated: false,
      updateField: (field, value) =>
        set((state) => ({
          certificateData: { ...state.certificateData, [field]: value },
        })),
      resetData: () => set({ certificateData: getInitialData() }),
      loadData: (data) => set({ certificateData: data }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "certificate-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
