import { CertificateTemplateProps } from "@/types/certificate";

export default function Template5({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-linear-to-br from-rose-50 via-white to-pink-50 p-16 relative box-border overflow-hidden flex flex-col">
      <div className="absolute inset-0 m-12 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 707"
          preserveAspectRatio="none"
        >
          <rect
            x="2"
            y="2"
            width="996"
            height="703"
            fill="none"
            stroke="#e11d48"
            strokeWidth="4"
            strokeDasharray="20,10"
          />
        </svg>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-between py-4">
        <div className="text-center">
          {data.logo && (
            <img
              src={data.logo}
              alt="Logo"
              className="h-20 w-auto object-contain mx-auto mb-4"
            />
          )}
          <div className="inline-block bg-rose-600 text-white px-8 py-2 rounded-full">
            <p className="text-sm font-semibold uppercase tracking-wider">
              {data.companyName}
            </p>
          </div>
        </div>

        <div className="text-center space-y-6 flex-1 flex flex-col justify-center">
          <h1 className="text-7xl font-serif italic text-rose-700">
            {data.title}
          </h1>

          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 rounded-full bg-rose-400"></div>
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-rose-600"></div>
          </div>

          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-rose-200">
            <div
              className="text-lg text-gray-700 leading-relaxed mb-6 rich-text-content"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />

            <div className="bg-linear-to-r from-rose-100 to-pink-100 p-6 rounded-xl">
              <p className="text-sm text-rose-600 font-semibold uppercase mb-2">
                Product Certified
              </p>
              <p className="text-3xl font-bold text-rose-800">
                {data.productName}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {data.productCategory} —{" "}
                <span className="font-bold">{data.certificationStatus}</span>
              </p>
            </div>

            {/* Detailed Ratings & Specs - Rose Theme */}
            <div className="mt-4 pt-4 border-t border-rose-100">
              <h3 className="text-sm font-bold text-rose-600 uppercase mb-3">
                Certification Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs mb-4 text-left">
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold text-rose-400">
                      Category:
                    </span>{" "}
                    {data.productCategory}
                  </p>
                  <p>
                    <span className="font-semibold text-rose-400">
                      Ingredients:
                    </span>{" "}
                    {data.keyActiveIngredients}
                  </p>
                  <p>
                    <span className="font-semibold text-rose-400">
                      Dietary:
                    </span>{" "}
                    {data.dietaryCompliance}
                  </p>
                  <p>
                    <span className="font-semibold text-rose-400">
                      Support:
                    </span>{" "}
                    {data.customerSupportEmail}
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold text-rose-400">Mfr:</span>{" "}
                    {data.manufacturerAddress}
                  </p>
                  <p>
                    <span className="font-semibold text-rose-400">Tests:</span>{" "}
                    {data.thirdPartyTesting}
                  </p>
                  <p>
                    <span className="font-semibold text-rose-400">
                      Approvals:
                    </span>{" "}
                    {data.certificationsAndApprovals}
                  </p>
                  <p>
                    <span className="font-semibold text-rose-400">
                      Verification:
                    </span>{" "}
                    {data.verificationStatement}
                  </p>
                </div>
              </div>

              <div className="bg-rose-50 rounded-xl p-4">
                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div>
                    <span className="block font-bold text-rose-500">Value</span>
                    {data.valueForMoneyRating}
                  </div>
                  <div>
                    <span className="block font-bold text-rose-500">
                      Evidence
                    </span>
                    {data.evidenceStrengthRating}
                  </div>
                  <div>
                    <span className="block font-bold text-rose-500">QC</span>
                    {data.certificationsQCRating}
                  </div>
                  <div>
                    <span className="block font-bold text-rose-500">
                      User Exp
                    </span>
                    {data.userExperienceRating}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-rose-200 text-center">
                  <span className="text-xs font-bold text-rose-800 uppercase">
                    Final Verdict: {data.finalVerdict}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <p className="text-3xl font-bold text-gray-800">
              {data.personName}
            </p>
            <p className="text-lg text-rose-600 font-medium">{data.role}</p>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="text-left bg-white p-4 rounded-lg shadow">
            <p className="text-xs text-gray-500 uppercase">Certificate</p>
            <p className="font-semibold text-rose-700">{data.certNumber}</p>
            <p className="text-xs text-gray-500 uppercase mt-2">Date</p>
            <p className="font-semibold text-gray-800">{data.issuedDate}</p>
            {data.expiryDate && (
              <>
                <p className="text-xs text-gray-500 uppercase mt-2">Expires</p>
                <p className="font-semibold text-gray-800">{data.expiryDate}</p>
              </>
            )}
          </div>

          <div className="flex items-center gap-6">
            {data.signature && (
              <div className="text-center bg-white p-4 rounded-lg shadow">
                <img
                  src={data.signature}
                  alt="Signature"
                  className="h-16 w-auto mb-2"
                />
                <div className="w-44 border-t-2 border-rose-600"></div>
                <p className="text-xs text-gray-500 mt-1">Authorized By</p>
              </div>
            )}

            {data.badge && (
              <img src={data.badge} alt="Badge" className="h-24 w-auto" />
            )}
          </div>

          <div className="text-right bg-white p-4 rounded-lg shadow">
            <p className="text-xs text-gray-500 uppercase">Location</p>
            <p className="font-semibold text-gray-800">{data.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
