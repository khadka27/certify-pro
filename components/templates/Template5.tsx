import { CertificateTemplateProps } from "@/types/certificate";

export default function Template5({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-linear-to-br from-rose-50 via-white to-pink-50 p-16 relative box-border overflow-hidden flex flex-col font-serif">
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

      {/* Background Watermark */}
      {data.showWatermark && (data.watermark || data.logo) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none z-0">
          <img
            src={data.watermark || data.logo}
            alt="Watermark"
            className="w-[550px] h-auto object-contain rotate-[-15deg]"
          />
        </div>
      )}

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
              {data.manufacturerName}
            </p>
          </div>
        </div>

        <div className="text-center space-y-4 flex-1 flex flex-col justify-center w-full">
          <h1 className="text-7xl font-serif italic text-rose-700 tracking-tight">
            {data.title}
          </h1>

          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 rounded-full bg-rose-400"></div>
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-rose-600"></div>
          </div>

          <div className="max-w-4xl mx-auto w-full">
            <div className="flex gap-8 items-center">
              {data.productImage && (
                <div className="flex-shrink-0 bg-white p-6 rounded-[2rem] shadow-xl border border-rose-100 relative">
                  <div className="absolute top-2 right-2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg">
                    9.8
                  </div>
                  <img
                    src={data.productImage}
                    alt="Product"
                    className="w-44 h-44 object-contain"
                  />
                </div>
              )}
              <div className="flex-1 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-rose-200 text-left">
                <div
                  className="text-lg text-gray-700 leading-relaxed mb-6 rich-text-content italic"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
                <div className="bg-linear-to-r from-rose-100 to-pink-100 p-6 rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 text-rose-300 font-bold text-4xl opacity-20 hover:opacity-100 transition-opacity">
                    CERTIFIED
                  </div>
                  <p className="text-sm text-rose-600 font-bold uppercase mb-1">
                    Authenticated Product
                  </p>
                  <p className="text-3xl font-black text-rose-800 leading-none">
                    {data.productName}
                  </p>
                  <p className="text-xs text-rose-600/70 mt-2 font-bold uppercase tracking-widest">
                    {data.productCategory} • {data.certificationStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 w-full max-w-4xl pt-6 text-[11px] text-gray-600 border-t border-rose-100">
            <div className="text-left space-y-1">
              <h4 className="text-rose-600 font-black uppercase text-[10px] mb-2 tracking-widest">
                Specifications
              </h4>
              <p>
                <span className="font-bold text-rose-400">Form:</span>{" "}
                {data.productForm}
              </p>
              <p>
                <span className="font-bold text-rose-400">Ingredients:</span>{" "}
                {data.keyActiveIngredients}
              </p>
              <p>
                <span className="font-bold text-rose-400">Compliance:</span>{" "}
                {data.dietaryCompliance}
              </p>
              {data.companyUrl && (
                <p className="text-rose-600 font-bold mt-2">
                  {data.companyUrl}
                </p>
              )}
            </div>
            <div className="px-6 border-x border-rose-100 space-y-1">
              <h4 className="text-rose-600 font-black uppercase text-[10px] mb-2 tracking-widest text-center">
                Support & Buy
              </h4>
              <p className="font-bold text-gray-800">
                {data.customerSupportEmail}
              </p>
              <p className="font-bold text-gray-800">
                {data.customerSupportPhone}
              </p>
              {data.buyNowUrl && (
                <a
                  href={data.buyNowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-rose-600 text-white px-6 py-2 rounded-full text-center font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg active:scale-95 text-[10px]"
                >
                  Buy Product Now
                </a>
              )}
            </div>
            <div className="text-right space-y-1">
              <h4 className="text-rose-600 font-black uppercase text-[10px] mb-2 tracking-widest">
                Verification Status
              </h4>
              <p>
                <span className="font-bold text-rose-400">Authority:</span>{" "}
                {data.certifiedBy}
              </p>
              <p>
                <span className="font-bold text-rose-400">ID:</span>{" "}
                {data.certNumber}
              </p>
              <p className="italic leading-tight mt-2 text-gray-500">
                "{data.verificationStatement}"
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between mt-8 border-t-2 border-rose-200 pt-8">
          <div className="text-left space-y-4">
            <div className="bg-rose-50 p-2 px-4 rounded-lg border border-rose-100 inline-block">
              <p className="text-[9px] text-rose-400 font-bold uppercase">
                Issued Date
              </p>
              <p className="font-bold text-gray-900">{data.issuedDate}</p>
            </div>
            <div className="bg-rose-50 p-2 px-4 rounded-lg border border-rose-100 inline-block block">
              <p className="text-[9px] text-rose-400 font-bold uppercase">
                Expiry Date
              </p>
              <p className="font-bold text-gray-900">{data.expiryDate}</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            {data.signature ? (
              <div className="text-center group">
                <img
                  src={data.signature}
                  alt="Sign"
                  className="h-16 w-auto mb-1 mix-blend-multiply brightness-75 transition-transform group-hover:scale-105"
                />
                <div className="w-48 h-0.5 bg-rose-600"></div>
                <p className="text-lg font-bold text-gray-900 mt-1">
                  {data.personName}
                </p>
                <p className="text-xs text-rose-600 font-black uppercase tracking-wider">
                  {data.role}
                </p>
              </div>
            ) : (
              <div className="text-center pt-8">
                <div className="w-40 border-t-2 border-rose-600"></div>
                <p className="text-lg font-bold text-gray-900 mt-1">
                  {data.personName}
                </p>
                <p className="text-xs text-rose-600 font-black uppercase tracking-wider">
                  {data.role}
                </p>
              </div>
            )}
          </div>

          <div className="text-right flex flex-col items-end gap-4">
            {data.badge && (
              <img
                src={data.badge}
                alt="Badge"
                className="h-28 w-auto drop-shadow-[0_10px_15px_rgba(225,29,72,0.2)]"
              />
            )}
            <div>
              <p className="text-[9px] text-rose-400 font-bold uppercase">
                Location
              </p>
              <p className="font-bold text-gray-900">{data.location}</p>
              <p className="text-xs font-black text-rose-700 uppercase italic mt-1">
                {data.finalVerdict}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
