import { CertificateTemplateProps } from "@/types/certificate";

export default function Template12({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white p-12 relative box-border overflow-hidden text-black flex flex-col font-serif select-none">
      {/* 1. Header with Logo and Title */}
      <div className="flex justify-between items-start mb-6 border-b-2 border-red-800 pb-4">
        <div className="flex items-center gap-4">
          {data.logo ? (
            <img
              src={data.logo}
              alt="Logo"
              className="h-20 w-auto object-contain"
            />
          ) : (
            <div className="w-16 h-16 rounded-full border-4 border-red-800 flex items-center justify-center">
              <span className="text-red-800 font-bold text-xs text-center leading-none">
                OFFICIAL
                <br />
                SEAL
              </span>
            </div>
          )}
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-red-900 leading-none">
              {data.title || "Product Certificate"}
            </h1>
            <p className="text-sm font-bold text-gray-600 uppercase tracking-widest mt-1">
              {data.subTitle || "Official Certification Document"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Certificate Number
          </p>
          <p className="text-xl font-mono font-bold text-red-600">
            {data.certNumber}
          </p>
          <p className="text-xs font-bold text-gray-500 mt-1">
            Status:{" "}
            <span className="text-green-600">
              {data.certificationStatus || "Active"}
            </span>
          </p>
        </div>
      </div>

      <div className="flex gap-8 flex-1">
        {/* Left Column: Product & Manufacturer Details */}
        <div className="w-2/3 space-y-6">
          {/* Statement */}
          <div className="bg-slate-50 p-4 border-l-4 border-red-800">
            <p className="text-sm italic text-gray-700 leading-relaxed">
              "
              {data.verificationStatement ||
                "This document uses rigorous testing and analysis to certify the authenticity and quality of the product described herein."}
              "
            </p>
          </div>

          {/* Product Details Grid */}
          <div>
            <h3 className="text-sm font-black uppercase text-red-900 border-b border-gray-200 mb-3 pb-1">
              Product Specifications
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <span className="font-bold text-gray-500 text-xs uppercase block">
                  Product Name
                </span>
                <span className="font-semibold">{data.productName}</span>
              </div>
              <div>
                <span className="font-bold text-gray-500 text-xs uppercase block">
                  Category
                </span>
                <span className="font-semibold">
                  {data.productCategory || "N/A"}
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-500 text-xs uppercase block">
                  Form
                </span>
                <span className="font-semibold">
                  {data.productForm || "N/A"}
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-500 text-xs uppercase block">
                  Certified By
                </span>
                <span className="font-semibold">
                  {data.certifiedBy || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Ingredients & Usage */}
          <div>
            <h3 className="text-sm font-black uppercase text-red-900 border-b border-gray-200 mb-3 pb-1">
              Composition & Compliance
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-bold text-gray-500 text-xs uppercase block">
                  Key Active Ingredients
                </span>
                <p className="font-medium text-gray-800">
                  {data.keyActiveIngredients || "N/A"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-bold text-gray-500 text-xs uppercase block">
                    Dietary Compliance
                  </span>
                  <p className="font-medium">
                    {data.dietaryCompliance || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="font-bold text-gray-500 text-xs uppercase block">
                    Certifications
                  </span>
                  <p className="font-medium">
                    {data.certificationsAndApprovals || "N/A"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-bold text-gray-500 text-xs uppercase block">
                    Cautions
                  </span>
                  <p className="text-xs text-red-600 font-medium">
                    {data.cautions || "None"}
                  </p>
                </div>
                <div>
                  <span className="font-bold text-gray-500 text-xs uppercase block">
                    Side Effects
                  </span>
                  <p className="text-xs text-gray-600 font-medium">
                    {data.sideEffects || "None reported"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Verify Description */}
          <div>
            <h3 className="text-sm font-black uppercase text-red-900 border-b border-gray-200 mb-2 pb-1">
              Description & Analysis
            </h3>
            <div
              className="text-xs text-gray-600 leading-relaxed text-justify rich-text-content"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>

          {/* Manufacturer Info */}
          <div className="bg-gray-50 p-3 rounded border border-gray-200 mt-4">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-gray-500 block">
                  MANUFACTURER
                </span>
                <span className="font-bold text-gray-900">
                  {data.companyName}
                </span>
                <p className="text-gray-600">{data.manufacturerAddress}</p>
              </div>
              <div>
                <span className="font-bold text-gray-500 block">SUPPORT</span>
                <p className="text-gray-900">{data.customerSupportEmail}</p>
                <p className="text-gray-900">{data.customerSupportPhone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Ratings & Verdict */}
        <div className="w-1/3 flex flex-col gap-4">
          {/* Ratings Card */}
          <div className="bg-slate-900 text-white p-5 rounded-lg shadow-lg">
            <h3 className="text-center font-bold text-amber-400 uppercase tracking-widest text-sm mb-4">
              Expert Ratings
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-1">
                <span className="text-slate-300">Safety</span>
                <span className="font-bold text-amber-400">
                  {data.safetyRating || "-"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-1">
                <span className="text-slate-300">Effectiveness</span>
                <span className="font-bold text-amber-400">
                  {data.effectivenessRating || "-"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-1">
                <span className="text-slate-300">Quality</span>
                <span className="font-bold text-amber-400">
                  {data.ingredientsQualityRating || "-"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-1">
                <span className="text-slate-300">Value</span>
                <span className="font-bold text-amber-400">
                  {data.valueForMoneyRating || "-"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-1">
                <span className="text-slate-300">Certifications QC</span>
                <span className="font-bold text-amber-400">
                  {data.certificationsQCRating || "-"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-1">
                <span className="text-slate-300">Evidence Strength</span>
                <span className="font-bold text-amber-400">
                  {data.evidenceStrengthRating || "-"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-1">
                <span className="text-slate-300">User Exp.</span>
                <span className="font-bold text-amber-400">
                  {data.userExperienceRating || "-"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-1">
                <span className="text-slate-300">Versatility</span>
                <span className="font-bold text-amber-400">
                  {data.versatilityUseCaseFit || "-"}
                </span>
              </div>

              <div className="pt-2 text-center">
                <span className="block text-xs text-slate-400 uppercase mb-1">
                  Overall Rating
                </span>
                <span className="text-4xl font-black text-white">
                  {data.overallExpertRating || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Verdict Badge */}
          <div className="bg-red-50 border-2 border-red-100 p-4 rounded-lg text-center">
            <span className="block text-xs font-bold text-red-900 uppercase tracking-widest mb-1">
              Final Verdict
            </span>
            <span className="block text-xl font-black text-red-600 uppercase leading-tight">
              {data.finalVerdict || "RECOMMENDED"}
            </span>
            <span className="block text-[10px] text-red-800/70 mt-2 font-medium">
              {data.thirdPartyTesting
                ? `Testing: ${data.thirdPartyTesting}`
                : ""}
            </span>
          </div>

          {/* QR & Sign */}
          <div className="mt-auto space-y-4">
            {data.qrText && (
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-white p-1 border border-gray-200">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.qrText)}`}
                    alt="QR Code"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="text-center">
              {data.signature && (
                <img
                  src={data.signature}
                  alt="Signature"
                  className="h-12 mx-auto object-contain mix-blend-multiply mb-1"
                />
              )}
              <div className="border-t border-gray-800 w-24 mx-auto"></div>
              <p className="text-xs font-bold uppercase mt-1">
                {data.personName}
              </p>
              <p className="text-[10px] text-gray-500">{data.role}</p>
            </div>

            {/* Official Seal Mockup */}
            <div className="flex justify-center pt-2">
              <div className="w-24 h-24 rounded-full border-4 border-red-800/30 flex items-center justify-center p-1">
                <div className="w-full h-full rounded-full border border-red-800/50 flex flex-col items-center justify-center text-red-900/50 leading-none">
                  <span className="text-[8px] font-black">OFFICIAL</span>
                  <span className="text-[8px] font-black">PASSED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-end text-[10px] text-gray-500">
        <div>
          <p>Issued by: {data.companyName}</p>
          <p>
            Date: {data.issuedDate}{" "}
            {data.expiryDate && `| Valid Until: ${data.expiryDate}`}
          </p>
          <p>{data.manufacturerAddress}</p>
        </div>
        <div className="text-right">
          <p className="font-medium text-red-600">{data.refundPolicy}</p>
          <p>{data.buyNowUrl}</p>
        </div>
      </div>
    </div>
  );
}
