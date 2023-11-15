/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
    './formkit.config.js',
    './node_modules/vue-tailwind-datepicker/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'vtd-primary': colors.blue, // Light mode Datepicker color
        // 'vtd-secondary': colors.gray, // Dark mode Datepicker color
        'bone-white': '#FAF9F6', // Fondo general, UI ligera
        blue: '#2563EB', // Botones primarios, enlaces
        'light-blue': '#bfdbfe', // Fondo de botones secundarios, indicadores de estado
        'mint-green': '#D1FAE5', // Notificaciones de éxito, indicadores de progreso
        emerald: '#10b981', // Botones de confirmación, énfasis en sostenibilidad
        yellow: '#FBBF24', // Alertas, llamadas a la acción, íconos destacados
        amber: '#fbbf24', // Versiones alternativas de alertas, botones con atención cautelar
        red: '#DC2626', // Errores, advertencias críticas
        rose: '#f43f5e', // Mensajes importantes, íconos de error secundario
        'light-red': '#F7B2B7', // Mensajes de advertencia, íconos de error primario
        'cool-gray': '#9CA3AF', // Textos secundarios, íconos, bordes sutiles
        'warm-gray': '#F5F5F4', // Fondo de secciones especiales, tarjetas
        'radio-selected': '#FBBF24'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
