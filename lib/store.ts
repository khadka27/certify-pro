import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CertificateData } from '@/types/certificate';

interface CertificateStore {
  certificateData: CertificateData;
  updateField: <K extends keyof CertificateData>(field: K, value: CertificateData[K]) => void;
  resetData: () => void;
  loadData: (data: CertificateData) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

const getInitialData = (): CertificateData => ({
  title: 'Certificate of Authenticity',
  productName: 'Premium Product Name',
  certNumber: 'CERT-2026-0001',
  issuedDate: new Date().toISOString().split('T')[0],
  expiryDate: '',
  companyName: 'Your Company Name',
  personName: 'John Doe',
  role: 'Quality Assurance Manager',
  description: 'This is to certify that the above-mentioned product has been thoroughly inspected and meets all quality standards and specifications required for authenticity verification.',
  location: 'New York, USA',
  qrText: '',
  logo: '',
  signature: '',
  badge: '',
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
      name: 'certificate-storage',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
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
    }
  )
);
