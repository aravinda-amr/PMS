/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    colors: {
      'white':'#ffffff',

      'dark-blue':'#335e90',
      'dark-blue-2':'#3A6DA6',
      'blue-button':'#25456A',
      'light-blue':'#A4C0DF',
      'text-blue':'#D2DFEF',

      'signup1':'#4FAAE3',
      'signup2':'#0B3047',

      'login1':'#9AD59F',
      'login2':'#1E4822',
      'login3':'#52B75B',

    },
    fontFamily: {
      jakarta: ["Plus Jakarta Sans", 'sans-serif'],
    },
    extend: {
      spacing: {
        '128': '420px',
      },
      width: {
        'custom': '32rem',
      },
    },
  },
  plugins: [
    
  ],
}

