
import React, { useState, useEffect } from 'react';

// --- ICONS ---
const CloseIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const ArrowRightIcon = () => <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;
const UploadIcon = () => <svg className="w-8 h-8 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>;
const SolanaIcon = () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.262 18.883l3.336-1.933a.4.4 0 00.2-.347V7.393a.4.4 0 00-.2-.347L4.262 5.113a.4.4 0 00-.6.347v13.076a.4.4 0 00.6.347z" fill="url(#sol_paint0_linear)"/><path d="M9.138 21.013l3.336-1.933a.4.4 0 00.2-.347V9.573a.4.4 0 00-.2-.347L9.138 7.293a.4.4 0 00-.6.347v13.026a.4.4 0 00.6.347z" fill="url(#sol_paint1_linear)"/><path d="M14.013 16.743l3.336-1.933a.4.4 0 00.2-.347V4.303a.4.4 0 00-.2-.347l-3.336-1.93a.4.4 0 00-.6.346v13.98a.4.4 0 00.6.347z" fill="url(#sol_paint2_linear)"/><path d="M18.888 18.883l-3.336-1.933a.4.4 0 01-.2-.347V7.393a.4.4 0 01.2-.347l3.336-1.933a.4.4 0 01.6.347v13.076a.4.4 0 01-.6.347z" fill="url(#sol_paint3_linear)"/><path d="M13.988 21.013l-3.336-1.933a.4.4 0 01-.2-.347V9.573a.4.4 0 01.2-.347l3.336-1.933a.4.4 0 01.6.347v13.026a.4.4 0 01-.6.347z" fill="url(#sol_paint4_linear)"/><path d="M9.113 16.743l-3.336-1.933a.4.4 0 01-.2-.347V4.303a.4.4 0 01.2-.347l3.336-1.93a.4.4 0 01.6.346v13.98a.4.4 0 01-.6.347z" fill="url(#sol_paint5_linear)"/><defs><linearGradient id="sol_paint0_linear" x1="5.928" y1="5.11" x2="5.928" y2="18.88" gradientUnits="userSpaceOnUse"><stop stopColor="#00FFA3"/><stop offset="1" stopColor="#DC1FFF"/></linearGradient><linearGradient id="sol_paint1_linear" x1="10.805" y1="7.29" x2="10.805" y2="21.01" gradientUnits="userSpaceOnUse"><stop stopColor="#00FFA3"/><stop offset="1" stopColor="#DC1FFF"/></linearGradient><linearGradient id="sol_paint2_linear" x1="15.68" y1="2.02" x2="15.68" y2="16.74" gradientUnits="userSpaceOnUse"><stop stopColor="#00FFA3"/><stop offset="1" stopColor="#DC1FFF"/></linearGradient><linearGradient id="sol_paint3_linear" x1="17.22" y1="5.11" x2="17.22" y2="18.88" gradientUnits="userSpaceOnUse"><stop stopColor="#00FFA3"/><stop offset="1" stopColor="#DC1FFF"/></linearGradient><linearGradient id="sol_paint4_linear" x1="12.34" y1="7.29" x2="12.34" y2="21.01" gradientUnits="userSpaceOnUse"><stop stopColor="#00FFA3"/><stop offset="1" stopColor="#DC1FFF"/></linearGradient><linearGradient id="sol_paint5_linear" x1="7.46" y1="2.02" x2="7.46" y2="16.74" gradientUnits="userSpaceOnUse"><stop stopColor="#00FFA3"/><stop offset="1" stopColor="#DC1FFF"/></linearGradient></defs></svg>;
const PolygonIcon = () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.48.62L7.52.62C6.16.62 5.04 1.75 5.04 3.1l0 8.96c0 1.35 1.12 2.47 2.48 2.47l8.96 0c1.35 0 2.47-1.12 2.47-2.48l0-8.96C18.96 1.75 17.83.62 16.48.62zM16.48 23.38l-8.96 0c-1.35 0-2.47-1.12-2.47-2.48l0-8.96c0-1.35 1.12-2.47 2.48-2.47l8.96 0c1.35 0 2.47 1.12 2.47 2.48l0 8.96C18.96 22.25 17.83 23.38 16.48 23.38z" fill="#8247E5"/></svg>;
const UsdtIcon = () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#26A17B"/><path d="M15.006 13.338H17.25V11.106H15.006V7.5H12.75V11.106H6.75V8.856H9V6H11.25V8.856H12.75V6H15V8.856H17.25V7.5H15.006V6H17.25V5.25H6.75V13.338H9V15.588H6.75V18H9V15.588H12.75V18H15V15.588H17.25V13.338H15.006ZM12.75 13.338H9V11.106H12.75V13.338Z" fill="white"/></svg>;
const CreditCardIcon = () => <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const CryptoWalletIcon = () => <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

// --- INTERFACES ---
interface PumpUrShitNowModalProps {
    onClose: () => void;
}

interface Service {
    name: string;
    price: number;
}

// --- MAIN COMPONENT ---
const PumpUrShitNowModal = ({ onClose }: PumpUrShitNowModalProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedNetwork, setSelectedNetwork] = useState('SOLANA');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Credit/Debit Card');

    const totalSteps = 5;

    useEffect(() => {
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleSelectService = (service: Service) => {
        setSelectedService(service);
        setCurrentStep(2);
    };

    const nextStep = () => setCurrentStep(prev => (prev < 6 ? prev + 1 : prev));
    const prevStep = () => setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));

    const renderContent = () => {
        switch (currentStep) {
            case 1: return <Step1ChooseService onSelectService={handleSelectService} />;
            case 2: return <Step2BasicInfo service={selectedService} onNext={nextStep} onBack={prevStep} currentStep={currentStep-1} totalSteps={totalSteps} />;
            case 3: return <Step3SocialMedia service={selectedService} onNext={nextStep} onBack={prevStep} currentStep={currentStep-1} totalSteps={totalSteps} />;
            case 4: return <Step4Images service={selectedService} onNext={nextStep} onBack={prevStep} currentStep={currentStep-1} totalSteps={totalSteps} />;
            case 5: return <Step5ContactInfo service={selectedService} onNext={nextStep} onBack={prevStep} currentStep={currentStep-1} totalSteps={totalSteps} />;
            case 6: return <Step6Payment service={selectedService} onBack={() => setCurrentStep(5)} onClose={onClose} selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} />;
            default: return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="relative w-full max-w-2xl bg-[#0d1117] border border-cyan-400/30 rounded-2xl shadow-lg shadow-cyan-500/20" onClick={e => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full"></div>
                            <div>
                                <h2 className="text-xl font-bold text-white">PumpUr$hitNow</h2>
                                <p className="text-sm text-gray-400">Launch your memecoin to the moon</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon /></button>
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

// --- STEP COMPONENTS ---
const Step1ChooseService = ({ onSelectService }: { onSelectService: (service: Service) => void }) => {
    const services = [
        { name: "Credibility Boost", price: 299, features: ["Security Audit", "Verified Badge", "Trust Score", "Community Endorsement"], color: "orange" },
        { name: "Visibility Package", price: 499, features: ["Featured Listing", "Banner Ads", "Social Media Push", "Influencer Network"], color: "blue" },
        { name: "Hype Generator", price: 799, features: ["Viral Campaign", "Community Building", "Meme Creation", "Trending Boost"], color: "purple" },
    ];
    return (
        <div className="p-4">
            <h3 className="text-center text-2xl font-bold text-white mb-2">Choose Your Service</h3>
            <p className="text-center text-gray-400 mb-8">Select the perfect package to launch your memecoin</p>
            <div className="grid md:grid-cols-3 gap-6">
                {services.map(service => (
                    <div key={service.name} className={`p-6 rounded-xl border-2
                        ${service.color === 'orange' ? 'border-orange-500/50 bg-orange-500/10' : ''}
                        ${service.color === 'blue' ? 'border-cyan-500/50 bg-cyan-500/10' : ''}
                        ${service.color === 'purple' ? 'border-purple-500/50 bg-purple-500/10' : ''}
                    `}>
                        <h4 className="font-bold text-xl text-white mb-2">{service.name}</h4>
                        <p className="text-3xl font-bold text-white mb-4">${service.price}</p>
                        <ul className="space-y-2 text-sm text-gray-300 mb-6">
                            {service.features.map(feature => <li key={feature}>✅ {feature}</li>)}
                        </ul>
                        <button onClick={() => onSelectService(service)} className={`w-full font-bold py-2 rounded-lg
                            ${service.color === 'orange' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                            ${service.color === 'blue' ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
                            ${service.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' : ''}
                        `}>Select Package <ArrowRightIcon /></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FormStepLayout = ({ children, service, onNext, onBack, currentStep, totalSteps, title, nextButtonText = 'Next' }: { children: React.ReactNode, service: Service | null, onNext: () => void, onBack: () => void, currentStep: number, totalSteps: number, title: string, nextButtonText?: string }) => (
    <div className="p-4">
        <h3 className="text-center text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-center text-gray-400 mb-4">Selected: {service?.name} - ${service?.price}</p>
        <div className="flex justify-center space-x-2 mb-8">
            {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i < currentStep ? 'bg-cyan-400' : 'bg-gray-700'}`}></div>
            ))}
        </div>
        <div className="space-y-4">{children}</div>
        <div className="flex justify-between mt-8">
            <button onClick={onBack} className="bg-[#161B22] border border-[#30363D] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#30363D]">Back</button>
            <button onClick={onNext} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2 px-6 rounded-lg flex items-center">{nextButtonText} <ArrowRightIcon /></button>
        </div>
    </div>
);

const FormInput = ({ label, type = 'text', placeholder = '' }: { label: string, type?: string, placeholder?: string }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
        <input type={type} placeholder={placeholder} className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white" />
    </div>
);

const Step2BasicInfo = (props: any) => (
    <FormStepLayout {...props} title="Token Submission Form">
        <div className="grid grid-cols-2 gap-4">
            <FormInput label="Token Name" />
            <FormInput label="Token Symbol" />
        </div>
        <FormInput label="Token Description" />
        <FormInput label="Website URL" />
    </FormStepLayout>
);

const Step3SocialMedia = (props: any) => (
    <FormStepLayout {...props} title="Token Submission Form">
        <FormInput label="Twitter URL" />
        <FormInput label="Telegram URL" />
        <FormInput label="Discord URL" />
    </FormStepLayout>
);

const Step4Images = (props: any) => (
    <FormStepLayout {...props} title="Token Submission Form">
        <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
                <p className="font-semibold text-white mb-2">Logo</p>
                <div className="flex items-center justify-center w-full h-40 bg-[#0D1117] border-2 border-dashed border-[#30363D] rounded-lg">
                    <div className="text-center">
                        <UploadIcon />
                        <p className="text-sm text-gray-400">Upload Logo</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <p className="font-semibold text-white mb-2">Banner</p>
                 <div className="flex items-center justify-center w-full h-40 bg-[#0D1117] border-2 border-dashed border-[#30363D] rounded-lg">
                    <div className="text-center">
                        <UploadIcon />
                        <p className="text-sm text-gray-400">Upload Banner</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                </div>
            </div>
        </div>
    </FormStepLayout>
);

const Step5ContactInfo = (props: any) => (
    <FormStepLayout {...props} title="Token Submission Form" nextButtonText="Proceed to Payment">
        <FormInput label="Email Address" type="email" />
        <FormInput label="Contact Name" />
    </FormStepLayout>
);

const Step6Payment = ({ service, onBack, onClose, selectedNetwork, setSelectedNetwork, selectedPaymentMethod, setSelectedPaymentMethod }: { service: Service | null, onBack: () => void, onClose: () => void, selectedNetwork: string, setSelectedNetwork: (net: string) => void, selectedPaymentMethod: string, setSelectedPaymentMethod: (method: string) => void }) => {
    const networks = [
        { name: 'SOLANA', fee: '0.1 SOL', icon: <SolanaIcon />, color: "from-pink-500 to-purple-600" },
        { name: 'POLYGON', fee: '0.01 MATIC', icon: <PolygonIcon />, color: "from-purple-500 to-indigo-600" },
        { name: 'USDT', fee: '1 USDT', icon: <UsdtIcon />, color: "from-green-400 to-teal-500" },
    ];
    return (
        <div className="p-4">
            <h3 className="text-center text-2xl font-bold text-white mb-4">Payment</h3>
            <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 text-center mb-6">
                <p className="text-gray-400">{service?.name}</p>
                <p className="text-3xl font-bold text-white">${service?.price}</p>
            </div>
            
            <p className="font-semibold text-white mb-2">Choose Network</p>
            <div className="space-y-3 mb-6">
                {networks.map(net => (
                    <button key={net.name} onClick={() => setSelectedNetwork(net.name)} className={`w-full flex justify-between items-center p-4 rounded-lg border-2 transition-all ${selectedNetwork === net.name ? `border-cyan-400 bg-cyan-500/10` : 'border-transparent bg-gradient-to-r ' + net.color}`}>
                        <div className="flex items-center space-x-3">
                            {net.icon}
                            <div>
                                <p className="font-bold text-white text-left">{net.name}</p>
                                <p className="text-xs text-gray-300 text-left">Fee: {net.fee}</p>
                            </div>
                        </div>
                        <ArrowRightIcon />
                    </button>
                ))}
            </div>

            <p className="font-semibold text-white mb-2">Payment Method</p>
            <div className="space-y-3 mb-8">
                <button onClick={() => setSelectedPaymentMethod('Credit/Debit Card')} className={`w-full flex items-center p-4 rounded-lg border-2 transition-all ${selectedPaymentMethod === 'Credit/Debit Card' ? 'border-cyan-400 bg-cyan-500/10' : 'border-transparent bg-blue-600'}`}>
                    <CreditCardIcon /> <span className="font-bold">Credit/Debit Card</span>
                </button>
                <button onClick={() => setSelectedPaymentMethod('Crypto Wallet')} className={`w-full flex items-center p-4 rounded-lg border-2 transition-all ${selectedPaymentMethod === 'Crypto Wallet' ? 'border-cyan-400 bg-cyan-500/10' : 'border-transparent bg-purple-600'}`}>
                    <CryptoWalletIcon /> <span className="font-bold">Crypto Wallet</span>
                </button>
            </div>
            
            <button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-lg mb-3">Complete Payment - ${service?.price}</button>
            <button onClick={onBack} className="w-full bg-[#161B22] border border-[#30363D] text-white font-bold py-2 rounded-lg hover:bg-[#30363D]">Back to Form</button>
        </div>
    );
};

export default PumpUrShitNowModal;
