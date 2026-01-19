import { CertificateTemplateProps } from "@/types/certificate";

export default function Template3({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-16 relative box-border overflow-hidden flex flex-col">
      <div className="absolute inset-8 border-2 border-amber-500/30"></div>
      <div className="absolute inset-12 border border-amber-500/20"></div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center space-y-8 py-4">
        {data.logo && (
          <img
            src={data.logo}
            alt="Logo"
            className="h-20 w-auto object-contain brightness-0 invert opacity-90"
          />
        )}

        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-linear-to-r from-transparent to-amber-500"></div>
            <h1 className="text-5xl font-serif font-bold text-amber-400 tracking-widest uppercase">
              {data.title}
            </h1>
            <div className="w-16 h-px bg-linear-to-l from-transparent to-amber-500"></div>
          </div>

          <div className="w-32 h-1 bg-amber-500 mx-auto"></div>
        </div>

        <div className="bg-amber-900/30 backdrop-blur-sm p-6 rounded-lg border border-amber-500/20 max-w-2xl mx-auto">
          <div
            className="text-lg text-amber-200/90 leading-relaxed italic rich-text-content"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>

        <div className="grid grid-cols-2 gap-8 max-w-2xl w-full">
          <div className="text-left border-l-2 border-amber-500 pl-4">
            <p className="text-xs text-amber-400 uppercase tracking-wider mb-1">
              Product
            </p>
            <p className="text-xl font-semibold text-white">
              {data.productName}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {data.productCategory} | {data.productForm}
            </p>
          </div>
          <div className="text-left border-l-2 border-amber-500 pl-4">
            <p className="text-xs text-amber-400 uppercase tracking-wider mb-1">
              Certificate No & Status
            </p>
            <p className="text-xl font-semibold text-white">
              {data.certNumber}
            </p>
            <p className="text-xs text-green-400 mt-1">
              {data.certificationStatus}
            </p>
          </div>
        </div>

        {/* New Ratings Section */}
        <div className="bg-slate-800/50 p-4 border border-slate-700 rounded w-full max-w-2xl">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <span className="block text-xs text-amber-500 uppercase">
                Overall
              </span>
              <span className="text-lg font-bold text-white">
                {data.overallExpertRating || "N/A"}
              </span>
            </div>
            <div>
              <span className="block text-xs text-slate-400 uppercase">
                Safety
              </span>
              <span className="text-sm text-gray-200">
                {data.safetyRating || "-"}
              </span>
            </div>
            <div>
              <span className="block text-xs text-slate-400 uppercase">
                Quality
              </span>
              <span className="text-sm text-gray-200">
                {data.ingredientsQualityRating || "-"}
              </span>
            </div>
            <div>
              <span className="block text-xs text-slate-400 uppercase">
                Use Case
              </span>
              <span className="text-sm text-gray-200">
                {data.versatilityUseCaseFit || "-"}
              </span>
            </div>
          </div>
          {data.keyActiveIngredients && (
            <div className="mt-3 pt-3 border-t border-slate-700 text-left text-xs">
              <span className="text-amber-500 font-bold uppercase mr-2">
                Ingredients:
              </span>
              <span className="text-slate-300">
                {data.keyActiveIngredients}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2 pt-6">
          <p className="text-2xl font-bold text-amber-300">{data.personName}</p>
          <p className="text-base text-slate-300">{data.role}</p>
          <p className="text-sm text-slate-400">{data.companyName}</p>
        </div>

        {/* Detailed Ratings & Specs - Adapted for Dark/Amber Theme */}
        <div className="mt-8 border-t border-slate-700 pt-6 w-full max-w-2xl">
          <div className="grid grid-cols-2 gap-8 text-xs text-slate-300 mb-6">
            <div>
              <h4 className="text-amber-500 font-bold uppercase mb-2">
                Specifications
              </h4>
              <div className="space-y-1">
                <p>
                  <span className="text-slate-500">Form:</span>{" "}
                  {data.productForm}
                </p>
                <p>
                  <span className="text-slate-500">Dietary:</span>{" "}
                  {data.dietaryCompliance}
                </p>
                <p>
                  <span className="text-slate-500">Side Effects:</span>{" "}
                  {data.sideEffects}
                </p>
                <p>
                  <span className="text-slate-500">Cautions:</span>{" "}
                  {data.cautions}
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-amber-500 font-bold uppercase mb-2">
                Verification
              </h4>
              <div className="space-y-1">
                <p>
                  <span className="text-slate-500">Mfr:</span>{" "}
                  {data.manufacturerAddress}
                </p>
                <p>
                  <span className="text-slate-500">Testing:</span>{" "}
                  {data.thirdPartyTesting}
                </p>
                <p>
                  <span className="text-slate-500">Approvals:</span>{" "}
                  {data.certificationsAndApprovals}
                </p>
                <p>
                  <span className="text-slate-500">Support:</span>{" "}
                  {data.customerSupportEmail}
                </p>
                <p>
                  <span className="text-slate-500">Buy:</span> {data.buyNowUrl}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded border border-slate-700">
            <h4 className="text-amber-500 font-bold uppercase mb-3 text-center text-xs">
              Full Expert Analysis
            </h4>
            <div className="grid grid-cols-4 gap-2 text-[10px] text-center text-slate-300">
              <div className="bg-slate-900/50 p-2 rounded">
                <span className="block text-slate-500">Safety</span>
                <span className="font-bold text-white">
                  {data.safetyRating}
                </span>
              </div>
              <div className="bg-slate-900/50 p-2 rounded">
                <span className="block text-slate-500">Efficacy</span>
                <span className="font-bold text-white">
                  {data.effectivenessRating}
                </span>
              </div>
              <div className="bg-slate-900/50 p-2 rounded">
                <span className="block text-slate-500">Quality</span>
                <span className="font-bold text-white">
                  {data.ingredientsQualityRating}
                </span>
              </div>
              <div className="bg-slate-900/50 p-2 rounded">
                <span className="block text-slate-500">QC</span>
                <span className="font-bold text-white">
                  {data.certificationsQCRating}
                </span>
              </div>
              <div className="bg-slate-900/50 p-2 rounded">
                <span className="block text-slate-500">Value</span>
                <span className="font-bold text-white">
                  {data.valueForMoneyRating}
                </span>
              </div>
              <div className="bg-slate-900/50 p-2 rounded">
                <span className="block text-slate-500">Evidence</span>
                <span className="font-bold text-white">
                  {data.evidenceStrengthRating}
                </span>
              </div>
              <div className="bg-slate-900/50 p-2 rounded">
                <span className="block text-slate-500">User Exp</span>
                <span className="font-bold text-white">
                  {data.userExperienceRating}
                </span>
              </div>
              <div className="bg-slate-900/50 p-2 rounded">
                <span className="block text-slate-500">Versatility</span>
                <span className="font-bold text-white">
                  {data.versatilityUseCaseFit}
                </span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-400 uppercase">
                Verdict: {data.verificationStatement}
              </p>
              <p className="text-lg font-bold text-amber-400 uppercase mt-1">
                {data.finalVerdict}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full max-w-3xl mt-8 pt-8 border-t border-amber-500/30">
          <div className="text-left">
            <p className="text-xs text-amber-400 uppercase">Issued</p>
            <p className="font-medium text-slate-200">{data.issuedDate}</p>
            {data.expiryDate && (
              <>
                <p className="text-xs text-amber-400 uppercase mt-2">Expires</p>
                <p className="font-medium text-slate-200">{data.expiryDate}</p>
              </>
            )}
          </div>

          {data.signature && (
            <div className="text-center">
              <img
                src={data.signature}
                alt="Signature"
                className="h-16 w-auto brightness-0 invert opacity-80"
              />
              <div className="w-48 border-t border-amber-500"></div>
              <p className="text-xs text-slate-400 mt-1">
                Authorized Signature
              </p>
            </div>
          )}

          {data.badge && (
            <img
              src={data.badge}
              alt="Badge"
              className="h-20 w-auto brightness-0 invert opacity-80"
            />
          )}

          <div className="text-right">
            <p className="text-xs text-amber-400 uppercase">Location</p>
            <p className="font-medium text-slate-200">{data.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
