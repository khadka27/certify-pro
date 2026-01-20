import { CertificateTemplateProps } from "@/types/certificate";

export default function Template7({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-linear-to-br from-orange-50 to-amber-50 p-12 relative box-border overflow-hidden flex flex-col font-sans">
      <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-r from-orange-600 via-amber-500 to-orange-600 shadow-lg"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-r from-orange-600 via-amber-500 to-orange-600 shadow-lg"></div>

      {/* Background Watermark */}
      {data.showWatermark && (data.watermark || data.logo) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
          <img
            src={data.watermark || data.logo}
            alt="Watermark"
            className="w-[500px] h-auto object-contain rotate-12"
          />
        </div>
      )}

      <div className="relative z-10 flex-1 flex items-center justify-center pt-10 pb-10">
        <div className="bg-white rounded-[2.5rem] p-12 max-w-5xl w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-orange-100">
          <div className="flex items-center justify-between mb-8 overflow-hidden">
            <div className="flex items-center gap-6">
              {data.logo && (
                <img
                  src={data.logo}
                  alt="Logo"
                  className="h-16 w-auto object-contain"
                />
              )}
              <div className="h-10 w-0.5 bg-orange-200"></div>
              <div>
                <p className="text-xl font-black text-gray-900 tracking-tighter uppercase">
                  {data.manufacturerName}
                </p>
                {data.companyUrl && (
                  <p className="text-[10px] font-bold text-orange-500 tracking-widest">
                    {data.companyUrl}
                  </p>
                )}
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Registration ID
              </p>
              <p className="font-mono font-bold text-orange-600 text-lg">
                {data.certNumber}
              </p>
            </div>
          </div>

          <div className="text-center space-y-4 mb-8">
            <div className="inline-block relative">
              <h1 className="text-6xl font-black bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent tracking-tighter uppercase">
                {data.title}
              </h1>
              <div className="h-1.5 w-full bg-linear-to-r from-orange-600 to-amber-600 mt-1 rounded-full opacity-50"></div>
            </div>

            <div className="flex gap-8 items-center mt-6">
              {data.productImage && (
                <div className="bg-orange-50/30 p-4 rounded-3xl border border-orange-100 relative shadow-inner">
                  <img
                    src={data.productImage}
                    alt="Product"
                    className="w-48 h-48 object-contain"
                  />
                  <div className="absolute -bottom-4 right-4 bg-orange-600 text-white text-[10px] font-black p-2 px-4 rounded-full shadow-lg">
                    OFFICIAL PRODUCT
                  </div>
                </div>
              )}
              <div className="flex-1 bg-linear-to-br from-orange-50/50 to-amber-50/50 p-6 rounded-[2rem] border border-orange-100/50">
                <div
                  className="text-lg text-gray-700 leading-relaxed rich-text-content font-medium italic"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-orange-50/50 p-4 rounded-2xl text-center border border-orange-100">
              <p className="text-[9px] text-orange-600 uppercase font-black tracking-widest mb-1">
                Product
              </p>
              <p className="text-lg font-black text-gray-800 leading-none">
                {data.productName}
              </p>
              <p className="text-[10px] text-gray-500 mt-2 font-bold">
                {data.productCategory}
              </p>
            </div>
            <div className="bg-amber-50/50 p-4 rounded-2xl text-center border border-amber-100">
              <p className="text-[9px] text-amber-600 uppercase font-black tracking-widest mb-1">
                Components
              </p>
              <p className="text-xs font-bold text-gray-800 line-clamp-2">
                {data.keyActiveIngredients}
              </p>
              <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-tighter">
                {data.productForm}
              </p>
            </div>
            <div className="bg-orange-50/50 p-4 rounded-2xl text-center border border-orange-100 col-span-2 flex flex-col justify-center">
              <p className="text-[9px] text-orange-600 uppercase font-black tracking-widest mb-2">
                Technical Summary
              </p>
              <div className="flex justify-around items-center">
                <div className="text-center">
                  <span className="block text-[8px] text-gray-400 font-bold">
                    SAFETY
                  </span>
                  <span className="text-sm font-black text-gray-800">
                    {data.safetyRating}
                  </span>
                </div>
                <div className="text-center">
                  <span className="block text-[8px] text-gray-400 font-bold">
                    QUALITY
                  </span>
                  <span className="text-sm font-black text-gray-800">
                    {data.ingredientsQualityRating}
                  </span>
                </div>
                <div className="text-center">
                  <span className="block text-[8px] text-gray-400 font-bold">
                    VALUE
                  </span>
                  <span className="text-sm font-black text-gray-800">
                    {data.valueForMoneyRating}
                  </span>
                </div>
                <div className="text-center bg-orange-600 text-white px-3 py-1 rounded-lg">
                  <span className="block text-[8px] font-black opacity-80">
                    RATING
                  </span>
                  <span className="text-sm font-black">
                    {data.overallExpertRating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 pt-8 border-t-2 border-orange-100">
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl space-y-1">
                <h4 className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-2">
                  Assistance & Ordering
                </h4>
                <p className="text-sm font-bold text-gray-800">
                  {data.customerSupportEmail}
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {data.customerSupportPhone}
                </p>
                {data.buyNowUrl && (
                  <a
                    href={data.buyNowUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4 text-center bg-linear-to-r from-orange-600 to-amber-500 text-white font-black py-2 rounded-xl shadow-lg hover:shadow-orange-200 transition-all uppercase tracking-tighter italic"
                  >
                    Order Product Now →
                  </a>
                )}
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 gap-4">
                <span className="uppercase tracking-widest">
                  ISSUED: {data.issuedDate}
                </span>
                <span className="uppercase tracking-widest text-orange-500">
                  EXPIRES: {data.expiryDate}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <h4 className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-2">
                    Certified Officer
                  </h4>
                  <p className="text-2xl font-black text-gray-900 leading-none">
                    {data.personName}
                  </p>
                  <p className="text-[11px] font-bold text-orange-500 uppercase mt-1 tracking-tighter">
                    {data.role}
                  </p>
                </div>
                {data.signature && (
                  <div className="text-right">
                    <img
                      src={data.signature}
                      alt="Sign"
                      className="h-14 w-auto object-contain mix-blend-multiply brightness-75"
                    />
                    <div className="w-32 h-0.5 bg-orange-600 rounded-full mt-1"></div>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-end mt-4">
                <div className="text-[9px] text-gray-400 font-bold italic leading-tight max-w-[150px]">
                  "{data.verificationStatement}"
                </div>
                {data.badge && (
                  <img
                    src={data.badge}
                    alt="Badge"
                    className="h-28 w-auto drop-shadow-2xl"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
