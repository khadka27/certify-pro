import { CertificateTemplateProps } from "@/types/certificate";

export default function Template14({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white p-16 relative border-8 border-amber-600 shadow-2xl box-border overflow-hidden flex flex-col font-serif">
      <div className="absolute inset-12 border-4 border-amber-400"></div>

      {/* Background Watermark */}
      {data.showWatermark && (data.watermark || data.logo) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
          <img
            src={data.watermark || data.logo}
            alt="Watermark"
            className="w-[600px] h-auto object-contain rotate-[-30deg]"
          />
        </div>
      )}

      <div className="relative z-10 flex-1 flex flex-col items-center justify-between text-center py-4">
        {data.logo && (
          <img
            src={data.logo}
            alt="Logo"
            className="h-20 w-auto object-contain mb-4"
          />
        )}

        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <h1 className="text-6xl font-bold text-amber-800 tracking-wide">
            {data.title}
          </h1>

          {data.subTitle && (
            <p className="text-xl font-medium text-amber-700 mt-2 uppercase tracking-widest">
              {data.subTitle}
            </p>
          )}

          <div className="w-32 h-1 bg-amber-600"></div>

          {data.productImage && (
            <div className="my-4">
              <img
                src={data.productImage}
                alt="Product"
                className="h-40 w-auto object-contain border-2 border-amber-100 rounded-lg p-2 bg-white shadow-sm"
              />
            </div>
          )}

          <div
            className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto mb-12 rich-text-content"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          <div className="space-y-4 mt-4 w-full max-w-2xl px-8">
            <div className="flex justify-between items-center border-b border-amber-200 pb-2">
              <span className="text-gray-600 font-semibold uppercase text-xs tracking-wider">
                Product Name
              </span>
              <span className="text-2xl font-bold text-amber-900">
                {data.productName}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-amber-200 pb-2">
              <span className="text-gray-600 font-semibold uppercase text-xs tracking-wider">
                Status / Category
              </span>
              <span className="text-base text-gray-800 font-medium">
                {data.productCategory} —{" "}
                <span className="font-bold text-green-700">
                  {data.certificationStatus}
                </span>
              </span>
            </div>

            {/* Detailed Info Grid */}
            <div className="mt-4 border-t border-amber-200 pt-4 w-full">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[11px] mb-6 text-left">
                <div className="space-y-1">
                  <p>
                    <span className="font-bold text-amber-800 uppercase text-[9px]">
                      Form:
                    </span>{" "}
                    {data.productForm}
                  </p>
                  <p>
                    <span className="font-bold text-amber-800 uppercase text-[9px]">
                      Ingredients:
                    </span>{" "}
                    {data.keyActiveIngredients}
                  </p>
                  {data.companyUrl && (
                    <p>
                      <span className="font-bold text-amber-800 uppercase text-[9px]">
                        Website:
                      </span>{" "}
                      {data.companyUrl}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <p>
                    <span className="font-bold text-amber-800 uppercase text-[9px]">
                      Compliance:
                    </span>{" "}
                    {data.dietaryCompliance}
                  </p>
                  <p>
                    <span className="font-bold text-amber-800 uppercase text-[9px]">
                      Support:
                    </span>{" "}
                    {data.customerSupportEmail}{" "}
                    {data.customerSupportPhone &&
                      `| ${data.customerSupportPhone}`}
                  </p>
                  {data.buyNowUrl && (
                    <a
                      href={data.buyNowUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 bg-amber-800 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-700 transition-colors shadow-md"
                    >
                      Buy Product Now
                    </a>
                  )}
                </div>
              </div>

              {/* Ratings Card */}
              <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-200 shadow-inner">
                <div className="grid grid-cols-5 gap-4 text-center">
                  <div className="border-r border-amber-200">
                    <span className="block text-[9px] font-bold text-amber-700 uppercase tracking-tighter">
                      Value
                    </span>
                    <span className="text-sm font-bold text-amber-900">
                      {data.valueForMoneyRating}
                    </span>
                  </div>
                  <div className="border-r border-amber-200">
                    <span className="block text-[9px] font-bold text-amber-700 uppercase tracking-tighter">
                      Evidence
                    </span>
                    <span className="text-sm font-bold text-amber-900">
                      {data.evidenceStrengthRating}
                    </span>
                  </div>
                  <div className="border-r border-amber-200">
                    <span className="block text-[9px] font-bold text-amber-700 uppercase tracking-tighter">
                      QC
                    </span>
                    <span className="text-sm font-bold text-amber-900">
                      {data.certificationsQCRating}
                    </span>
                  </div>
                  <div className="border-r border-amber-200">
                    <span className="block text-[9px] font-bold text-amber-700 uppercase tracking-tighter">
                      User Exp
                    </span>
                    <span className="text-sm font-bold text-amber-900">
                      {data.userExperienceRating}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-amber-700 uppercase tracking-tighter">
                      Fit
                    </span>
                    <span className="text-sm font-bold text-amber-900">
                      {data.versatilityUseCaseFit}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-200 text-center">
                  <span className="text-xs font-black text-amber-900 uppercase tracking-widest">
                    Expert Verdict:{" "}
                    {data.finalVerdict || "OFFICIALLY CERTIFIED"}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Ratings Grid */}
            <div className="grid grid-cols-4 gap-4 py-6 border-t border-amber-200 mt-4 items-center">
              <div className="text-center">
                <span className="block text-[10px] text-amber-600 uppercase font-bold tracking-widest">
                  Expert Score
                </span>
                <span className="text-2xl font-black text-amber-900 bg-amber-100/50 border-2 border-amber-300 rounded-full w-14 h-14 flex items-center justify-center mx-auto mt-2 shadow-sm">
                  {data.overallExpertRating}
                </span>
              </div>
              <div className="text-center pt-2">
                <span className="block text-[10px] text-gray-400 uppercase font-bold">
                  Safety
                </span>
                <span className="block text-xl font-bold text-gray-800">
                  {data.safetyRating}
                </span>
              </div>
              <div className="text-center pt-2">
                <span className="block text-[10px] text-gray-400 uppercase font-bold">
                  Quality
                </span>
                <span className="block text-xl font-bold text-gray-800">
                  {data.ingredientsQualityRating}
                </span>
              </div>
              <div className="text-center pt-2">
                <span className="block text-[10px] text-gray-400 uppercase font-bold">
                  Efficacy
                </span>
                <span className="block text-xl font-bold text-gray-800">
                  {data.effectivenessRating}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-12 bg-amber-50/30 p-6 rounded-2xl border border-amber-100">
          <div className="text-left space-y-2">
            <div>
              <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                Issued Date
              </p>
              <p className="text-sm font-bold text-gray-900">
                {data.issuedDate}
              </p>
            </div>
            {data.expiryDate && (
              <div>
                <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                  Expiry Date
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {data.expiryDate}
                </p>
              </div>
            )}
            <div>
              <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                Cert. No
              </p>
              <p className="text-sm font-mono font-bold text-gray-900">
                {data.certNumber}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            {data.signature ? (
              <div className="text-center">
                <img
                  src={data.signature}
                  alt="Signature"
                  className="h-16 w-auto object-contain mix-blend-multiply"
                />
                <div className="w-40 border-t-2 border-amber-800 mt-1"></div>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {data.personName}
                </p>
                <p className="text-[10px] text-amber-700 font-medium">
                  {data.role}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-40 border-t-2 border-amber-800"></div>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {data.personName}
                </p>
                <p className="text-[10px] text-amber-700 font-medium">
                  {data.role}
                </p>
              </div>
            )}
          </div>

          <div className="text-right space-y-4 flex flex-col items-end">
            {data.badge && (
              <img
                src={data.badge}
                alt="Badge"
                className="h-24 w-auto drop-shadow-md"
              />
            )}
            <div>
              <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                Origin
              </p>
              <p className="text-sm font-bold text-gray-900">{data.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
