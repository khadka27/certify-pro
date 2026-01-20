import { CertificateTemplateProps } from "@/types/certificate";
import {
  Check,
  ShieldCheck,
  Globe,
  ShoppingCart,
  HelpCircle,
} from "lucide-react";

export default function Template1({ data }: CertificateTemplateProps) {
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
              <div className="inline-flex items-center gap-2 mb-3 bg-white/10 px-4 py-1 rounded-full border border-white/10">
                <ShieldCheck className="h-4 w-4 text-yellow-400" />
                <p className="text-[10px] tracking-[0.3em] font-black uppercase">
                  {data.manufacturerName || "CERTIFIED AUTHORITY"}
                </p>
              </div>
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
      <div className="flex-1 px-12 py-10 grid grid-cols-12 gap-12 relative z-10">
        {/* Left Column (Content) */}
        <div className="col-span-7 space-y-8">
          <div className="flex gap-8 items-start">
            {data.productImage && (
              <div className="shrink-0 bg-white border-2 border-slate-50 rounded-4xl p-4 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={data.productImage}
                  alt="Product"
                  className="w-32 h-32 object-contain relative z-10"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-xs font-black text-[#1e3a8a] uppercase tracking-widest mb-2 flex items-center gap-2">
                <Check className="h-3 w-3 text-emerald-500" />
                Record Analysis
              </h3>
              <div
                className="text-base text-slate-700 leading-relaxed rich-text-content italic font-medium"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4 font-bold text-xs text-slate-600">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[#1e3a8a] font-black mb-2 uppercase text-[9px]">
                  Ingredients Synergy
                </p>
                <p className="leading-relaxed">{data.keyActiveIngredients}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[#1e3a8a] font-black mb-2 uppercase text-[9px]">
                  Compliance Standards
                </p>
                <p>{data.dietaryCompliance}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[#1e3a8a] font-black mb-2 uppercase text-[9px]">
                  Manufacturing Entity
                </p>
                <p className="text-xs font-bold text-slate-900 leading-none">
                  {data.manufacturerName}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  {data.manufacturerAddress}
                </p>
                {data.companyUrl && (
                  <p className="text-[10px] text-blue-600 font-bold mt-2 flex items-center gap-1 uppercase tracking-tighter">
                    <Globe className="h-3 w-3" /> {data.companyUrl}
                  </p>
                )}
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[#1e3a8a] font-black mb-2 uppercase text-[9px]">
                  Global Assistance
                </p>
                <p className="text-xs font-bold text-slate-900 mb-1">
                  {data.customerSupportEmail}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <HelpCircle className="h-3 w-3" />
                  <span>{data.customerSupportPhone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 border-2 border-[#1e3a8a]/10 rounded-2xl p-6 relative">
            <div className="absolute top-0 right-0 bg-[#1e3a8a] text-white px-3 py-1 text-[8px] font-black rounded-bl-xl uppercase tracking-widest">
              Verdict Report
            </div>
            <p className="text-sm text-slate-700 font-bold leading-relaxed italic">
              "{data.verificationStatement}"
            </p>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#1e3a8a]/10">
              <p className="text-[10px] font-black text-[#1e3a8a] uppercase tracking-widest">
                Issued By: {data.personName}
              </p>
              <span className="text-xs font-black text-blue-700 uppercase tracking-tighter">
                {data.finalVerdict}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (Ratings & Verdict) */}
        <div className="col-span-5 space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden border-2 border-white/10 group">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent"></div>
            <h3 className="text-center text-blue-400 font-black uppercase text-[10px] tracking-widest mb-6">
              Expert Performance Index
            </h3>
            <div className="space-y-4">
              {[
                { l: "Safety Profile", v: data.safetyRating },
                { l: "Manufacturing QC", v: data.certificationsQCRating },
                { l: "Clinical Evidence", v: data.evidenceStrengthRating },
                { l: "Ingredients Qual.", v: data.ingredientsQualityRating },
                { l: "User Experience", v: data.userExperienceRating },
              ].map((m, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center group-hover:translate-x-1 transition-transform"
                >
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">
                    {m.l}
                  </span>
                  <span className="text-sm font-black text-white">{m.v}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-1">
                Overall Core Score
              </p>
              <p className="text-7xl font-black text-white leading-none tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                {data.overallExpertRating}
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            {data.buyNowUrl && (
              <a
                href={data.buyNowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#ffb300] text-white font-black py-4 rounded-2xl shadow-xl hover:bg-blue-800 transition-all uppercase tracking-tighter italic text-lg group text-center"
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                BUY NOW →
              </a>
            )}

            <div className="flex justify-between items-end gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <div className="flex-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  Auth. Signature
                </p>
                {data.signature && (
                  <img
                    src={data.signature}
                    alt="Sign"
                    className="h-14 w-auto object-contain mix-blend-multiply brightness-75 mb-1"
                  />
                )}
                <div className="w-full h-1 bg-[#1e3a8a] rounded-full"></div>
                <p className="text-sm font-black text-slate-900 uppercase mt-2 tracking-tighter leading-none">
                  {data.personName}
                </p>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1 italic">
                  {data.role}
                </p>
              </div>
              <div className="text-right flex flex-col items-end justify-between">
                {/* Certification Badge */}
                {data.badge && (
                  <div className="absolute right-20 bottom-[28px] -translate-y-1/2 translate-x-4">
                    <img
                      src={data.badge}
                      alt="Badge"
                      className="h-32 w-32 object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                    />
                  </div>
                )}
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                    Status
                  </p>
                  <p className="text-xs font-black text-emerald-600 uppercase mt-1 italic tracking-tighter">
                    AUTHENTICATED-PASS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 border-t-8 border-yellow-400 pt-8 pb-10 px-12 relative z-10 shadow-inner">
        <div className="grid grid-cols-3 gap-12 text-center text-xs text-slate-500 mb-8 font-black uppercase tracking-widest">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <p className="text-slate-400 text-[9px] mb-1">Control #</p>
            <p className="text-[#1e3a8a] text-sm font-mono tracking-widest">
              {data.certNumber}
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <p className="text-slate-400 text-[9px] mb-1">Activation</p>
            <p className="text-[#1e3a8a] text-sm uppercase">
              {data.issuedDate}
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <p className="text-slate-400 text-[9px] mb-1">Termination</p>
            <p className="text-[#1e3a8a] text-sm uppercase">
              {data.expiryDate}
            </p>
          </div>
        </div>
        <p className="text-[9px] text-slate-400 text-center leading-relaxed max-w-4xl mx-auto italic font-medium">
          LEGAL NOTICE: This certification document is issued following a
          comprehensive review of manufacturing standards, third-party
          laboratory audits ({data.thirdPartyTesting}), and ingredient
          verification protocols. It remains the intellectual property of{" "}
          {data.manufacturerName}. This certification is valid specifically for{" "}
          {data.productName} ({data.productForm}) and does not extend to other
          unregistered product lines. Authentication is verified as of the issue
          date.
        </p>
      </div>
    </div>
  );
}
