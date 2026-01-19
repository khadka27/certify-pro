import { CertificateTemplateProps } from "@/types/certificate";

export default function Template10({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-linear-to-br from-violet-900 via-fuchsia-900 to-violet-900 p-16 relative box-border overflow-hidden flex flex-col">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex-1 border-4 border-violet-400/30 backdrop-blur-sm bg-violet-950/20 p-12 flex flex-col">
        <div className="flex items-start justify-between mb-12">
          {data.logo && (
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg">
              <img
                src={data.logo}
                alt="Logo"
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </div>
          )}

          {data.badge && (
            <img
              src={data.badge}
              alt="Badge"
              className="h-20 w-auto brightness-0 invert"
            />
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></div>
              <p className="text-sm text-violet-300 uppercase tracking-[0.3em] font-semibold">
                {data.subTitle || "Certificate of Excellence"}
              </p>
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></div>
            </div>

            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-violet-200 via-fuchsia-200 to-violet-200">
              {data.title}
            </h1>

            <div className="h-1 w-64 mx-auto bg-linear-to-r from-transparent via-violet-400 to-transparent"></div>
          </div>

          <div className="max-w-2xl backdrop-blur-md bg-white/5 border border-violet-400/20 p-8 rounded-2xl">
            <div
              className="text-lg text-violet-100 leading-relaxed rich-text-content"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />

            <div className="bg-linear-to-r from-violet-600/30 to-fuchsia-600/30 p-6 rounded-xl border border-violet-400/20">
              <p className="text-xs text-violet-300 uppercase tracking-wider mb-2">
                Product Name
              </p>
              <p className="text-3xl font-bold text-white mb-2">
                {data.productName}
              </p>
              <div className="flex justify-between items-center text-xs text-violet-200 border-t border-violet-400/20 pt-2">
                <span>{data.productCategory}</span>
                <span className="font-bold text-fuchsia-300">
                  {data.certificationStatus}
                </span>
              </div>
            </div>

            {/* Detailed Ratings & Specs - Violet Theme */}
            <div className="mt-4 pt-4 border-t border-violet-400/20">
              <div className="grid grid-cols-2 gap-4 text-xs mb-4 text-left">
                <div className="space-y-1">
                  <p className="text-violet-200">
                    <span className="font-semibold text-fuchsia-300">
                      Form:
                    </span>{" "}
                    {data.productForm}
                  </p>
                  <p className="text-violet-200">
                    <span className="font-semibold text-fuchsia-300">
                      Ingredients:
                    </span>{" "}
                    {data.keyActiveIngredients}
                  </p>
                  <p className="text-violet-200">
                    <span className="font-semibold text-fuchsia-300">
                      Support:
                    </span>{" "}
                    {data.customerSupportEmail}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-violet-200">
                    <span className="font-semibold text-fuchsia-300">Mfr:</span>{" "}
                    {data.manufacturerAddress}
                  </p>
                  <p className="text-violet-200">
                    <span className="font-semibold text-fuchsia-300">
                      Tests:
                    </span>{" "}
                    {data.thirdPartyTesting} / {data.certificationsAndApprovals}
                  </p>
                  <p className="text-violet-200">
                    <span className="font-semibold text-fuchsia-300">
                      Refund:
                    </span>{" "}
                    {data.refundPolicy}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-violet-400/20 backdrop-blur-md">
                <div className="grid grid-cols-4 gap-4 w-full text-center">
                  <div>
                    <span className="block text-[10px] uppercase text-violet-400">
                      Rating
                    </span>
                    <span className="text-lg font-bold text-white">
                      {data.overallExpertRating}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-violet-400">
                      Quality
                    </span>
                    <span className="text-sm font-bold text-white">
                      {data.ingredientsQualityRating}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-violet-400">
                      Value
                    </span>
                    <span className="text-sm font-bold text-white">
                      {data.valueForMoneyRating}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-violet-400">
                      Evidence
                    </span>
                    <span className="text-sm font-bold text-white">
                      {data.evidenceStrengthRating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs text-fuchsia-200 uppercase font-bold tracking-widest">
                  Verdict: {data.finalVerdict}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 max-w-2xl w-full">
            <div className="backdrop-blur-md bg-white/5 p-4 rounded-lg border border-violet-400/20 text-left">
              <p className="text-xs text-violet-300 uppercase mb-1">
                Certified By
              </p>
              <p className="text-xl font-bold text-white">{data.personName}</p>
              <p className="text-sm text-violet-200">{data.role}</p>
            </div>

            <div className="backdrop-blur-md bg-white/5 p-4 rounded-lg border border-violet-400/20 text-left">
              <p className="text-xs text-violet-300 uppercase mb-1">
                Organization
              </p>
              <p className="text-xl font-bold text-white">{data.manufacturerName}</p>
              <p className="text-sm text-violet-200">{data.location}</p>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between mt-12 pt-8 border-t border-violet-400/20">
          <div className="space-y-2">
            <div className="backdrop-blur-md bg-white/5 px-4 py-2 rounded">
              <p className="text-xs text-violet-300 uppercase">
                Certificate No
              </p>
              <p className="font-bold text-violet-100">{data.certNumber}</p>
            </div>
            <div className="backdrop-blur-md bg-white/5 px-4 py-2 rounded">
              <p className="text-xs text-violet-300 uppercase">Issue Date</p>
              <p className="font-bold text-violet-100">{data.issuedDate}</p>
            </div>
            {data.expiryDate && (
              <div className="backdrop-blur-md bg-white/5 px-4 py-2 rounded">
                <p className="text-xs text-violet-300 uppercase">Valid Until</p>
                <p className="font-bold text-violet-100">{data.expiryDate}</p>
              </div>
            )}
          </div>

          {data.signature && (
            <div className="text-center backdrop-blur-md bg-white/5 p-4 rounded-lg">
              <img
                src={data.signature}
                alt="Signature"
                className="h-16 w-auto mb-2 brightness-0 invert"
              />
              <div className="w-48 border-t border-violet-400"></div>
              <p className="text-xs text-violet-300 mt-1">Digital Signature</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
