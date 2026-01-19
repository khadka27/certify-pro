import { CertificateTemplateProps } from "@/types/certificate";

export default function Template11({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white p-8 relative box-border overflow-hidden text-slate-900 flex flex-col">
      <div className="absolute inset-4 border-8 border-blue-600 rounded-sm"></div>

      <div
        className="absolute inset-6 rounded-sm"
        style={{
          background:
            "repeating-linear-gradient(0deg, #2563eb 0px, #2563eb 2px, transparent 2px, transparent 6px), repeating-linear-gradient(90deg, #2563eb 0px, #2563eb 2px, transparent 2px, transparent 6px), repeating-linear-gradient(180deg, #2563eb 0px, #2563eb 2px, transparent 2px, transparent 6px), repeating-linear-gradient(270deg, #2563eb 0px, #2563eb 2px, transparent 2px, transparent 6px)",
          backgroundSize: "100% 16px, 16px 100%, 100% 16px, 16px 100%",
          backgroundPosition: "0 0, 0 0, 0 100%, 100% 0",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="relative z-10 flex-1 flex flex-col p-12 pt-8">
        <div className="flex items-start justify-between mb-6">
          {data.logo ? (
            <img
              src={data.logo}
              alt="Logo"
              className="h-16 w-auto object-contain"
            />
          ) : (
            <div className="h-16 w-16"></div>
          )}
          {data.badge && (
            <img src={data.badge} alt="Badge" className="h-20 w-auto" />
          )}
        </div>

        <div className="text-center space-y-3 mb-6">
          <h1 className="text-5xl font-bold text-blue-900 uppercase tracking-wide">
            {data.title}
          </h1>
          <p className="text-sm text-gray-600 uppercase tracking-widest">
            No: {data.certNumber}
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto space-y-6">
          <div
            className="text-base text-gray-700 leading-relaxed text-justify indent-8 rich-text-content"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-blue-900 font-semibold uppercase mb-1">
                  Product
                </p>
                <p className="text-base text-gray-800 font-medium">
                  {data.productName}
                </p>
                <p className="text-xs text-gray-600">
                  {data.productCategory} - {data.certificationStatus}
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-900 font-semibold uppercase mb-1">
                  Company
                </p>
                <p className="text-base text-gray-800 font-medium">
                  {data.companyName}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Ratings & Specs - Blue/Gold Theme */}
          <div className="mt-6 border-t border-blue-200 pt-4">
            <div className="grid grid-cols-2 gap-4 text-xs mb-4 text-left">
              <div className="space-y-1">
                <p>
                  <span className="font-semibold text-blue-900">
                    Ingredients:
                  </span>{" "}
                  {data.keyActiveIngredients}
                </p>
                <p>
                  <span className="font-semibold text-blue-900">Dietary:</span>{" "}
                  {data.dietaryCompliance}
                </p>
                <p>
                  <span className="font-semibold text-blue-900">Support:</span>{" "}
                  {data.customerSupportEmail}
                </p>
              </div>
              <div className="space-y-1">
                <p>
                  <span className="font-semibold text-blue-900">Mfr:</span>{" "}
                  {data.manufacturerAddress}
                </p>
                <p>
                  <span className="font-semibold text-blue-900">Verify:</span>{" "}
                  {data.verificationStatement}
                </p>
                <p>
                  <span className="font-semibold text-blue-900">Approved:</span>{" "}
                  {data.certificationsAndApprovals}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-t border-blue-200 p-2">
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                <div>
                  <span className="block text-[10px] uppercase text-gray-500 font-bold">
                    Overall
                  </span>
                  <span className="text-xl font-bold text-blue-900">
                    {data.overallExpertRating}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-gray-500 font-bold">
                    Safe
                  </span>
                  <span className="text-sm font-bold text-gray-700">
                    {data.safetyRating}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-gray-500 font-bold">
                    Qual
                  </span>
                  <span className="text-sm font-bold text-gray-700">
                    {data.ingredientsQualityRating}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-gray-500 font-bold">
                    Effect
                  </span>
                  <span className="text-sm font-bold text-gray-700">
                    {data.effectivenessRating}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-gray-500 font-bold">
                    Val
                  </span>
                  <span className="text-sm font-bold text-gray-700">
                    {data.valueForMoneyRating}
                  </span>
                </div>
              </div>
              <div className="mt-2 text-center border-t border-blue-200 pt-2">
                <span className="text-xs font-bold text-blue-900 uppercase">
                  Verdict: {data.finalVerdict}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase mb-1">Issue Date</p>
              <p className="text-sm font-semibold text-gray-800">
                {data.issuedDate}
              </p>
            </div>
            {data.expiryDate && (
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase mb-1">
                  Valid Until
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {data.expiryDate}
                </p>
              </div>
            )}
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase mb-1">Location</p>
              <p className="text-sm font-semibold text-gray-800">
                {data.location}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t-2 border-blue-200">
          <div className="flex items-end justify-between">
            <div className="text-left space-y-1">
              <p className="text-lg font-bold text-blue-900">
                {data.personName}
              </p>
              <p className="text-sm text-gray-600">{data.role}</p>
              <p className="text-xs text-gray-500">{data.companyName}</p>
            </div>

            {data.signature && (
              <div className="text-center">
                <img
                  src={data.signature}
                  alt="Signature"
                  className="h-16 w-auto mx-auto mb-2"
                />
                <div className="w-48 border-t-2 border-blue-900"></div>
                <p className="text-xs text-gray-500 uppercase mt-1">
                  Authorized Signature
                </p>
              </div>
            )}

            {data.badge && (
              <div className="flex flex-col items-center">
                <img
                  src={data.badge}
                  alt="Official Seal"
                  className="h-20 w-auto"
                />
                <p className="text-xs text-gray-500 mt-1">Official Seal</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
