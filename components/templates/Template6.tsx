import { CertificateTemplateProps } from "@/types/certificate";

export default function Template6({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-slate-100 p-8 relative box-border overflow-hidden flex flex-col">
      <div className="flex-1 bg-white rounded-none overflow-hidden flex relative z-10">
        <div className="w-1/3 bg-linear-to-b from-slate-800 via-slate-700 to-slate-800 p-8 flex flex-col justify-between text-white">
          <div className="space-y-6">
            {data.logo && (
              <img
                src={data.logo}
                alt="Logo"
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            )}

            {/* QR Code in Sidebar */}
            {data.qrText && (
              <div className="bg-white p-2 rounded w-fit mx-auto">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.qrText)}`}
                  alt="QR Code"
                  className="w-24 h-24 object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-6 mt-6">
            <div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-2">
                Certificate No
              </p>
              <p className="text-lg font-bold">{data.certNumber}</p>
            </div>

            <div className="h-px bg-white/20"></div>

            <div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-2">
                Issued / Valid
              </p>
              <p className="text-base font-medium">{data.issuedDate}</p>
              {data.expiryDate && (
                <p className="text-xs opacity-80 mt-1">
                  Expires: {data.expiryDate}
                </p>
              )}
            </div>

            <div className="h-px bg-white/20"></div>

            <div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-2">
                Origin
              </p>
              <p className="text-base font-medium">{data.location}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-2">
                Status
              </p>
              <span className="bg-white/10 px-2 py-1 rounded text-sm font-bold border border-white/20">
                {data.certificationStatus || "Active"}
              </span>
            </div>
          </div>

          {data.badge && (
            <img
              src={data.badge}
              alt="Badge"
              className="h-20 w-auto mx-auto brightness-0 invert opacity-80 mt-6"
            />
          )}

          {data.showWatermark && (data.watermark || data.logo) && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
              <img
                src={data.watermark || data.logo}
                alt="Watermark"
                className="w-3/4 h-3/4 object-contain grayscale"
              />
            </div>
          )}
        </div>

        <div className="flex-1 p-12 flex flex-col">
          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-slate-800 mb-1 leading-tight">
                  {data.title}
                </h1>
                {data.subTitle && (
                  <p className="text-lg text-slate-500 font-light">
                    {data.subTitle}
                  </p>
                )}
                <div className="w-20 h-1 bg-slate-800 mt-4"></div>
              </div>
              {data.overallExpertRating && (
                <div className="text-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="text-3xl font-bold text-slate-800">
                    {data.overallExpertRating}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">
                    Expert Score
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-50 border-y border-slate-200 py-6 my-6 px-6">
              <div
                className="text-sm text-slate-700 leading-relaxed rich-text-content"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
              {data.verificationStatement && (
                <p className="mt-4 text-xs italic text-slate-500 border-t border-slate-200 pt-3">
                  "{data.verificationStatement}"
                </p>
              )}
            </div>

            {/* Product & Image */}
            <div className="flex gap-6 items-start">
              {data.productImage && (
                <img
                  src={data.productImage}
                  className="w-24 h-24 object-contain border p-1 bg-white rounded"
                />
              )}
              <div className="flex-1">
                <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">
                  Product Name
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {data.productName}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
                  <span>
                    <span className="font-bold">Category:</span>{" "}
                    {data.productCategory}
                  </span>
                  <span>
                    <span className="font-bold">Form:</span> {data.productForm}
                  </span>
                  <span>
                    <span className="font-bold">By:</span>{" "}
                    {data.certifiedBy || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Extended Detail View - Slate/Sky Theme */}
            <div className="mt-2 border-t border-slate-200 pt-4">
              <div className="grid grid-cols-2 gap-4 text-[10px] text-slate-600 mb-4">
                <div className="space-y-1">
                  <p className="font-bold text-slate-800 uppercase border-b border-slate-100 pb-1 mb-1">
                    Ingredients & Safety
                  </p>
                  <p>
                    <span className="font-semibold">Key Ingredients:</span>{" "}
                    {data.keyActiveIngredients}
                  </p>
                  <p>
                    <span className="font-semibold">Dietary:</span>{" "}
                    {data.dietaryCompliance}
                  </p>
                  <p>
                    <span className="font-semibold text-red-700">
                      Cautions:
                    </span>{" "}
                    {data.cautions || "None"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">
                      Side Effects:
                    </span>{" "}
                    {data.sideEffects || "None"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-800 uppercase border-b border-slate-100 pb-1 mb-1">
                    Compliance & Support
                  </p>
                  <p>
                    <span className="font-semibold">Manufacturer:</span>{" "}
                    {data.manufacturerName}
                  </p>
                  {data.companyUrl && (
                    <p className="truncate text-blue-600 font-medium">
                      {data.companyUrl}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">Approvals:</span>{" "}
                    {data.certificationsAndApprovals}
                  </p>
                  <p>
                    <span className="font-semibold">Testing:</span>{" "}
                    {data.thirdPartyTesting}
                  </p>
                  <p>
                    <span className="font-semibold">Support:</span>{" "}
                    {data.customerSupportPhone} | {data.customerSupportEmail}
                  </p>
                  <p>
                    <span className="font-semibold">Refund:</span>{" "}
                    {data.refundPolicy}
                  </p>
                  {data.buyNowUrl && (
                    <p className="truncate text-blue-600 underline">
                      {data.buyNowUrl}
                    </p>
                  )}
                </div>
              </div>

              {/* Comprehensive Ratings Grid */}
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-2 text-center">
                  Expert Analysis Metrics
                </p>
                <div className="grid grid-cols-5 gap-2 text-center text-[9px] text-slate-600 font-medium">
                  {[
                    { l: "Safety", v: data.safetyRating },
                    { l: "Effectiveness", v: data.effectivenessRating },
                    { l: "Quality", v: data.ingredientsQualityRating },
                    { l: "QC/Cert", v: data.certificationsQCRating },
                    { l: "Value", v: data.valueForMoneyRating },
                    { l: "Evidence", v: data.evidenceStrengthRating },
                    { l: "User Exp", v: data.userExperienceRating },
                    { l: "Versatility", v: data.versatilityUseCaseFit },
                  ].map((r, i) => (
                    <div
                      key={i}
                      className="bg-white p-1 rounded border border-slate-100 flex flex-col justify-center min-h-[36px]"
                    >
                      <span className="block text-slate-400 uppercase text-[8px] leading-tight mb-0.5">
                        {r.l}
                      </span>
                      <span className="font-bold text-slate-800">
                        {r.v || "-"}
                      </span>
                    </div>
                  ))}
                  <div className="col-span-2 bg-slate-800 text-white rounded flex items-center justify-center p-1">
                    <span className="font-bold uppercase tracking-tighter text-[10px]">
                      {data.finalVerdict}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 flex items-end justify-between">
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">
                  Verified Signer
                </p>
                <p className="text-xl font-bold text-slate-800">
                  {data.personName}
                </p>
                <p className="text-xs text-slate-500">{data.role}</p>
              </div>

              {data.signature && (
                <div className="text-right">
                  <img
                    src={data.signature}
                    alt="Signature"
                    className="h-12 w-auto mb-1 ml-auto mix-blend-multiply"
                  />
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest border-t border-slate-300 pt-1 inline-block min-w-[120px] text-center">
                    Authorized Signature
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {data.showWatermark && (data.watermark || data.logo) && (
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0 overflow-hidden">
            <img
              src={data.watermark || data.logo}
              alt="Background Watermark"
              className="w-[80%] h-[80%] object-contain grayscale"
            />
          </div>
        )}
      </div>
    </div>
  );
}
