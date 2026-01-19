import { CertificateTemplateProps } from "@/types/certificate";

export default function Template4({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white p-12 relative box-border overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 w-64 h-64 bg-linear-to-br from-emerald-500/10 to-transparent rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-linear-to-tl from-teal-500/10 to-transparent rounded-tl-full"></div>

      <div className="relative z-10 flex-1 border-4 border-emerald-600 rounded-lg p-12 flex flex-col">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            {data.logo && (
              <img
                src={data.logo}
                alt="Logo"
                className="h-16 w-auto object-contain"
              />
            )}
            <div className="h-16 w-1 bg-emerald-600"></div>
            <div>
              <p className="text-sm text-gray-600">{data.companyName}</p>
              <p className="text-xs text-gray-500">{data.location}</p>
            </div>
          </div>

          {data.badge && (
            <img src={data.badge} alt="Badge" className="h-20 w-auto" />
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-emerald-700 mb-6">
            {data.title}
          </h1>

          <div className="h-1 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full mt-4 mx-auto w-32"></div>
          <div className="bg-linear-to-r from-emerald-50 to-teal-50 p-8 rounded-lg border-l-4 border-emerald-600 mb-8">
            <div
              className="text-lg text-gray-700 leading-relaxed mb-6 rich-text-content"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />

            <div className="border-b border-emerald-100 pb-4 mb-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-emerald-700 uppercase mb-1">
                    Product
                  </p>
                  <p className="text-xl text-gray-800">{data.productName}</p>
                  <p className="text-xs text-gray-500">
                    {data.productCategory}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-700 uppercase mb-1">
                    Certificate No
                  </p>
                  <p className="text-xl text-gray-800">{data.certNumber}</p>
                  <p className="text-xs text-emerald-600 font-bold">
                    {data.certificationStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* Ratings Compact */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-emerald-50 rounded p-1">
                <span className="block text-emerald-800 font-bold opacity-70">
                  Safety
                </span>
                <span className="block font-bold text-emerald-900">
                  {data.safetyRating}
                </span>
              </div>
              <div className="bg-emerald-50 rounded p-1">
                <span className="block text-emerald-800 font-bold opacity-70">
                  Effects
                </span>
                <span className="block font-bold text-emerald-900">
                  {data.effectivenessRating}
                </span>
              </div>
              <div className="bg-emerald-50 rounded p-1">
                <span className="block text-emerald-800 font-bold opacity-70">
                  Quality
                </span>
                <span className="block font-bold text-emerald-900">
                  {data.ingredientsQualityRating}
                </span>
              </div>
              <div className="bg-emerald-600 rounded p-1 text-white">
                <span className="block opacity-80 font-bold">Overall</span>
                <span className="block font-black">
                  {data.overallExpertRating}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-600 text-white p-6 rounded-lg inline-block self-start">
            <p className="text-xs uppercase tracking-wider mb-1 opacity-80">
              Certified by
            </p>
            <p className="text-2xl font-bold">{data.personName}</p>
            <p className="text-sm opacity-90">{data.role}</p>
          </div>
        </div>

        {/* Detailed Specifications - Adapted for Emerald/Green Theme */}
        <div className="mt-8 border-t border-emerald-100 pt-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
            <div>
              <h4 className="text-emerald-700 font-bold uppercase mb-2">
                Specs
              </h4>
              <p>
                <span className="font-semibold text-emerald-600">
                  Category:
                </span>{" "}
                {data.productCategory}
              </p>
              <p>
                <span className="font-semibold text-emerald-600">Form:</span>{" "}
                {data.productForm}
              </p>
              <p>
                <span className="font-semibold text-emerald-600">Dietary:</span>{" "}
                {data.dietaryCompliance}
              </p>
              <p>
                <span className="font-semibold text-emerald-600">
                  Active Ingredients:
                </span>{" "}
                {data.keyActiveIngredients}
              </p>
            </div>
            <div>
              <h4 className="text-emerald-700 font-bold uppercase mb-2">
                Support
              </h4>
              <p>
                <span className="font-semibold text-emerald-600">Mfr:</span>{" "}
                {data.manufacturerAddress}
              </p>
              <p>
                <span className="font-semibold text-emerald-600">Testing:</span>{" "}
                {data.thirdPartyTesting} -- {data.certificationsAndApprovals}
              </p>
              <p>
                <span className="font-semibold text-emerald-600">Refund:</span>{" "}
                {data.refundPolicy}
              </p>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="font-semibold text-emerald-600">Contact:</span>{" "}
                {data.customerSupportEmail}
              </p>
            </div>
          </div>

          {/* Full Ratings Table */}
          <div className="mt-4 bg-emerald-50 rounded-lg p-3 border border-emerald-100">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div>
                <span className="block font-bold text-emerald-600">
                  Quality
                </span>
                <span>{data.ingredientsQualityRating}</span>
              </div>
              <div>
                <span className="block font-bold text-emerald-600">QC</span>
                <span>{data.certificationsQCRating}</span>
              </div>
              <div>
                <span className="block font-bold text-emerald-600">Value</span>
                <span>{data.valueForMoneyRating}</span>
              </div>
              <div>
                <span className="block font-bold text-emerald-600">
                  Evidence
                </span>
                <span>{data.evidenceStrengthRating}</span>
              </div>
              <div>
                <span className="block font-bold text-emerald-600">
                  User Exp
                </span>
                <span>{data.userExperienceRating}</span>
              </div>
              <div>
                <span className="block font-bold text-emerald-600">
                  Versatility
                </span>
                <span>{data.versatilityUseCaseFit}</span>
              </div>
              <div className="col-span-2 bg-emerald-100 rounded flex items-center justify-center">
                <span className="font-bold text-emerald-800 uppercase mr-2">
                  Verdict:
                </span>
                <span className="font-black text-emerald-900">
                  {data.finalVerdict}
                </span>
              </div>
            </div>
            <div className="text-center mt-2 pt-2 border-t border-emerald-200">
              <span className="text-[10px] text-emerald-600 font-bold uppercase">
                Verification Statement: {data.verificationStatement}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between mt-8 pt-6 border-t-2 border-emerald-200">
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1">Issue Date</p>
              <p className="text-sm font-medium text-gray-800">
                {data.issuedDate}
              </p>
            </div>
            {data.expiryDate && (
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">
                  Valid Until
                </p>
                <p className="text-sm font-medium text-gray-800">
                  {data.expiryDate}
                </p>
              </div>
            )}
          </div>

          {data.signature && (
            <div className="text-center">
              <img
                src={data.signature}
                alt="Signature"
                className="h-16 w-auto mb-1"
              />
              <div className="w-44 border-t-2 border-emerald-600"></div>
              <p className="text-xs text-gray-500 mt-1">Official Signature</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
