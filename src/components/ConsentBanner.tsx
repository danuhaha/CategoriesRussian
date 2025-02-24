import React, {useState, useEffect} from "react";

const CONSENT_STORAGE_ID = 'consent'

export default function ConsentBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent =  localStorage.getItem(CONSENT_STORAGE_ID);
        if (consent !== 'true') {
            setVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage?.setItem(CONSENT_STORAGE_ID, 'true'); // Set consent for 1 year
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            className="fixed z-50 top-4 left-1/2 transform -translate-x-1/2 border border-black text-black p-2 text-xxs xxs:text-xs flex items-center bg-[#faf9f6] rounded-full w-auto max-w-[calc(100%-40px)]">
            <p className="mr-2 whitespace-nowrap">
                Мы собираем ваши данные, а вы соглашаетесь :)
            </p>
            <button
                className="border border-black text-black font-bold py-1 px-2 rounded-full bg-transparent"
                onClick={handleAccept}
            >
                OK
            </button>
        </div>

    );
}
