import { CertificateTemplateProps } from "@/types/certificate";

export default function Template2({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-linear-to-br from-blue-50 to-cyan-50 p-12 relative box-border overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600"></div>

      <div className="flex-1 flex flex-col bg-white rounded-lg p-12 relative z-10">
        <div className="flex items-start justify-between mb-8">
          {data.logo && (
            <img
              src={data.logo}
              alt="Logo"
              className="h-16 w-auto object-contain"
            />
          )}
          {data.badge && (
            <img src={data.badge} alt="Badge" className="h-16 w-auto" />
          )}
        </div>

        <div className="text-center flex-1 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center justify-center">
            <div className="h-px w-20 bg-blue-600"></div>
            <h1 className="text-5xl font-bold text-blue-900 mx-6">
              {data.title}
            </h1>
            <div className="h-px w-20 bg-blue-600"></div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
            <div
              className="text-lg text-gray-700 leading-relaxed rich-text-content"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto text-left mb-6">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase">
                Product
              </p>
              <p className="text-xl text-gray-800">{data.productName}</p>
              {data.productCategory && (
                <p className="text-xs text-gray-500">{data.productCategory}</p>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase">
                Certificate No
              </p>
              <p className="text-xl text-gray-800">{data.certNumber}</p>
              {data.certificationStatus && (
                <p className="text-xs font-bold text-green-600">
                  {data.certificationStatus}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase">
                Key Ingredients
              </p>
              <p className="text-sm text-gray-800">
                {data.keyActiveIngredients || data.companyName}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase">
                Rating
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-800">
                  {data.overallExpertRating || "N/A"}
                </span>
                {data.finalVerdict && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    {data.finalVerdict}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Ratings */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs opacity-80 border-t border-blue-100 pt-4">
            <div>
              <span className="block font-bold text-blue-600">Safety</span>
              <span>{data.safetyRating || "-"}</span>
            </div>
            <div>
              <span className="block font-bold text-blue-600">Efficacy</span>
              <span>{data.effectivenessRating || "-"}</span>
            </div>
            <div>
              <span className="block font-bold text-blue-600">Quality</span>
              <span>{data.ingredientsQualityRating || "-"}</span>
            </div>
            <div>
              <span className="block font-bold text-blue-600">Value</span>
              <span>{data.valueForMoneyRating || "-"}</span>
            </div>
          </div>

          <div className="mt-8 p-6 bg-linear-to-r from-blue-100 to-cyan-100 rounded-lg">
            <p className="text-2xl font-semibold text-blue-900">
              {data.personName}
            </p>
            <p className="text-base text-blue-700">{data.role}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-blue-100 pt-4">
          <h3 className="text-xs font-bold uppercase text-blue-700 mb-2">
            Product Specifications
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-700">
            <div>
              <span className="font-semibold text-blue-600">Category:</span>{" "}
              {data.productCategory}
            </div>
            <div>
              <span className="font-semibold text-blue-600">Form:</span>{" "}
              {data.productForm}
            </div>
            <div className="col-span-2">
              <span className="font-semibold text-blue-600">Ingredients:</span>{" "}
              {data.keyActiveIngredients}
            </div>
            <div>
              <span className="font-semibold text-blue-600">Dietary:</span>{" "}
              {data.dietaryCompliance}
            </div>
            <div>
              <span className="font-semibold text-blue-600">Side Effects:</span>{" "}
              {data.sideEffects}
            </div>
            <div className="col-span-2">
              <span className="font-semibold text-blue-600">Cautions:</span>{" "}
              {data.cautions}
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-blue-100 pt-4">
          <h3 className="text-xs font-bold uppercase text-blue-700 mb-2">
            Verification & Support
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-700">
            <div>
              <span className="font-semibold text-blue-600">Manufacturer:</span>{" "}
              {data.manufacturerAddress}
            </div>
            <div>
              <span className="font-semibold text-blue-600">
                Third-Party Testing:
              </span>{" "}
              {data.thirdPartyTesting}
            </div>
            <div>
              <span className="font-semibold text-blue-600">
                Certifications:
              </span>{" "}
              {data.certificationsAndApprovals}
            </div>
            <div>
              <span className="font-semibold text-blue-600">Verification:</span>{" "}
              {data.verificationStatement}
            </div>
            <div>
              <span className="font-semibold text-blue-600">
                Refund Policy:
              </span>{" "}
              {data.refundPolicy}
            </div>
            <div>
              <span className="font-semibold text-blue-600">Support:</span>{" "}
              {data.customerSupportEmail} | {data.customerSupportPhone}
            </div>
            <div className="col-span-2">
              <span className="font-semibold text-blue-600">Buy Now:</span>{" "}
              {data.buyNowUrl}
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-blue-100 pt-4">
          <h3 className="text-xs font-bold uppercase text-blue-700 mb-2">
            Expert Analysis
          </h3>
          <div className="grid grid-cols-4 gap-2 text-xs text-center">
            <div className="bg-blue-50 p-1 rounded border border-blue-100">
              <div className="font-bold opacity-70 text-blue-800">Overall</div>
              <div className="font-bold text-lg text-blue-900">
                {data.overallExpertRating}
              </div>
            </div>
            <div className="bg-blue-50 p-1 rounded border border-blue-100">
              <div className="font-bold opacity-70 text-blue-800">Safety</div>
              <div className="font-bold text-blue-900">{data.safetyRating}</div>
            </div>
            <div className="bg-blue-50 p-1 rounded border border-blue-100">
              <div className="font-bold opacity-70 text-blue-800">Efficacy</div>
              <div className="font-bold text-blue-900">
                {data.effectivenessRating}
              </div>
            </div>
            <div className="bg-blue-50 p-1 rounded border border-blue-100">
              <div className="font-bold opacity-70 text-blue-800">Quality</div>
              <div className="font-bold text-blue-900">
                {data.ingredientsQualityRating}
              </div>
            </div>
            <div className="bg-blue-50 p-1 rounded border border-blue-100">
              <div className="font-bold opacity-70 text-blue-800">QC</div>
              <div className="font-bold text-blue-900">
                {data.certificationsQCRating}
              </div>
            </div>
            <div className="bg-blue-50 p-1 rounded border border-blue-100">
              <div className="font-bold opacity-70 text-blue-800">Value</div>
              <div className="font-bold text-blue-900">
                {data.valueForMoneyRating}
              </div>
            </div>
            <div className="bg-blue-50 p-1 rounded border border-blue-100">
              <div className="font-bold opacity-70 text-blue-800">Evidence</div>
              <div className="font-bold text-blue-900">
                {data.evidenceStrengthRating}
              </div>
            </div>
            <div className="bg-blue-50 p-1 rounded border border-blue-100">
              <div className="font-bold opacity-70 text-blue-800">User Exp</div>
              <div className="font-bold text-blue-900">
                {data.userExperienceRating}
              </div>
            </div>
            <div className="bg-blue-50 p-1 rounded border border-blue-100">
              <div className="font-bold opacity-70 text-blue-800">
                Versatility
              </div>
              <div className="font-bold text-blue-900">
                {data.versatilityUseCaseFit}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-xs font-bold uppercase text-blue-600">
            Final Verdict
          </div>
          <div className="text-xl font-black uppercase text-blue-950">
            {data.finalVerdict}
          </div>
        </div>

        <div className="flex items-end justify-between mt-8 pt-6 border-t-2 border-blue-200">
          <div>
            <p className="text-xs text-gray-500 uppercase">Issued</p>
            <p className="text-sm font-medium text-gray-800">
              {data.issuedDate}
            </p>
            {data.expiryDate && (
              <>
                <p className="text-xs text-gray-500 uppercase mt-2">Expires</p>
                <p className="text-sm font-medium text-gray-800">
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
                className="h-14 w-auto mb-1"
              />
              <div className="w-40 border-t border-gray-400"></div>
              <p className="text-xs text-gray-500 mt-1">Authorized Signatory</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
