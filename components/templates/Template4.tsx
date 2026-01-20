import { CertificateTemplateProps } from "@/types/certificate";

export default function Template4({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white p-12 relative box-border overflow-hidden flex flex-col font-sans">
      <div className="absolute top-0 left-0 w-64 h-64 bg-linear-to-br from-emerald-500/10 to-transparent rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-linear-to-tl from-teal-500/10 to-transparent rounded-tl-full"></div>

      {/* Background Watermark */}
      {data.showWatermark && (data.watermark || data.logo) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none z-0">
          <img
            src={data.watermark || data.logo}
            alt="Watermark"
            className="w-[400px] h-auto object-contain rotate-12"
          />
        </div>
      )}

      <div className="relative z-10 flex-1 border-4 border-emerald-600 rounded-lg p-12 flex flex-col shadow-2xl">
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
              <p className="text-sm font-bold text-gray-800">
                {data.manufacturerName}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-tighter">
                {data.location}
              </p>
            </div>
          </div>

          {data.badge && (
            <img
              src={data.badge}
              alt="Badge"
              className="h-24 w-auto drop-shadow-md"
            />
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="flex gap-10 items-center mb-8">
            <div className="flex-1">
              <h1 className="text-6xl font-black text-emerald-800 tracking-tighter leading-none mb-4">
                {data.title}
              </h1>
              <div className="h-2 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full w-48 mb-6"></div>
              <div
                className="text-lg text-gray-700 leading-relaxed rich-text-content italic font-medium"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
            {data.productImage && (
              <div className="flex-shrink-0 bg-white p-4 rounded-2xl border-2 border-emerald-50 shadow-xl relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-500 rounded-full"></div>
                <img
                  src={data.productImage}
                  alt="Product"
                  className="w-56 h-56 object-contain relative z-10"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-12 mb-8">
            <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">
                Product Info
              </p>
              <p className="text-2xl font-bold text-gray-900 border-b-2 border-emerald-100 pb-2 mb-2">
                {data.productName}
              </p>
              <div className="grid grid-cols-2 text-xs gap-4 text-gray-600">
                <p>
                  <span className="font-bold">Cat:</span> {data.productCategory}
                </p>
                <p>
                  <span className="font-bold">Form:</span> {data.productForm}
                </p>
                <p className="col-span-2 leading-tight">
                  <span className="font-bold">Ingred:</span>{" "}
                  {data.keyActiveIngredients}
                </p>
              </div>
            </div>
            <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">
                Certification
              </p>
              <p className="text-xl font-mono font-bold text-gray-800 border-b-2 border-emerald-100 pb-2 mb-2">
                {data.certNumber}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-emerald-700 uppercase">
                  {data.certificationStatus}
                </span>
                <span className="text-sm font-bold text-emerald-900 bg-emerald-200 px-3 py-1 rounded-full shadow-sm">
                  {data.overallExpertRating} SCORE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-3 gap-8 py-6 border-t-2 border-emerald-50 text-[11px] text-gray-600">
          <div className="space-y-1">
            <h4 className="font-black text-emerald-700 uppercase text-[9px] mb-2">
              Technical Standards
            </h4>
            <p>
              <span className="font-bold text-emerald-600/80 uppercase text-[8px]">
                Dietary:
              </span>{" "}
              {data.dietaryCompliance}
            </p>
            <p>
              <span className="font-bold text-emerald-600/80 uppercase text-[8px]">
                Testing:
              </span>{" "}
              {data.thirdPartyTesting}
            </p>
            <p>
              <span className="font-bold text-emerald-600/80 uppercase text-[8px]">
                Approvals:
              </span>{" "}
              {data.certificationsAndApprovals}
            </p>
          </div>
          <div className="space-y-1 border-x border-emerald-50 px-8">
            <h4 className="font-black text-emerald-700 uppercase text-[9px] mb-2">
              Contact & URLS
            </h4>
            <p className="font-bold text-emerald-900">
              {data.customerSupportEmail}
            </p>
            <p className="font-bold text-emerald-900">
              {data.customerSupportPhone}
            </p>
            {data.companyUrl && (
              <p className="text-blue-600 font-bold truncate mt-1">
                {data.companyUrl}
              </p>
            )}
          </div>
          <div className="space-y-1 text-right">
            <h4 className="font-black text-emerald-700 uppercase text-[9px] mb-2">
              Order Integrity
            </h4>
            <p className="font-medium">
              Refund policy verified:{" "}
              <span className="text-emerald-700 font-bold">
                {data.refundPolicy}
              </span>
            </p>
            {data.buyNowUrl && (
              <a
                href={data.buyNowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 bg-emerald-600 text-white px-5 py-2.5 rounded-full font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg active:scale-95 text-center"
              >
                Buy Product Now
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t-2 border-emerald-600">
          <div className="flex gap-10">
            <div>
              <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest">
                Authorized On
              </p>
              <p className="text-sm font-bold text-gray-900">
                {data.issuedDate}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest">
                Expiration
              </p>
              <p className="text-sm font-bold text-gray-900">
                {data.expiryDate}
              </p>
            </div>
          </div>

          <div className="text-center group">
            {data.signature && (
              <img
                src={data.signature}
                alt="Sign"
                className="h-16 w-auto mx-auto mb-1 mix-blend-multiply brightness-90"
              />
            )}
            <div className="w-56 h-0.5 bg-emerald-600 rounded-full"></div>
            <p className="text-sm font-black text-gray-900 mt-1 uppercase tracking-tighter">
              {data.personName}
            </p>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
              {data.role}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest">
              Verdict
            </p>
            <p className="text-xl font-black text-emerald-900 italic tracking-tighter uppercase">
              {data.finalVerdict}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
