import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const countries = [
        { name: 'Estados Unidos', iso: 'US', phoneCode: '+1' },
        { name: 'Brasil', iso: 'BR', phoneCode: '+55' },
        { name: 'México', iso: 'MX', phoneCode: '+52' },
        { name: 'Argentina', iso: 'AR', phoneCode: '+54' },
        { name: 'Chile', iso: 'CL', phoneCode: '+56' },
        { name: 'Colômbia', iso: 'CO', phoneCode: '+57' },
        { name: 'Peru', iso: 'PE', phoneCode: '+51' },
        { name: 'Venezuela', iso: 'VE', phoneCode: '+58' },
        { name: 'Equador', iso: 'EC', phoneCode: '+593' },
        { name: 'Bolívia', iso: 'BO', phoneCode: '+591' },
        { name: 'Paraguai', iso: 'PY', phoneCode: '+595' },
        { name: 'Uruguai', iso: 'UY', phoneCode: '+598' },
        { name: 'Reino Unido', iso: 'GB', phoneCode: '+44' },
        { name: 'França', iso: 'FR', phoneCode: '+33' },
        { name: 'Alemanha', iso: 'DE', phoneCode: '+49' },
        { name: 'Itália', iso: 'IT', phoneCode: '+39' },
        { name: 'Espanha', iso: 'ES', phoneCode: '+34' },
        { name: 'Portugal', iso: 'PT', phoneCode: '+351' },
        { name: 'Países Baixos', iso: 'NL', phoneCode: '+31' },
        { name: 'Bélgica', iso: 'BE', phoneCode: '+32' },
        { name: 'Suíça', iso: 'CH', phoneCode: '+41' },
        { name: 'Áustria', iso: 'AT', phoneCode: '+43' },
        { name: 'Suécia', iso: 'SE', phoneCode: '+46' },
        { name: 'Noruega', iso: 'NO', phoneCode: '+47' },
        { name: 'Dinamarca', iso: 'DK', phoneCode: '+45' },
        { name: 'Finlândia', iso: 'FI', phoneCode: '+358' },
        { name: 'Polônia', iso: 'PL', phoneCode: '+48' },
        { name: 'Grécia', iso: 'GR', phoneCode: '+30' },
        { name: 'República Tcheca', iso: 'CZ', phoneCode: '+420' },
        { name: 'Hungria', iso: 'HU', phoneCode: '+36' },
        { name: 'Romênia', iso: 'RO', phoneCode: '+40' },
        { name: 'Ucrânia', iso: 'UA', phoneCode: '+380' },
        { name: 'Rússia', iso: 'RU', phoneCode: '+7' },
        { name: 'China', iso: 'CN', phoneCode: '+86' },
        { name: 'Japão', iso: 'JP', phoneCode: '+81' },
        { name: 'Coreia do Sul', iso: 'KR', phoneCode: '+82' },
        { name: 'Índia', iso: 'IN', phoneCode: '+91' },
        { name: 'Indonésia', iso: 'ID', phoneCode: '+62' },
        { name: 'Tailândia', iso: 'TH', phoneCode: '+66' },
        { name: 'Vietnã', iso: 'VN', phoneCode: '+84' },
        { name: 'Filipinas', iso: 'PH', phoneCode: '+63' },
        { name: 'Malásia', iso: 'MY', phoneCode: '+60' },
        { name: 'Singapura', iso: 'SG', phoneCode: '+65' },
        { name: 'Paquistão', iso: 'PK', phoneCode: '+92' },
        { name: 'Bangladesh', iso: 'BD', phoneCode: '+880' },
        { name: 'Austrália', iso: 'AU', phoneCode: '+61' },
        { name: 'Nova Zelândia', iso: 'NZ', phoneCode: '+64' },
        { name: 'África do Sul', iso: 'ZA', phoneCode: '+27' },
        { name: 'Egito', iso: 'EG', phoneCode: '+20' },
        { name: 'Nigéria', iso: 'NG', phoneCode: '+234' },
        { name: 'Marrocos', iso: 'MA', phoneCode: '+212' },
        { name: 'Quênia', iso: 'KE', phoneCode: '+254' },
        { name: 'Turquia', iso: 'TR', phoneCode: '+90' },
        { name: 'Arábia Saudita', iso: 'SA', phoneCode: '+966' },
        { name: 'Emirados Árabes Unidos', iso: 'AE', phoneCode: '+971' },
        { name: 'Israel', iso: 'IL', phoneCode: '+972' },
        { name: 'Irã', iso: 'IR', phoneCode: '+98' },
        { name: 'Nepal', iso: 'NP', phoneCode: '+977' },
        { name: 'Mongólia', iso: 'MN', phoneCode: '+976' },
        { name: 'Camboja', iso: 'KH', phoneCode: '+855' },
        { name: 'Taiwan', iso: 'TW', phoneCode: '+886' },
        { name: 'Hong Kong', iso: 'HK', phoneCode: '+852' },
        { name: 'Argélia', iso: 'DZ', phoneCode: '+213' },
        { name: 'Angola', iso: 'AO', phoneCode: '+244' },
        { name: 'Gana', iso: 'GH', phoneCode: '+233' },
        { name: 'Etiópia', iso: 'ET', phoneCode: '+251' },
        { name: 'Tanzânia', iso: 'TZ', phoneCode: '+255' },
        { name: 'Uganda', iso: 'UG', phoneCode: '+256' },
        { name: 'Zimbábue', iso: 'ZW', phoneCode: '+263' },
        { name: 'Moçambique', iso: 'MZ', phoneCode: '+258' }
    
    ];

    for (const country of countries) {
        await prisma.country.upsert({
            where: { iso: country.iso },
            update: {},
            create: country
        });
    }

    console.log('Seed executado com sucesso!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });