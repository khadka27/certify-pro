import { CertificateTemplateProps } from "@/types/certificate";
import {
  Check,
  ShieldCheck,
  Globe,
  ShoppingCart,
  HelpCircle,
  AlertTriangle,
  FileCheck,
  RotateCcw,
} from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import QRCode from "qrcode";

export default function Template1({ data }: CertificateTemplateProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    if (data.qrText) {
      QRCode.toDataURL(data.qrText, {
        margin: 1,
        width: 100,
        color: {
          dark: "#1e3a8a",
          light: "#ffffff",
        },
      })
        .then((url: SetStateAction<string>) => setQrCodeUrl(url))
        .catch((err: any) => console.error("QR Code Error:", err));
    }
  }, [data.qrText]);

  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white relative box-border overflow-hidden flex flex-col font-sans text-slate-800">
      {/* Background Watermark */}
      {data.showWatermark && (data.watermark || data.logo) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
          <img
            src={data.watermark || data.logo}
            alt="Watermark"
            className="w-[600px] h-auto object-contain rotate-[-15deg] grayscale"
          />
        </div>
      )}

      {/* Header Section */}
      <div className="w-full relative z-10">
        {/* Navy Top Section */}
        <div className="bg-[#1e3a8a] text-white pt-10 pb-8 px-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>

          <div className="flex justify-between items-center relative z-10">
            <div className="w-full text-center">
              {data.logo && (
                <img
                  src={data.logo}
                  alt="Logo"
                  className="h-16 w-auto object-contain mx-auto mb-6 brightness-0 invert"
                />
              )}

              <h1 className="text-5xl font-black tracking-tighter uppercase mb-2 leading-none">
                {data.title || "QUALITY & COMPLIANCE CERTIFICATION"}
              </h1>
              <div className="flex justify-center items-center gap-6 mt-4">
                <p className="text-lg font-bold text-blue-200 uppercase tracking-widest">
                  {data.subTitle || data.productCategory}
                </p>
                <div className="h-4 w-0.5 bg-yellow-400/50"></div>
                <p className="text-lg font-mono font-black text-yellow-400">
                  {data.certNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Yellow Bottom Strip */}
        <div className="bg-[#fbbf24] py-5 px-12 text-center shadow-lg relative z-10">
          <div className="flex justify-center items-center gap-10">
            <div className="text-left border-r-2 border-[#1e3a8a]/20 pr-10">
              <p className="text-[10px] font-black text-[#1e3a8a]/60 uppercase tracking-widest">
                Product Entity
              </p>
              <h2 className="text-4xl font-black text-[#1e3a8a] leading-none uppercase tracking-tighter">
                {data.productName}
              </h2>
            </div>
            <div className="flex gap-10">
              <div className="text-left">
                <p className="text-[10px] font-black text-[#1e3a8a]/60 uppercase tracking-widest">
                  Composition
                </p>
                <p className="text-sm font-black text-[#1e3a8a]">
                  {data.productForm}
                </p>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-[#1e3a8a]/60 uppercase tracking-widest">
                  Origin
                </p>
                <p className="text-sm font-black text-[#1e3a8a] uppercase">
                  {data.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 px-12 py-10 grid grid-cols-12 gap-10 relative z-10">
        {/* Left Column */}
        <div className="col-span-7 space-y-8">
          {/* Key Active Ingredients Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-black text-[#1e3a8a] uppercase tracking-wider">
              Key Active Ingredients
            </h2>
            <div className="h-0.5 w-full bg-yellow-400"></div>
            <div className="space-y-3 pt-2">
              {data.keyActiveIngredients
                ?.split(/[,\s]+/)
                .filter(Boolean)
                .map((ingredient, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-400 stroke-[3px]" />
                    <span className="text-[13px] font-bold text-[#1e3a8a]/90 tracking-tight">
                      {ingredient.trim()}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Product Description Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-black text-[#1e3a8a] uppercase tracking-wider">
              Product Description
            </h2>
            <div className="h-0.5 w-full bg-yellow-400"></div>
            <div
              className="text-[12px] text-slate-700 leading-relaxed rich-text-content italic font-medium pt-1"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>

          {/* Manufacturing & Quality Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-black text-[#1e3a8a] uppercase tracking-wider">
              Manufacturing & Quality
            </h2>
            <div className="h-0.5 w-full bg-yellow-400"></div>
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-teal-400 stroke-[3px]" />
                <span className="text-[12px] font-bold text-[#1e3a8a]/80">
                  FDA Approved
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-teal-400 stroke-[3px]" />
                <span className="text-[12px] font-bold text-[#1e3a8a]/80">
                  GMP Certified
                </span>
              </div>
              <div className="pt-2 space-y-1">
                <p className="text-[12px] text-slate-700">
                  <span className="font-black text-[#1e3a8a]">
                    Third-Party Testing:
                  </span>{" "}
                  {data.thirdPartyTesting ||
                    "COA (Certificate of Analysis) available"}
                </p>
                <p className="text-[12px] text-slate-700">
                  <span className="font-black text-[#1e3a8a]">
                    Manufacturer:
                  </span>{" "}
                  {data.manufacturerName}
                </p>
              </div>
            </div>
          </div>

          {/* Dietary Compliance Section */}
          <div className="space-y-4 pt-6">
            <h2 className="text-[14px] font-black text-[#1e3a8a] uppercase tracking-wider">
              Dietary Compliance
            </h2>
            <div className="h-[2px] w-full bg-yellow-400"></div>
            <ul className="space-y-4 pt-2">
              {data.dietaryCompliance
                ?.split(/[,\s]+/)
                .filter(Boolean)
                .map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 group">
                    <Check className="h-4 w-4 text-teal-500 mt-0.5 shrink-0 stroke-[3px]" />
                    <span className="text-[14px] font-bold text-[#1e3a8a] tracking-tight leading-tight">
                      {item.trim()}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-5 space-y-8">
          {/* Expert Rating Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-black text-[#1e3a8a] uppercase tracking-wider">
              Expert Rating
            </h2>
            <div className="h-0.5 w-full bg-yellow-400"></div>

            <div className="bg-emerald-50/30 border-2 border-emerald-500/20 rounded-4xl p-8 text-center select-none shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full -mr-10 -mt-10"></div>
              <div className="flex justify-center gap-1.5 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <p className="text-7xl font-black text-[#1e3a8a] leading-none tracking-tighter">
                  {data.overallExpertRating}
                </p>
              </div>
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mt-3">
                Overall Expert Rating
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 pt-2">
              {[
                { label: "Safety", value: data.safetyRating },
                { label: "Effectiveness", value: data.effectivenessRating },
                { label: "Ingredients", value: data.ingredientsQualityRating },
                { label: "Certifications", value: data.certificationsQCRating },
                { label: "Value", value: data.valueForMoneyRating },
                { label: "Evidence", value: data.evidenceStrengthRating },
                { label: "User Experience", value: data.userExperienceRating },
                { label: "Versatility", value: data.versatilityUseCaseFit },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b border-slate-100 pb-1"
                >
                  <span className="text-[11px] font-bold text-[#1e3a8a]">
                    {item.label}
                  </span>
                  <span className="text-[11px] font-black text-slate-500">
                    {item.value}/10
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Policy Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-black text-[#1e3a8a] uppercase tracking-wider">
              Refund Policy
            </h2>
            <div className="h-0.5 w-full bg-yellow-400"></div>
            <div className="flex items-center gap-2 pt-1">
              <Check className="h-4 w-4 text-emerald-500" />
              <span className="text-[12px] font-bold text-slate-700 italic">
                {data.refundPolicy || "30-day money-back guarantee"}
              </span>
            </div>
          </div>
        </div>

        {/* New Row: Safety (Left) & Signature/Stamp (Right) */}
        <div className="col-span-12 grid grid-cols-12 gap-10 mt-6 border-t border-slate-100 pt-8">
          {/* Safety Information (Left Side) */}
          <div className="col-span-6">
            {(data.sideEffects || data.cautions) && (
              <div className="bg-amber-50/50 border-2 border-amber-500/20 rounded-2xl p-6 h-full shadow-sm">
                <div className="flex items-center gap-2 text-amber-700 mb-4">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-[13px] font-black uppercase tracking-[0.2em]">
                    Safety Information
                  </span>
                </div>
                <div className="space-y-4">
                  {data.sideEffects && (
                    <p className="text-[12px] leading-relaxed">
                      <span className="font-black text-amber-800 uppercase tracking-tighter">
                        Side Effects:
                      </span>{" "}
                      <span className="text-slate-700 font-medium italic opacity-90">
                        {data.sideEffects}
                      </span>
                    </p>
                  )}
                  {data.cautions && (
                    <p className="text-[12px] leading-relaxed">
                      <span className="font-black text-amber-800 uppercase tracking-tighter">
                        Cautions:
                      </span>{" "}
                      <span className="text-slate-700 font-medium italic opacity-90">
                        {data.cautions}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Signature & Stamp Section (Right Side) */}
          <div className="col-span-6 flex items-end justify-between pl-6">
            <div className="flex-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">
                Authorized Signature
              </p>
              <div className="relative min-h-[70px]">
                {data.signature && (
                  <img
                    src={data.signature}
                    alt="Sign"
                    className="h-20 w-auto object-contain mix-blend-multiply relative z-10"
                  />
                )}
                {data.badge && (
                  <img
                    src={data.badge}
                    alt="Stamp Overlay"
                    className="absolute -top-6 left-1/4 h-24 w-auto opacity-10 pointer-events-none grayscale"
                  />
                )}
              </div>
              <div className="w-full h-[3px] bg-[#1e3a8a] rounded-full mb-3 shadow-sm"></div>
              <p className="text-xl font-black text-[#1e3a8a] uppercase tracking-tighter leading-none">
                {data.personName}
              </p>
              <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mt-1.5 italic opacity-80">
                {data.role}
              </p>
            </div>

            {/* Stamp/Badge Image */}
            <div className="shrink-0 ml-4">
              {data.badge && (
                <img
                  src={data.badge}
                  alt="Badge"
                  className="h-32 w-auto object-contain drop-shadow-2xl"
                />
              )}
            </div>
          </div>
        </div>

        {/* Certification Verdict Banner */}
        <div className="col-span-12 mt-4">
          <div className="bg-blue-50/80 border-[3px] border-[#1e3a8a]/20 rounded-4xl p-10 text-center relative shadow-sm overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#1e3a8a] text-white px-8 py-2 rounded-b-2xl flex items-center gap-3 shadow-xl">
              <ShieldCheck className="h-5 w-5 text-yellow-400" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                Certification Verdict
              </span>
            </div>
            <p className="text-lg font-bold text-[#1e3a8a] leading-relaxed pt-4 max-w-4xl mx-auto">
              {data.verificationStatement ||
                "Product meets all quality, safety, and transparency benchmarks for certification."}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-auto px-12 py-10 bg-[#1e3a8a]/5 border-t-4 border-yellow-400 relative z-10">
        <div className="grid grid-cols-3 gap-10 text-center mb-10">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Certificate Number
            </p>
            <p className="text-xs font-black text-[#1e3a8a] tracking-tight">
              {data.certNumber}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Issue Date
            </p>
            <p className="text-xs font-black text-[#1e3a8a] tracking-tight">
              {data.issuedDate}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Valid Until
            </p>
            <p className="text-xs font-black text-[#1e3a8a] tracking-tight">
              {data.expiryDate || "N/A"}
            </p>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="space-y-6 pt-4 border-t border-slate-200">
          <p className="text-[9px] text-slate-400 tracking-wide leading-relaxed italic font-medium">
            <span className="font-black uppercase not-italic mr-1">
              Disclaimer:
            </span>
            This certification is based on publicly available research,
            third-party testing data, and manufacturing verification. It
            represents the analysis of DailyHealthSolutions and should not
            replace professional medical advice. FDA does not regulate dietary
            supplements identically to drugs. Consult a healthcare provider
            before use.
          </p>

          <div className="flex justify-between items-center opacity-70">
            <div className="flex items-center gap-3 grayscale">
              {data.logo && (
                <img
                  src={data.logo}
                  alt="Small Logo"
                  className="h-7 w-auto object-contain"
                />
              )}
              <div className="flex flex-col">
                <p className="text-[10px] font-black text-[#1e3a8a] uppercase tracking-wider">
                  DailyHealthSolutions.com
                </p>
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">
                  Independent Product Review Authority
                </p>
              </div>
              <div className="inline-flex items-center gap-2 bg-[#1e3a8a]/10 px-4 py-1.5 rounded-full border border-[#1e3a8a]/10 ml-4">
                <ShieldCheck className="h-4 w-4 text-[#1e3a8a]" />
                <p className="text-[10px] tracking-[0.2em] font-black text-[#1e3a8a] uppercase">
                  {data.certifiedBy ||
                    data.manufacturerName ||
                    "CERTIFIED AUTHORITY"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {qrCodeUrl && (
                <img
                  src={qrCodeUrl}
                  alt="Small QR"
                  className="h-10 w-10 opacity-30 grayscale"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
