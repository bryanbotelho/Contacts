import messages from '../locales/messages.json' with { type: "json" };

export const getMessage = (key: keyof typeof messages['pt'], lang: 'pt' | 'en' = 'pt'): string => {
    return messages[lang]?.[key] ?? key;
};