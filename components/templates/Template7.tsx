import { CertificateTemplateProps } from "@/types/certificate";

export default function Template7({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-linear-to-br from-orange-50 to-amber-50 p-12 relative box-border overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-r from-orange-600 via-amber-500 to-orange-600"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-r from-orange-600 via-amber-500 to-orange-600"></div>

      <div className="relative z-10 flex-1 flex items-center justify-center pt-20 pb-20">
        <div className="bg-white rounded-3xl p-12 max-w-4xl w-full relative">
          <div className="flex items-center justify-between mb-8">
            {data.logo && (
              <img
                src={data.logo}
                alt="Logo"
                className="h-16 w-auto object-contain"
              />
            )}

            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">Certificate</p>
              <p className="font-bold text-orange-600">{data.certNumber}</p>
            </div>
          </div>

          <div className="text-center space-y-6 mb-8">
            <div className="inline-block">
              <h1 className="text-5xl font-bold bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {data.title}
              </h1>
              <div className="h-1 bg-linear-to-r from-orange-600 to-amber-600 mt-2"></div>
            </div>

            <div className="bg-linear-to-br from-orange-50 to-amber-50 p-6 rounded-xl">
              <div
                className="text-lg text-gray-700 leading-relaxed rich-text-content"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <p className="text-xs text-orange-600 uppercase font-semibold mb-1">
                Product
              </p>
              <p className="text-base font-bold text-gray-800">
                {data.productName}
              </p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg text-center">
              <p className="text-xs text-amber-600 uppercase font-semibold mb-1">
                Company
              </p>
              <p className="text-base font-bold text-gray-800">
                {data.manufacturerName}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <p className="text-xs text-orange-600 uppercase font-semibold mb-1">
                Location
              </p>
              <p className="text-base font-bold text-gray-800">
                {data.location}
              </p>
            </div>
          </div>

          {/* Detailed Ratings & Specs - Orange Theme */}
          <div className="mt-6 border-t border-orange-200 pt-4">
            <h3 className="text-sm font-bold text-orange-600 uppercase mb-3">
              Certification Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs mb-4 text-left">
              <div className="space-y-1">
                <p>
                  <span className="font-semibold text-orange-400">
                    Category:
                  </span>{" "}
                  {data.productCategory}
                </p>
                <p>
                  <span className="font-semibold text-orange-400">
                    Ingredients:
                  </span>{" "}
                  {data.keyActiveIngredients}
                </p>
                <p>
                  <span className="font-semibold text-orange-400">
                    Dietary:
                  </span>{" "}
                  {data.dietaryCompliance}
                </p>
                <p>
                  <span className="font-semibold text-orange-400">
                    Support:
                  </span>{" "}
                  {data.customerSupportEmail}
                </p>
              </div>
              <div className="space-y-1">
                <p>
                  <span className="font-semibold text-orange-400">Mfr:</span>{" "}
                  {data.manufacturerAddress}
                </p>
                <p>
                  <span className="font-semibold text-orange-400">Tests:</span>{" "}
                  {data.thirdPartyTesting}
                </p>
                <p>
                  <span className="font-semibold text-orange-400">
                    Approvals:
                  </span>{" "}
                  {data.certificationsAndApprovals}
                </p>
                <p>
                  <span className="font-semibold text-orange-400">
                    Verification:
                  </span>{" "}
                  {data.verificationStatement}
                </p>
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <div>
                  <span className="block font-bold text-orange-500">Value</span>
                  {data.valueForMoneyRating}
                </div>
                <div>
                  <span className="block font-bold text-orange-500">
                    Evidence
                  </span>
                  {data.evidenceStrengthRating}
                </div>
                <div>
                  <span className="block font-bold text-orange-500">QC</span>
                  {data.certificationsQCRating}
                </div>
                <div>
                  <span className="block font-bold text-orange-500">
                    User Exp
                  </span>
                  {data.userExperienceRating}
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-orange-200 text-center">
                <span className="text-xs font-bold text-orange-800 uppercase">
                  Final Verdict: {data.finalVerdict}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t-2 border-orange-200">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-800">
                {data.personName}
              </p>
              <p className="text-sm text-orange-600 font-medium">{data.role}</p>
              <div className="flex gap-4 text-xs text-gray-600 mt-3">
                <div>
                  <span className="font-semibold">Issued:</span>{" "}
                  {data.issuedDate}
                </div>
                {data.expiryDate && (
                  <div>
                    <span className="font-semibold">Expires:</span>{" "}
                    {data.expiryDate}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6">
              {data.signature && (
                <div className="text-center">
                  <img
                    src={data.signature}
                    alt="Signature"
                    className="h-16 w-auto mb-1"
                  />
                  <div className="w-40 border-t-2 border-orange-600"></div>
                  <p className="text-xs text-gray-500 mt-1">Signature</p>
                </div>
              )}

              {data.badge && (
                <img src={data.badge} alt="Badge" className="h-20 w-auto" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
