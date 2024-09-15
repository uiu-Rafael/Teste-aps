import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    backgroundImage: {
      img_bg_header: "url('/assets/bgHeader.png')",
    },

    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        color1: '#3E4756',
        color2: '#A1ACBD', //essa cor fica pra quando algo for desabilitado
        color3: '#8a8a8a',
        color4: '#373737',
        color5: '#DEDEDE',
        color6: '#A6A6A6',
        color7: '#00DBAD',
        section1: '#EFEFEF',
        section2: '#FAFAFA',
      },
    },
  },
  darkMode: 'class',
};
export default config;
