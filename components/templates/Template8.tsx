import { CertificateTemplateProps } from "@/types/certificate";

export default function Template8({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white relative shadow-2xl box-border overflow-hidden flex flex-col">
      <div className="absolute top-8 left-8 w-32 h-32 border-t-4 border-l-4 border-teal-600"></div>
      <div className="absolute top-8 right-8 w-32 h-32 border-t-4 border-r-4 border-teal-600"></div>
      <div className="absolute bottom-8 left-8 w-32 h-32 border-b-4 border-l-4 border-teal-600"></div>
      <div className="absolute bottom-8 right-8 w-32 h-32 border-b-4 border-r-4 border-teal-600"></div>

      <div className="relative z-10 flex-1 flex flex-col p-12 py-4">
        <div className="flex items-start justify-between mb-12">
          <div className="space-y-2">
            {data.logo && (
              <img
                src={data.logo}
                alt="Logo"
                className="h-20 w-auto object-contain"
              />
            )}
            <p className="text-sm text-gray-600">{data.manufacturerName}</p>
            <p className="text-xs text-gray-500">{data.location}</p>
          </div>

          {data.badge && (
            <img src={data.badge} alt="Badge" className="h-24 w-auto" />
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center text-center space-y-8">
          <div>
            <p className="text-sm text-teal-600 uppercase tracking-widest font-semibold mb-3">
              Official Certificate
            </p>
            <h1 className="text-6xl font-bold text-gray-800 mb-4">
              {data.title}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-24 bg-teal-600"></div>
              <div className="w-2 h-2 rounded-full bg-teal-600"></div>
              <div className="h-px w-24 bg-teal-600"></div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-teal-50 border-x-4 border-teal-600 p-8 my-8 shadow-inner">
              <div
                className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto rich-text-content"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-left p-4 border-l-4 border-teal-600 bg-teal-50">
                <p className="text-xs text-teal-700 uppercase font-semibold mb-1">
                  Product
                </p>
                <p className="text-xl font-bold text-gray-800">
                  {data.productName}
                </p>
                <p className="text-xs text-gray-600">{data.productCategory}</p>
              </div>
              <div className="text-left p-4 border-l-4 border-teal-600 bg-teal-50">
                <p className="text-xs text-teal-700 uppercase font-semibold mb-1">
                  Certificate No
                </p>
                <p className="text-xl font-bold text-gray-800">
                  {data.certNumber}
                </p>
                <span className="text-xs font-bold text-teal-600 uppercase">
                  {data.certificationStatus}
                </span>
              </div>
            </div>

            {/* Detailed Ratings & Specs - Teal Theme */}
            <div className="mt-4 border-t border-teal-200 pt-4 text-left">
              <h3 className="text-sm font-bold text-teal-700 uppercase mb-3 text-center">
                Certification Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold text-teal-600">
                      Ingredients:
                    </span>{" "}
                    {data.keyActiveIngredients}
                  </p>
                  <p>
                    <span className="font-semibold text-teal-600">
                      Dietary:
                    </span>{" "}
                    {data.dietaryCompliance}
                  </p>
                  <p>
                    <span className="font-semibold text-teal-600">
                      Support:
                    </span>{" "}
                    {data.customerSupportEmail}
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold text-teal-600">Mfr:</span>{" "}
                    {data.manufacturerAddress}
                  </p>
                  <p>
                    <span className="font-semibold text-teal-600">Status:</span>{" "}
                    {data.certificationStatus}
                  </p>
                  <p>
                    <span className="font-semibold text-teal-600">Verify:</span>{" "}
                    {data.verificationStatement}
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded p-4 border border-teal-200 text-center">
                <div className="grid grid-cols-4 gap-2 text-[10px]">
                  <div>
                    <span className="block font-bold text-teal-700">Value</span>
                    {data.valueForMoneyRating}
                  </div>
                  <div>
                    <span className="block font-bold text-teal-700">
                      Evidence
                    </span>
                    {data.evidenceStrengthRating}
                  </div>
                  <div>
                    <span className="block font-bold text-teal-700">QC</span>
                    {data.certificationsQCRating}
                  </div>
                  <div>
                    <span className="block font-bold text-teal-700">
                      User Exp
                    </span>
                    {data.userExperienceRating}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-teal-200 text-center">
                  <span className="text-xs font-bold text-teal-800 uppercase">
                    Final Verdict: {data.finalVerdict}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-r from-teal-500 to-emerald-500 text-white px-8 py-3 rounded-full shadow-lg">
            <p className="text-xs uppercase tracking-wider opacity-80 mb-1">
              Authorized By
            </p>
            <p className="text-2xl font-bold">{data.personName}</p>
            <p className="text-sm opacity-90">{data.role}</p>
          </div>
        </div>

        <div className="flex items-end justify-between mt-12 pt-8 border-t-2 border-teal-200">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase">Issue Date</p>
            <p className="text-sm font-bold text-gray-800">{data.issuedDate}</p>
            {data.expiryDate && (
              <>
                <p className="text-xs text-gray-500 uppercase mt-2">
                  Expiry Date
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {data.expiryDate}
                </p>
              </>
            )}
          </div>

          {data.signature && (
            <div className="text-center">
              <img
                src={data.signature}
                alt="Signature"
                className="h-16 w-auto mb-2"
              />
              <div className="w-48 border-t-2 border-teal-600"></div>
              <p className="text-xs text-gray-500 mt-1">Official Signature</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
