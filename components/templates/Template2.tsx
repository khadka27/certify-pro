import { CertificateTemplateProps } from '@/types/certificate';

export default function Template2({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] h-[707px] bg-gradient-to-br from-blue-50 to-cyan-50 p-12 relative shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>

      <div className="h-full flex flex-col bg-white rounded-lg shadow-xl p-12">
        <div className="flex items-start justify-between mb-8">
          {data.logo && (
            <img src={data.logo} alt="Logo" className="h-16 w-auto object-contain" />
          )}
          {data.badge && (
            <img src={data.badge} alt="Badge" className="h-16 w-auto" />
          )}
        </div>

        <div className="text-center flex-1 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center justify-center">
            <div className="h-px w-20 bg-blue-600"></div>
            <h1 className="text-5xl font-bold text-blue-900 mx-6">{data.title}</h1>
            <div className="h-px w-20 bg-blue-600"></div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
            <p className="text-lg text-gray-700 leading-relaxed">{data.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase">Product</p>
              <p className="text-xl text-gray-800">{data.productName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase">Certificate No</p>
              <p className="text-xl text-gray-800">{data.certNumber}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase">Company</p>
              <p className="text-xl text-gray-800">{data.companyName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase">Location</p>
              <p className="text-xl text-gray-800">{data.location}</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg">
            <p className="text-2xl font-semibold text-blue-900">{data.personName}</p>
            <p className="text-base text-blue-700">{data.role}</p>
          </div>
        </div>

        <div className="flex items-end justify-between mt-8 pt-6 border-t-2 border-blue-200">
          <div>
            <p className="text-xs text-gray-500 uppercase">Issued</p>
            <p className="text-sm font-medium text-gray-800">{data.issuedDate}</p>
            {data.expiryDate && (
              <>
                <p className="text-xs text-gray-500 uppercase mt-2">Expires</p>
                <p className="text-sm font-medium text-gray-800">{data.expiryDate}</p>
              </>
            )}
          </div>

          {data.signature && (
            <div className="text-center">
              <img src={data.signature} alt="Signature" className="h-14 w-auto mb-1" />
              <div className="w-40 border-t border-gray-400"></div>
              <p className="text-xs text-gray-500 mt-1">Authorized Signatory</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
