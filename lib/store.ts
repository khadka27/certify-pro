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
  bulkUpdateFields: (updates: Partial<CertificateData>) => void;
  bulkUpdateRecordFields: (
    indices: number[],
    updates: Partial<CertificateData>,
  ) => void;
  loadData: (data: CertificateData | CertificateData[]) => void;
  loadColumnarData: (data: any) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const getInitialData = (): CertificateData => ({
  title: "Certificate of Authenticity",
  subTitle: "Premium Verification",
  certifiedBy: "",
  certNumber: "",
  certificationStatus: "Active",
  issuedDate: "",
  expiryDate: "",

  productName: "",
  productCategory: "",
  productForm: "",
  description: "",
  keyActiveIngredients: "",
  dietaryCompliance: "",
  sideEffects: "",
  cautions: "",

  manufacturerName: "",
  companyName: "",
  companyUrl: "",
  manufacturerAddress: "",
  personName: "",
  role: "",
  location: "",

  overallExpertRating: "9.8",
  safetyRating: "10",
  effectivenessRating: "9.5",
  ingredientsQualityRating: "9.9",
  certificationsQCRating: "10",
  valueForMoneyRating: "9.0",
  evidenceStrengthRating: "9.5",
  userExperienceRating: "9.8",
  versatilityUseCaseFit: "9.7",

  finalVerdict: "",
  verificationStatement: "Verified by independent laboratory testing.",
  certificationsAndApprovals: "ISO 9001, COMPLIANCE CHECKED",
  thirdPartyTesting: "Passed",
  refundPolicy: "30-Day Money Back Guarantee",

  customerSupportEmail: "",
  customerSupportPhone: "",
  buyNowUrl: "",

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

const cleanText = (val: any): string => {
  if (val === undefined || val === null) return "";
  const str = String(val);
  return str
    .replace(/â€“/g, "-")
    .replace(/â€”/g, "-")
    .replace(/â€™/g, "'")
    .replace(/â€˜/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"')
    .replace(/â€/g, '"')
    .replace(/Ã©/g, "é")
    .replace(/Â/g, " ")
    .replace(/â€¦/g, "...")
    .trim();
};

// Converts Excel date serial (numbers like 46040) to YYYY-MM-DD
const parseExcelDate = (serial: any): string => {
  const n = parseFloat(serial);
  if (isNaN(n) || n < 20000 || n > 60000) return String(serial); // Not a reasonable Excel date serial

  // Excel dates are number of days since Dec 30, 1899
  const date = new Date(Math.round((n - 25569) * 86400 * 1000));
  return date.toISOString().split("T")[0];
};

const formatValue = (key: string, value: any): string => {
  let cleaned = cleanText(value);
  if (!cleaned) return "";

  // Handle Dates
  if (key === "issuedDate" || key === "expiryDate") {
    if (/^\d{5}(\.\d+)?$/.test(cleaned)) {
      return parseExcelDate(cleaned);
    }
    // If it's a date object string like "Wed Jan 21 2026..."
    if (
      isNaN(Number(cleaned)) &&
      !isNaN(Date.parse(cleaned)) &&
      !/^\d{4}-\d{2}-\d{2}$/.test(cleaned)
    ) {
      try {
        return new Date(cleaned).toISOString().split("T")[0];
      } catch (e) {
        return cleaned;
      }
    }
  }

  // Handle Numeric Ratings
  if (
    key.toLowerCase().includes("rating") ||
    key === "overallExpertRating" ||
    key === "versatilityUseCaseFit"
  ) {
    // Strip "/10", "/100", "%"
    return cleaned
      .replace(/\/100?$/, "")
      .replace(/%$/, "")
      .trim();
  }

  return cleaned;
};

// Comprehensive header mapping for all data loading methods
const HEADER_MAP: Record<string, string> = {
  "Certificate Title": "title",
  "Sub Title": "subTitle",
  "Certified By": "certifiedBy",
  "Certificate Number": "certNumber",
  "Certification Status": "certificationStatus",
  "Issue Date": "issuedDate",
  "Issue Date (UTC)": "issuedDate",
  "Valid Until": "expiryDate",
  "Expiry Date": "expiryDate",
  "Product Name": "productName",
  "Product Category": "productCategory",
  "Product Form": "productForm",
  "Product Description": "description",
  "Product Image": "productImage",
  "Certifications and Approvals": "certificationsAndApprovals",
  "Manufacturer Name": "manufacturerName",
  "Manufacturer Address": "manufacturerAddress",
  "Third-Party Testing": "thirdPartyTesting",
  "Key Active Ingredients": "keyActiveIngredients",
  "Key Ingredients": "keyActiveIngredients",
  "Dietary Compliance": "dietaryCompliance",
  "Side Effects (If Any)": "sideEffects",
  "Side Effects": "sideEffects",
  Cautions: "cautions",
  "Overall Expert Rating": "overallExpertRating",
  Safety: "safetyRating",
  Effectiveness: "effectivenessRating",
  "Ingredients Quality": "ingredientsQualityRating",
  "Certifications QC": "certificationsQCRating",
  "Value for Money": "valueForMoneyRating",
  "Evidence Strength": "evidenceStrengthRating",
  "User Experience": "userExperienceRating",
  "Versatility UseCaseFit": "versatilityUseCaseFit",
  "Refund Policy": "refundPolicy",
  "Customer Support Email": "customerSupportEmail",
  "Customer Support Phone": "customerSupportPhone",
  "Buy Now URL": "buyNowUrl",
  "Final Certification Verdict": "finalVerdict",
  "Final Verdict": "finalVerdict",
  "Verification Statement": "verificationStatement",
  "Expert Rating": "expertRating",
  "Signer Name": "personName",
  "Person Name": "personName",
  "Signer Role": "role",
  Role: "role",
  Stamp: "badge",
};

export const useCertificateStore = create<CertificateStore>()(
  persist(
    (set) => ({
      records: [getInitialData()],
      activeRecordIndex: 0,
      _hasHydrated: false,
      updateField: (field, value) =>
        set((state) => {
          const newRecords = [...state.records];
          // Auto-clean string values on update
          const cleanValue =
            typeof value === "string" ? cleanText(value) : value;
          newRecords[state.activeRecordIndex] = {
            ...newRecords[state.activeRecordIndex],
            [field]: cleanValue,
          };
          return { records: newRecords };
        }),
      updateGlobalField: (field, value) =>
        set((state) => ({
          records: state.records.map((r) => ({ ...r, [field]: value })),
        })),
      setRecords: (records) => set({ records, activeRecordIndex: 0 }),
      setActiveRecordIndex: (index) => set({ activeRecordIndex: index }),
      bulkUpdateFields: (updates) =>
        set((state) => ({
          records: state.records.map((r) => ({ ...r, ...updates })),
        })),
      bulkUpdateRecordFields: (indices, updates) =>
        set((state) => ({
          records: state.records.map((r, i) =>
            indices.includes(i) ? { ...r, ...updates } : r,
          ),
        })),
      resetData: () =>
        set({ records: [getInitialData()], activeRecordIndex: 0 }),
      loadData: (data) =>
        set((state) => {
          const dataArray = Array.isArray(data) ? data : [data];
          const sampleData = getInitialData();

          console.log("📥 LOADING CSV DATA INTO STORE");
          console.log("Raw data received:", dataArray);
          console.log("Number of records:", dataArray.length);

          // Merge imported data with default data structure
          const mergedRecords = dataArray.map((record) => {
            const merged = { ...sampleData };

            // Map each key in the record using HEADER_MAP
            Object.entries(record).forEach(([rawKey, value]) => {
              const trimmedKey = rawKey.trim();
              const targetKey =
                HEADER_MAP[trimmedKey] ||
                HEADER_MAP[trimmedKey.replace(/:$/, "").trim()] ||
                Object.keys(sampleData).find((k) => {
                  const kLow = k.toLowerCase();
                  const sLow = trimmedKey
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "");
                  return (
                    sLow.includes(kLow.replace(/[^a-z0-9]/g, "")) ||
                    kLow.replace(/[^a-z0-9]/g, "").includes(sLow)
                  );
                });

              if (targetKey && value !== undefined && value !== null) {
                (merged as any)[targetKey] = formatValue(targetKey, value);
              }
            });

            return merged;
          });

          console.log("✅ FINAL MERGED RECORDS:", mergedRecords);
          console.log("Setting activeRecordIndex to 0");

          return {
            records: mergedRecords,
            activeRecordIndex: 0,
          };
        }),
      loadColumnarData: (data) =>
        set((state) => {
          if (
            Array.isArray(data) &&
            data.length > 0 &&
            typeof data[0] === "object" &&
            !Array.isArray(data[0])
          ) {
            // Re-use loadData logic for JSON object arrays to ensure mapping
            const sampleData = getInitialData();
            const mappedRecords = data.map((record: any) => {
              const merged = { ...sampleData };
              Object.entries(record).forEach(([rawKey, value]) => {
                const trimmedKey = rawKey.trim();
                const targetKey =
                  HEADER_MAP[trimmedKey] ||
                  HEADER_MAP[trimmedKey.replace(/:$/, "").trim()] ||
                  Object.keys(sampleData).find((k) => {
                    const kLow = k.toLowerCase();
                    const sLow = trimmedKey
                      .toLowerCase()
                      .replace(/[^a-z0-9]/g, "");
                    return (
                      sLow.includes(kLow.replace(/[^a-z0-9]/g, "")) ||
                      kLow.replace(/[^a-z0-9]/g, "").includes(sLow)
                    );
                  });

                if (targetKey && value !== undefined && value !== null) {
                  (merged as any)[targetKey] = formatValue(targetKey, value);
                }
              });
              return merged;
            });
            return { records: mappedRecords, activeRecordIndex: 0 };
          }

          if (Array.isArray(data) && Array.isArray(data[0])) {
            const rows = data as string[][];
            const sampleData = getInitialData();
            const allPossibleKeys = Object.keys(sampleData);

            // 1. Detect Orientation
            // Check if headers are in the first row (Horizontal) or first column (Vertical)
            let horizontalHeaders: string[] = [];
            let isHorizontal = false;

            const firstRow = rows[0] || [];
            const firstCol = rows.map((r) => r[0] || "");

            const fuzzyMatchKey = (
              inputKey: string,
              possibleKeys: string[],
            ) => {
              const sLow = inputKey
                .normalize("NFC")
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "");
              if (!sLow) return undefined;

              return possibleKeys.find((k) => {
                const kLow = k.toLowerCase().replace(/[^a-z0-9]/g, "");
                return (
                  sLow === kLow || sLow.includes(kLow) || kLow.includes(sLow)
                );
              });
            };

            const countMatches = (keys: string[]) => {
              return keys.filter((h) => {
                const trimmed = h.trim();
                const normalized = trimmed.normalize("NFC");
                return (
                  HEADER_MAP[normalized] ||
                  HEADER_MAP[normalized.replace(/:$/, "").trim()] ||
                  fuzzyMatchKey(normalized, allPossibleKeys)
                );
              }).length;
            };
            const horizontalMatches = countMatches(firstRow);
            const verticalMatches = countMatches(firstCol);

            // Prioritize horizontal if matches are equal or horizontal has more
            isHorizontal =
              horizontalMatches >= verticalMatches && horizontalMatches > 0;

            let mappedData: CertificateData[] = [];

            if (isHorizontal) {
              console.log("Detecting HORIZONTAL layout (Headers in first row)");
              // Horizontal Mapping (Headers in first row, data in subsequent rows)
              horizontalHeaders = firstRow.map((h) =>
                h.trim().normalize("NFC"),
              );
              const dataRows = rows.slice(1);

              mappedData = dataRows.map((row, rIdx) => {
                const merged = { ...sampleData };
                horizontalHeaders.forEach((rawHeader, idx) => {
                  const value = row[idx];
                  if (
                    value === undefined ||
                    value === null ||
                    String(value).trim() === ""
                  )
                    return;

                  const normalizedHeader = rawHeader.normalize("NFC");
                  const targetKey =
                    HEADER_MAP[normalizedHeader] ||
                    HEADER_MAP[normalizedHeader.replace(/:$/, "").trim()] ||
                    fuzzyMatchKey(normalizedHeader, allPossibleKeys);

                  if (targetKey) {
                    (merged as any)[targetKey] = formatValue(targetKey, value);
                  }
                });
                return merged;
              });
            } else {
              console.log(
                "Detecting VERTICAL layout (Headers in first column)",
              );
              const validRows = rows.filter(
                (r) => r.length > 0 && r[0]?.trim(),
              );
              const numRecords =
                Math.max(...validRows.map((row) => row.length)) - 1;

              if (numRecords <= 0) return state;

              mappedData = Array.from({ length: numRecords }, () => ({
                ...sampleData,
              }));

              rows.forEach((row) => {
                const rawKey = row[0]?.trim();
                if (!rawKey) return;

                let targetKey: string | undefined =
                  HEADER_MAP[rawKey] ||
                  HEADER_MAP[rawKey.replace(/:$/, "").trim()];

                if (!targetKey) {
                  targetKey = fuzzyMatchKey(rawKey, allPossibleKeys);
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
                      (mappedData[i] as any)[key] = formatValue(key, val);
                    } else if ((isGlobal || hasSingleValue) && rowValues[0]) {
                      (mappedData[i] as any)[key] = formatValue(
                        key,
                        rowValues[0],
                      );
                    }
                  }
                }
              });
            }

            // Post-processing: Auto-calculate Expiry Date and Overall Rating if missing
            mappedData.forEach((record) => {
              if (record.issuedDate && !record.expiryDate) {
                const parts = record.issuedDate.split("-");
                if (parts.length === 3) {
                  const year = parseInt(parts[0]);
                  if (!isNaN(year))
                    record.expiryDate = `${year + 3}-${parts[1]}-${parts[2]}`;
                }
              }

              if (!record.overallExpertRating) {
                const ratings = [
                  "safetyRating",
                  "effectivenessRating",
                  "ingredientsQualityRating",
                  "certificationsQCRating",
                  "valueForMoneyRating",
                  "evidenceStrengthRating",
                  "userExperienceRating",
                  "versatilityUseCaseFit",
                ];
                let sum = 0,
                  count = 0;
                ratings.forEach((key) => {
                  const val = parseFloat((record as any)[key]);
                  if (!isNaN(val) && val > 0) {
                    sum += val;
                    count++;
                  }
                });
                if (count > 0)
                  record.overallExpertRating = (sum / count).toFixed(1);
              }
            });

            // Filter out empty records (e.g. from empty trailing rows in Excel/CSV)
            const filteredData = mappedData.filter(
              (record) =>
                record.productName.trim() !== "" ||
                record.certNumber.trim() !== "" ||
                record.manufacturerName.trim() !== "",
            );

            // If everything was filtered out, keep at least one empty record
            const finalData =
              filteredData.length > 0 ? filteredData : [sampleData];

            return { records: finalData, activeRecordIndex: 0 };
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
