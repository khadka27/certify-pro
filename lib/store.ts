import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CertificateData } from "@/types/certificate";

interface CertificateStore {
  records: CertificateData[];
  activeRecordIndex: number;
  updateField: <K extends keyof CertificateData>(
    field: K,
    value: CertificateData[K],
  ) => void;
  updateGlobalField: <K extends keyof CertificateData>(
    field: K,
    value: CertificateData[K],
  ) => void;
  setRecords: (records: CertificateData[]) => void;
  setActiveRecordIndex: (index: number) => void;
  resetData: () => void;
  loadData: (data: CertificateData | CertificateData[]) => void;
  loadColumnarData: (data: any) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const getInitialData = (): CertificateData => ({
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

  manufacturerName: "Your Company Name",
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
  expertRating: "Highly Certified",
  selectedTemplate: 1,
});

// Fields that should be identical across all certificates in a batch
const GLOBAL_FIELDS: (keyof CertificateData)[] = [
  "title",
  "subTitle",
  "certifiedBy",
  "manufacturerName",
  "manufacturerAddress",
  "customerSupportEmail",
  "customerSupportPhone",
  "buyNowUrl",
  "refundPolicy",
  "personName",
  "role",
  "location",
  "logo",
  "signature",
  "badge",
  "watermark",
  "showWatermark",
  "selectedTemplate",
];

export const useCertificateStore = create<CertificateStore>()(
  persist(
    (set) => ({
      records: [getInitialData()],
      activeRecordIndex: 0,
      _hasHydrated: false,
      updateField: (field, value) =>
        set((state) => {
          const newRecords = [...state.records];
          newRecords[state.activeRecordIndex] = {
            ...newRecords[state.activeRecordIndex],
            [field]: value,
          };
          return { records: newRecords };
        }),
      updateGlobalField: (field, value) =>
        set((state) => ({
          records: state.records.map((r) => ({ ...r, [field]: value })),
        })),
      setRecords: (records) => set({ records, activeRecordIndex: 0 }),
      setActiveRecordIndex: (index) => set({ activeRecordIndex: index }),
      resetData: () =>
        set({ records: [getInitialData()], activeRecordIndex: 0 }),
      loadData: (data) =>
        set({
          records: Array.isArray(data) ? data : [data],
          activeRecordIndex: 0,
        }),
      loadColumnarData: (data) =>
        set((state) => {
          if (
            Array.isArray(data) &&
            data.length > 0 &&
            typeof data[0] === "object" &&
            !Array.isArray(data[0])
          ) {
            return { records: data, activeRecordIndex: 0 };
          }

          if (Array.isArray(data) && Array.isArray(data[0])) {
            const rows = data as string[][];
            const sampleData = getInitialData();
            const allPossibleKeys = Object.keys(sampleData);

            const headerMap: Record<string, string> = {
              "Certificate Title": "title",
              "Sub Title": "subTitle",
              "Certified By": "certifiedBy",
              "Certificate Number": "certNumber",
              "Certification Status": "certificationStatus",
              "Issue Date": "issuedDate",
              "Expiry Date": "expiryDate",
              "Valid Until": "expiryDate",
              "Product Name": "productName",
              Category: "productCategory",
              "Product Category": "productCategory",
              Form: "productForm",
              "Product Form": "productForm",
              Description: "description",
              "Product Description": "description",
              "Product Image": "productImage",
              Logo: "logo",
              "Company Logo": "logo",
              Signature: "signature",
              Badge: "badge",
              Stamp: "badge",
              Watermark: "watermark",
              "Key Ingredients": "keyActiveIngredients",
              "Key Active Ingredients": "keyActiveIngredients",
              Compliance: "dietaryCompliance",
              "Dietary Compliance": "dietaryCompliance",
              Manufacturer: "manufacturerName",
              "Company Name": "manufacturerName",
              "Manufacturer Name": "manufacturerName",
              "Manufacturer Address": "manufacturerAddress",
              "Support Email": "customerSupportEmail",
              "Customer Support Email": "customerSupportEmail",
              "Support Phone": "customerSupportPhone",
              "Customer Support Phone": "customerSupportPhone",
              "Buy Now URL": "buyNowUrl",
              "Refund Policy": "refundPolicy",
              "Signer Name": "personName",
              "Person Name": "personName",
              "Signer Role": "role",
              Role: "role",
              Location: "location",
              "Location (Origin)": "location",
              Origin: "location",
              "Expert Rating": "expertRating",
              "Final Verdict": "finalVerdict",
              "Final Certification Verdict": "finalVerdict",
              "Verification Statement": "verificationStatement",
            };

            const validRows = rows.filter((r) => r.length > 0 && r[0]?.trim());
            const numRecords =
              Math.max(...validRows.map((row) => row.length)) - 1;

            if (numRecords <= 0) return state;

            const mappedData = Array.from({ length: numRecords }, () => ({
              ...sampleData,
            }));

            rows.forEach((row) => {
              const rawKey = row[0]?.trim();
              if (!rawKey) return;

              let targetKey: string | undefined = headerMap[rawKey];

              // Fuzzy search for key if not in explicit map
              if (!targetKey) {
                const lowerKey = rawKey.toLowerCase();
                targetKey = allPossibleKeys.find(
                  (k) =>
                    k.toLowerCase() === lowerKey ||
                    lowerKey.includes(k.toLowerCase()),
                );
              }

              if (targetKey) {
                const key = targetKey as keyof CertificateData;
                const isGlobal = GLOBAL_FIELDS.includes(key);
                const rowValues = row
                  .slice(1)
                  .filter(
                    (v) => v !== undefined && v !== null && v.trim() !== "",
                  );
                const hasSingleValue = rowValues.length === 1;

                for (let i = 0; i < numRecords; i++) {
                  const val = row[i + 1]?.trim();
                  if (val !== undefined && val !== null && val !== "") {
                    (mappedData[i] as any)[key] = val;
                  } else if ((isGlobal || hasSingleValue) && rowValues[0]) {
                    (mappedData[i] as any)[key] = rowValues[0];
                  }
                }
              }
            });

            return { records: mappedData, activeRecordIndex: 0 };
          }

          return state;
        }),
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
