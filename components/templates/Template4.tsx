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
