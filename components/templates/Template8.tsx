import { CertificateTemplateProps } from "@/types/certificate";

export default function Template8({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white relative shadow-2xl box-border overflow-hidden flex flex-col">
      <div className="absolute top-8 left-8 w-32 h-32 border-t-4 border-l-4 border-teal-600"></div>
      <div className="absolute top-8 right-8 w-32 h-32 border-t-4 border-r-4 border-teal-600"></div>
      <div className="absolute bottom-8 left-8 w-32 h-32 border-b-4 border-l-4 border-teal-600"></div>
      <div className="absolute bottom-8 right-8 w-32 h-32 border-b-4 border-r-4 border-teal-600"></div>

      <div className="relative z-10 flex-1 flex flex-col p-12 py-4">
        <div className="flex items-start justify-between mb-12">
          <div className="space-y-2">
            {data.logo && (
              <img
                src={data.logo}
                alt="Logo"
                className="h-20 w-auto object-contain"
              />
            )}
            <p className="text-sm text-gray-600">{data.companyName}</p>
            <p className="text-xs text-gray-500">{data.location}</p>
          </div>

          {data.badge && (
            <img src={data.badge} alt="Badge" className="h-24 w-auto" />
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center text-center space-y-8">
          <div>
            <p className="text-sm text-teal-600 uppercase tracking-widest font-semibold mb-3">
              Official Certificate
            </p>
            <h1 className="text-6xl font-bold text-gray-800 mb-4">
              {data.title}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-24 bg-teal-600"></div>
              <div className="w-2 h-2 rounded-full bg-teal-600"></div>
              <div className="h-px w-24 bg-teal-600"></div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {data.description}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-left p-4 border-l-4 border-teal-600 bg-teal-50">
                <p className="text-xs text-teal-700 uppercase font-semibold mb-1">
                  Product Name
                </p>
                <p className="text-xl font-bold text-gray-800">
                  {data.productName}
                </p>
              </div>
              <div className="text-left p-4 border-l-4 border-teal-600 bg-teal-50">
                <p className="text-xs text-teal-700 uppercase font-semibold mb-1">
                  Certificate No
                </p>
                <p className="text-xl font-bold text-gray-800">
                  {data.certNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-r from-teal-500 to-emerald-500 text-white px-8 py-3 rounded-full shadow-lg">
            <p className="text-xs uppercase tracking-wider opacity-80 mb-1">
              Authorized By
            </p>
            <p className="text-2xl font-bold">{data.personName}</p>
            <p className="text-sm opacity-90">{data.role}</p>
          </div>
        </div>

        <div className="flex items-end justify-between mt-12 pt-8 border-t-2 border-teal-200">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase">Issue Date</p>
            <p className="text-sm font-bold text-gray-800">{data.issuedDate}</p>
            {data.expiryDate && (
              <>
                <p className="text-xs text-gray-500 uppercase mt-2">
                  Expiry Date
                </p>
                <p className="text-sm font-bold text-gray-800">
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
                className="h-16 w-auto mb-2"
              />
              <div className="w-48 border-t-2 border-teal-600"></div>
              <p className="text-xs text-gray-500 mt-1">Official Signature</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
