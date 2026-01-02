import { CertificateTemplateProps } from '@/types/certificate';

export default function Template3({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] h-[707px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-16 relative shadow-2xl">
      <div className="absolute inset-8 border-2 border-amber-500/30"></div>
      <div className="absolute inset-12 border border-amber-500/20"></div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-8">
        {data.logo && (
          <img src={data.logo} alt="Logo" className="h-20 w-auto object-contain brightness-0 invert opacity-90" />
        )}

        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-500"></div>
            <h1 className="text-5xl font-serif font-bold text-amber-400 tracking-widest uppercase">
              {data.title}
            </h1>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-500"></div>
          </div>

          <div className="w-32 h-1 bg-amber-500 mx-auto"></div>
        </div>

        <div className="bg-slate-800/50 border border-amber-500/20 p-8 max-w-2xl backdrop-blur-sm">
          <p className="text-lg text-slate-200 leading-relaxed">{data.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 max-w-2xl">
          <div className="text-left border-l-2 border-amber-500 pl-4">
            <p className="text-xs text-amber-400 uppercase tracking-wider mb-1">Product Name</p>
            <p className="text-xl font-semibold text-white">{data.productName}</p>
          </div>
          <div className="text-left border-l-2 border-amber-500 pl-4">
            <p className="text-xs text-amber-400 uppercase tracking-wider mb-1">Certificate No</p>
            <p className="text-xl font-semibold text-white">{data.certNumber}</p>
          </div>
        </div>

        <div className="space-y-2 pt-6">
          <p className="text-2xl font-bold text-amber-300">{data.personName}</p>
          <p className="text-base text-slate-300">{data.role}</p>
          <p className="text-sm text-slate-400">{data.companyName}</p>
        </div>

        <div className="flex items-center justify-between w-full max-w-3xl mt-8 pt-8 border-t border-amber-500/30">
          <div className="text-left">
            <p className="text-xs text-amber-400 uppercase">Issued</p>
            <p className="font-medium text-slate-200">{data.issuedDate}</p>
            {data.expiryDate && (
              <>
                <p className="text-xs text-amber-400 uppercase mt-2">Expires</p>
                <p className="font-medium text-slate-200">{data.expiryDate}</p>
              </>
            )}
          </div>

          {data.signature && (
            <div className="text-center">
              <img src={data.signature} alt="Signature" className="h-16 w-auto brightness-0 invert opacity-80" />
              <div className="w-48 border-t border-amber-500"></div>
              <p className="text-xs text-slate-400 mt-1">Authorized Signature</p>
            </div>
          )}

          {data.badge && (
            <img src={data.badge} alt="Badge" className="h-20 w-auto brightness-0 invert opacity-80" />
          )}

          <div className="text-right">
            <p className="text-xs text-amber-400 uppercase">Location</p>
            <p className="font-medium text-slate-200">{data.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
