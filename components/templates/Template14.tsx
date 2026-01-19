import { CertificateTemplateProps } from "@/types/certificate";
import { Check } from "lucide-react";

export default function Template14({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white relative box-border overflow-hidden flex flex-col font-sans text-slate-800">
      {/* Header Section */}
      <div className="w-full">
        {/* Navy Top Section */}
        <div className="bg-[#1e3a8a] text-white pt-8 pb-6 px-12 relative overflow-hidden">
          <div className="flex justify-between items-center relative z-10">
            <div className="w-full text-center">
              <p className="text-sm tracking-[0.2em] font-medium uppercase opacity-90 mb-1">
                {data.companyName || "DAILYHEALTHSOLUTIONS.COM"}
              </p>
              <p className="text-xs tracking-wider opacity-70 mb-6">
                Independent Product Review Authority
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight uppercase mb-2">
                {data.title || "PRODUCT QUALITY & COMPLIANCE CERTIFICATION"}
              </h1>
              <p className="text-lg font-medium text-blue-200">
                {data.subTitle || data.productCategory}
              </p>
            </div>

            {/* Certification Badge */}
            {data.badge ? (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
                <img
                  src={data.badge}
                  alt="Badge"
                  className="h-28 w-28 object-contain"
                />
              </div>
            ) : (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
                <div className="rounded-full border-4 border-yellow-400 w-24 h-24 flex flex-col items-center justify-center text-yellow-400 bg-[#1e3a8a]">
                  <Check className="h-8 w-8 mb-1" />
                  <span className="text-[10px] font-bold">CERTIFIED</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Yellow Bottom Strip */}
        <div className="bg-[#fbbf24] py-4 px-12 text-center">
          <h2 className="text-4xl font-bold text-[#1e3a8a] mb-1">
            {data.productName}
          </h2>
          <p className="text-sm font-medium text-slate-700">
            {data.productForm}
            {data.location ? ` | ${data.location}` : ""}
          </p>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 px-12 py-8 grid grid-cols-12 gap-10">
        {/* Left Column (Content) */}
        <div className="col-span-7 space-y-6">
          {/* Active Ingredients */}
          <div>
            <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wider mb-2">
              Key Active Ingredients
            </h3>
            <div className="h-0.5 w-full bg-yellow-400 mb-4"></div>
            <div className="flex flex-wrap gap-2 text-xs">
              {data.keyActiveIngredients?.split(",").map((ing, i) => (
                <span
                  key={i}
                  className="bg-slate-100 px-3 py-1.5 rounded text-slate-700 font-medium"
                >
                  {ing.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Product Description */}
          <div>
            <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wider mb-2">
              Product Description
            </h3>
            <div className="h-0.5 w-full bg-yellow-400 mb-4"></div>
            <div
              className="text-sm text-slate-600 leading-relaxed rich-text-content"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>

          {/* Manufacturing & Quality */}
          <div>
            <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wider mb-2">
              Manufacturing & Quality
            </h3>
            <div className="h-0.5 w-full bg-yellow-400 mb-4"></div>
            <div className="space-y-2 text-sm text-slate-700">
              {data.certificationsAndApprovals?.split(",").map((cert, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>{cert.trim()}</span>
                </div>
              ))}
              <p className="mt-2 text-xs">
                <span className="font-bold text-[#1e3a8a]">
                  Third-Party Testing:
                </span>{" "}
                {data.thirdPartyTesting}
              </p>
              <p className="text-xs">
                <span className="font-bold text-[#1e3a8a]">Manufacturer:</span>{" "}
                {data.manufacturerAddress}
              </p>
            </div>
          </div>

          {/* Dietary Compliance */}
          <div>
            <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wider mb-2">
              Dietary Compliance
            </h3>
            <div className="h-0.5 w-full bg-yellow-400 mb-4"></div>
            <div className="space-y-1 text-sm text-slate-700">
              {data.dietaryCompliance?.split(",").map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>{item.trim()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Ratings & Verdict) */}
        <div className="col-span-5 space-y-6">
          {/* Expert Rating Box */}
          <div>
            <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wider mb-2">
              Expert Rating
            </h3>
            <div className="h-0.5 w-full bg-yellow-400 mb-4"></div>

            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6 text-center shadow-sm">
              <div className="flex justify-center gap-1 mb-2 text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-6xl font-black text-[#1e3a8a] mb-1">
                {data.overallExpertRating}
              </p>
              <p className="text-xs text-slate-500">Overall Expert Rating</p>
            </div>

            <div className="mt-4 space-y-3 px-2">
              {[
                { label: "Safety", value: data.safetyRating },
                { label: "Effectiveness", value: data.effectivenessRating },
                { label: "Ingredients", value: data.ingredientsQualityRating },
                { label: "Value", value: data.valueForMoneyRating },
                { label: "Evidence", value: data.evidenceStrengthRating },
                { label: "User Experience", value: data.userExperienceRating },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between text-xs border-b border-slate-100 pb-1"
                >
                  <span className="text-slate-600 font-medium">
                    {item.label}
                  </span>
                  <span className="text-slate-800 font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Policy */}
          <div>
            <h3 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-wider mb-2">
              Refund Policy
            </h3>
            <div className="h-0.5 w-full bg-yellow-400 mb-4"></div>
            <div className="flex items-start gap-2 text-sm text-slate-700">
              <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{data.refundPolicy}</span>
            </div>
          </div>

          {/* Safety Information */}
          <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-400">
            <h4 className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase mb-2">
              <span>⚠</span> Safety Information
            </h4>
            <div className="space-y-2 text-[10px] leading-relaxed text-amber-900">
              <p>
                <span className="font-bold">Side Effects:</span>{" "}
                {data.sideEffects}
              </p>
              <p>
                <span className="font-bold">Cautions:</span> {data.cautions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certification Verdict */}
      <div className="mx-12 mb-8">
        <div className="bg-blue-50 border-2 border-[#1e3a8a] rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Check className="h-5 w-5 text-[#1e3a8a]" />
            <h3 className="text-lg font-bold text-[#1e3a8a] uppercase">
              CERTIFICATION VERDICT
            </h3>
          </div>
          <p className="text-sm text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto">
            <span className="font-bold text-[#1e3a8a]">{data.productName}</span>{" "}
            — {data.verificationStatement}
          </p>
          <p className="text-xs text-slate-500 mt-2 italic">
            Reviewed by {data.personName}, {data.role}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 border-t-4 border-yellow-400 pt-6 pb-8 px-12">
        <div className="grid grid-cols-3 gap-8 text-center text-xs text-slate-500 mb-6 font-bold uppercase tracking-wider">
          <div>
            <p className="text-slate-400 text-[10px] mb-1">
              Certificate Number
            </p>
            <p className="text-[#1e3a8a] text-sm">{data.certNumber}</p>
          </div>
          <div>
            <p className="text-slate-400 text-[10px] mb-1">Issue Date</p>
            <p className="text-[#1e3a8a] text-sm">{data.issuedDate}</p>
          </div>
          <div>
            <p className="text-slate-400 text-[10px] mb-1">Valid Until</p>
            <p className="text-[#1e3a8a] text-sm">{data.expiryDate}</p>
          </div>
        </div>
        <p className="text-[9px] text-slate-400 text-center leading-relaxed max-w-4xl mx-auto">
          DISCLAIMER: This certification is based on publicly available
          research, third-party testing data, and manufacturing verification. It
          represents the analysis of {data.companyName} and should not replace
          professional medical advice. {data.companyName} does not regulate
          dietary supplements identically to drugs. Consult a healthcare
          provider before use.
        </p>
      </div>
    </div>
  );
}
