@import "tailwindcss";

@theme {
  --color-brand-50: #FFFDF0;
  --color-brand-100: #FFFBEA;
  --color-brand-200: #FEF3C7;
  --color-brand-300: #FDE68A;
  --color-brand-400: #FCD34D;
  --color-brand-500: #FFB800;
  --color-brand-600: #E6A600;
  --color-brand-700: #D97706;
  --color-brand-800: #B45309;
  --color-brand-900: #78350F;
  --color-brand-950: #451A03;

  --color-emerald-50: #FFFDF0;
  --color-emerald-100: #FFFBEA;
  --color-emerald-200: #FEF3C7;
  --color-emerald-300: #FDE68A;
  --color-emerald-400: #FCD34D;
  --color-emerald-500: #FFB800;
  --color-emerald-600: #FFB800;
  --color-emerald-700: #E6A600;
  --color-emerald-800: #D97706;
  --color-emerald-900: #B45309;
  --color-emerald-950: #78350F;

  --color-green-50: #FFFDF0;
  --color-green-100: #FFFBEA;
  --color-green-200: #FEF3C7;
  --color-green-300: #FDE68A;
  --color-green-400: #FCD34D;
  --color-green-500: #FFB800;
  --color-green-600: #FFB800;
  --color-green-700: #E6A600;
  --color-green-800: #D97706;
  --color-green-900: #B45309;
  --color-green-950: #78350F;

  --color-bloomberg-50: #FFFDF0;
  --color-bloomberg-100: #FFFBEA;
  --color-bloomberg-200: #FEF3C7;
  --color-bloomberg-300: #FDE68A;
  --color-bloomberg-400: #FCD34D;
  --color-bloomberg-500: #FFB800;
  --color-bloomberg-600: #E6A600;
  --color-bloomberg-700: #D97706;
  --color-bloomberg-800: #B45309;
  --color-bloomberg-900: #78350F;
  --color-bloomberg-950: #451A03;

  --font-courier: 'Courier Prime', Courier, monospace;
  --font-mono: 'JetBrains Mono', 'Courier Prime', Courier, monospace;
}

@layer base {
  :root {
    --color-50: #FFFDF0;
    --color-100: #FFFBEA;
    --color-200: #FEF3C7;
    --color-300: #FDE68A;
    --color-400: #FCD34D;
    --color-500: #FFB800;
    --color-600: #E6A600;
    --color-700: #D97706;
    --color-800: #B45309;
    --color-900: #78350F;
    --color-950: #451A03;

    --bloomberg-yellow: #FFB800;
    --bloomberg-yellow-hover: #E6A600;
    --bloomberg-yellow-light: #FFFDF0;
    --bloomberg-yellow-border: #FDE68A;
    --bloomberg-yellow-dark: #B45309;

    --font-sans: 'Courier Prime', Courier, monospace;
    --font-display: 'Courier Prime', Courier, monospace;
    --font-mono: 'JetBrains Mono', 'Courier Prime', Courier, monospace;
  }

  html {
    font-size: 18.667px; /* +2pt increase over default browser 16px (12pt -> 14pt) */
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: var(--font-sans);
    font-size: 1rem;
    line-height: 1.6;
    background-color: #FFFFFF;
    color: #000000;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6, .font-display {
    font-family: var(--font-display);
    letter-spacing: -0.01em;
    color: #000000;
  }

  code, pre, .font-mono {
    font-family: var(--font-mono);
  }

  /* Universal high-contrast light theme styling */
  .bg-slate-950, .bg-slate-950\/100, .bg-slate-950\/90, .bg-slate-950\/85, .bg-slate-950\/80, .bg-slate-950\/70, .bg-slate-950\/60, .bg-slate-950\/50, .bg-slate-950\/40, .bg-slate-950\/30 {
    background-color: #FFFFFF !important;
  }

  .bg-slate-900, .bg-slate-900\/100, .bg-slate-900\/95, .bg-slate-900\/90, .bg-slate-900\/80, .bg-slate-900\/70, .bg-slate-900\/60, .bg-slate-900\/50 {
    background-color: #FAFAFA !important;
  }

  .bg-slate-800, .bg-slate-800\/100, .bg-slate-800\/90, .bg-slate-800\/80, .bg-slate-800\/60, .bg-slate-800\/50, .bg-slate-800\/40 {
    background-color: #FFFDF0 !important;
  }

  .bg-slate-700, .bg-slate-700\/80, .bg-slate-700\/50 {
    background-color: #FFFBEA !important;
  }

  .from-slate-950, .via-slate-900, .to-slate-950, .from-slate-900, .via-slate-950, .to-slate-900 {
    --tw-gradient-from: #FFFDF0 var(--tw-gradient-from-position) !important;
    --tw-gradient-to: #FFFBEA var(--tw-gradient-to-position) !important;
    --tw-gradient-stops: var(--tw-gradient-from), #FFFDF0 var(--tw-gradient-via-position), var(--tw-gradient-to) !important;
  }

  .border-slate-800, .border-slate-800\/80, .border-slate-800\/60, .border-slate-800\/40, .border-slate-800\/90 {
    border-color: #FEF3C7 !important;
  }

  .border-slate-700, .border-slate-700\/80, .border-slate-700\/70, .border-slate-700\/50 {
    border-color: #FDE68A !important;
  }

  .border-slate-900 {
    border-color: #FFFBEA !important;
  }

  /* High contrast pure black font colors */
  .text-white {
    color: #000000 !important;
  }

  .text-slate-100, .text-slate-200, .text-slate-300, .text-slate-400, .text-slate-500, .text-slate-600, .text-slate-700, .text-slate-800, .text-slate-900,
  .text-gray-100, .text-gray-200, .text-gray-300, .text-gray-400, .text-gray-500, .text-gray-600, .text-gray-700, .text-gray-800, .text-gray-900,
  .text-neutral-100, .text-neutral-200, .text-neutral-300, .text-neutral-400, .text-neutral-500, .text-neutral-600, .text-neutral-700, .text-neutral-800, .text-neutral-900,
  .text-zinc-100, .text-zinc-200, .text-zinc-300, .text-zinc-400, .text-zinc-500, .text-zinc-600, .text-zinc-700, .text-zinc-800, .text-zinc-900 {
    color: #000000 !important;
  }

  .text-muted, .text-muted-foreground {
    color: #000000 !important;
  }

  /* Black buttons & primary CTAs with high contrast white text & icons */
  button.bg-emerald-600, 
  button.bg-emerald-700,
  button.bg-green-600, 
  button.bg-green-700,
  button.bg-orange-600,
  button.bg-orange-700,
  button.bg-amber-500,
  button.bg-amber-600,
  button.bg-rose-600, 
  button.bg-indigo-600,
  button.bg-teal-600,
  button.bg-slate-900,
  button.btn-primary,
  .btn-primary,
  .bg-emerald-600,
  .bg-emerald-700,
  .bg-rose-600,
  .bg-indigo-600,
  button.bg-\[\#4D7D4B\],
  button.bg-\[\#75AC73\],
  button.bg-\[\#5A8D58\],
  button.bg-\[\#3D633C\],
  button.bg-\[\#2E5A2C\],
  button.bg-\[\#FF5722\],
  button.bg-\[\#FFB800\],
  button.bg-black,
  button.bg-\[\#000000\],
  .bg-\[\#4D7D4B\],
  .bg-\[\#75AC73\],
  .bg-\[\#5A8D58\],
  .bg-\[\#3D633C\],
  .bg-\[\#2E5A2C\],
  .bg-\[\#FF5722\],
  .bg-\[\#FFB800\],
  .bg-black {
    background-color: #000000 !important;
    color: #FFFFFF !important;
    font-weight: 700 !important;
  }

  /* High contrast white text for Black buttons & badges */
  button.bg-emerald-600 span, 
  button.bg-emerald-700 span,
  button.bg-green-600 span, 
  button.bg-green-700 span,
  button.bg-rose-600 span,
  button.bg-teal-600 span,
  button.bg-indigo-600 span,
  button.bg-\[\#4D7D4B\] span,
  button.bg-\[\#75AC73\] span,
  button.bg-\[\#5A8D58\] span,
  button.bg-\[\#3D633C\] span,
  button.bg-\[\#2E5A2C\] span,
  button.bg-\[\#FF5722\] span,
  button.bg-\[\#FFB800\] span,
  button.bg-black span,
  .bg-\[\#75AC73\] span,
  .bg-\[\#5A8D58\] span,
  .bg-\[\#4D7D4B\] span,
  .bg-\[\#3D633C\] span,
  .bg-\[\#2E5A2C\] span,
  .bg-\[\#FF5722\] span,
  .bg-\[\#FFB800\] span,
  .bg-black span,
  button.bg-\[\#FFB800\] svg,
  button.bg-\[\#FF5722\] svg,
  button.bg-\[\#4D7D4B\] svg,
  button.bg-black svg {
    color: #FFFFFF !important;
  }

  /* Button Hover States: sleek neutral black #262626 */
  button.bg-emerald-600:hover, 
  button.bg-emerald-700:hover,
  button.bg-green-600:hover, 
  button.bg-green-700:hover,
  button.bg-\[\#4D7D4B\]:hover,
  button.bg-\[\#75AC73\]:hover,
  button.bg-\[\#5A8D58\]:hover,
  button.bg-\[\#3D633C\]:hover,
  button.bg-\[\#2E5A2C\]:hover,
  button.bg-\[\#FF5722\]:hover,
  button.bg-\[\#FFB800\]:hover,
  button.bg-black:hover,
  .hover\:bg-\[\#3D633C\]:hover,
  .hover\:bg-\[\#2E5A2C\]:hover,
  .hover\:bg-\[\#5A8D58\]:hover,
  .hover\:bg-\[\#4D7D4B\]:hover,
  .hover\:bg-\[\#E64A19\]:hover,
  .hover\:bg-\[\#E6A600\]:hover,
  .hover\:bg-neutral-800:hover,
  .hover\:bg-black:hover {
    background-color: #262626 !important;
    color: #FFFFFF !important;
  }

  /* Active indicators, status dots, and pulse animations */
  .rounded-full.bg-\[\#75AC73\],
  .rounded-full.bg-\[\#4D7D4B\],
  .rounded-full.bg-\[\#5A8D58\],
  .rounded-full.bg-\[\#9DC39A\],
  .rounded-full.bg-\[\#89B887\],
  .rounded-full.bg-\[\#FF5722\],
  .rounded-full.bg-\[\#FFB800\],
  .rounded-full.bg-emerald-500,
  .rounded-full.bg-green-500 {
    background-color: #FFB800 !important;
  }

  .animate-ping.bg-\[\#9DC39A\],
  .animate-ping.bg-\[\#75AC73\],
  .animate-ping.bg-\[\#4D7D4B\],
  .animate-ping.bg-\[\#FF5722\],
  .animate-ping.bg-\[\#FFB800\],
  .animate-pulse.bg-\[\#4D7D4B\],
  .animate-pulse.bg-\[\#75AC73\],
  .animate-pulse.bg-\[\#FF5722\],
  .animate-pulse.bg-\[\#FFB800\] {
    background-color: #FFB800 !important;
  }

  /* High-contrast Bloomberg Yellow borders */
  .border-\[\#B0CFAD\],
  .border-\[\#C4DBC1\],
  .border-\[\#D7E7D6\],
  .border-\[\#FFCCBC\],
  .border-\[\#FDE68A\] {
    border-color: #FDE68A !important;
  }

  .border-\[\#5A8D58\],
  .border-\[\#3D633C\],
  .border-\[\#4D7D4B\],
  .border-\[\#FF5722\],
  .border-\[\#FFB800\] {
    border-color: #FFB800 !important;
  }

  .focus\:border-\[\#4D7D4B\]:focus,
  .focus\:border-\[\#75AC73\]:focus,
  .focus\:border-\[\#FF5722\]:focus,
  .focus\:border-\[\#FFB800\]:focus {
    border-color: #FFB800 !important;
  }

  /* High-contrast light mode soft backgrounds */
  .bg-\[\#EBF3EA\],
  .bg-\[\#F6FAF5\],
  .bg-\[\#FAFCFA\],
  .bg-\[\#FFF5F2\],
  .bg-\[\#FFFDF0\] {
    background-color: #FFFDF0 !important;
  }

  .hover\:bg-\[\#EBF3EA\]:hover,
  .hover\:bg-\[\#FFEBE5\]:hover,
  .hover\:bg-\[\#FFFBEA\]:hover {
    background-color: #FFFBEA !important;
  }

  .hover\:bg-\[\#D7E7D6\]:hover,
  .hover\:bg-\[\#FFD2C4\]:hover,
  .hover\:bg-\[\#FEF3C7\]:hover {
    background-color: #FEF3C7 !important;
  }

  /* High-contrast Bloomberg Amber/Gold text accents (WCAG AA compliant contrast on light bg) */
  .text-\[\#4D7D4B\],
  .text-\[\#2E5A2C\],
  .text-\[\#5A8D58\],
  .text-\[\#75AC73\],
  .text-\[\#D84315\],
  .text-\[\#B45309\] {
    color: #B45309 !important;
  }

  .hover\:text-\[\#2E5A2C\]:hover,
  .hover\:text-\[\#4D7D4B\]:hover,
  .hover\:text-\[\#5A8D58\]:hover,
  .hover\:text-\[\#FF5722\]:hover,
  .hover\:text-\[\#D97706\]:hover {
    color: #D97706 !important;
  }

  /* Inputs, textareas, and sliders */
  input, textarea, select {
    background-color: #FFFFFF !important;
    color: #000000 !important;
    border-color: #FDE68A !important;
    font-size: 0.95rem !important;
  }

  input:focus, textarea:focus, select:focus {
    border-color: #FFB800 !important;
    outline: 2px solid rgba(255, 184, 0, 0.25) !important;
  }

  input[type="range"] {
    accent-color: #FFB800 !important;
  }

  .accent-\[\#4D7D4B\],
  .accent-\[\#FF5722\],
  .accent-\[\#FFB800\] {
    accent-color: #FFB800 !important;
  }

  input::placeholder, textarea::placeholder {
    color: #1A1A1A !important;
    opacity: 0.85;
  }

  /* Typography 2pt Size Enhancements */
  .text-\[10px\] {
    font-size: 13px !important;
    line-height: 1.4 !important;
  }

  .text-\[11px\] {
    font-size: 14px !important;
    line-height: 1.45 !important;
  }

  .text-xs {
    font-size: 0.85rem !important;
    line-height: 1.45 !important;
  }

  .text-sm {
    font-size: 0.95rem !important;
    line-height: 1.5 !important;
  }

  .text-base {
    font-size: 1.05rem !important;
    line-height: 1.6 !important;
  }

  .text-lg {
    font-size: 1.2rem !important;
    line-height: 1.6 !important;
  }

  .text-xl {
    font-size: 1.35rem !important;
    line-height: 1.5 !important;
  }

  .text-2xl {
    font-size: 1.65rem !important;
    line-height: 1.4 !important;
  }

  .text-3xl {
    font-size: 2rem !important;
    line-height: 1.3 !important;
  }
}

/* Custom Sleek Light Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #FFFDF0;
}

::-webkit-scrollbar-thumb {
  background: #FDE68A;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #FFB800;
}

/* Selection */
::selection {
  background-color: #FEF3C7 !important;
  color: #78350F !important;
}

/* Hide scrollbar utility */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Subtle glow badges & effects matching color scale */
.glow-emerald, .glow-green, .glow-brand, .glow-bloomberg, .glow-yellow {
  box-shadow: 0 0 25px -5px rgba(255, 184, 0, 0.4);
}

.glow-rose {
  box-shadow: 0 0 25px -5px rgba(244, 63, 94, 0.25);
}

.glow-indigo {
  box-shadow: 0 0 25px -5px rgba(99, 102, 241, 0.25);
}

.glow-rose {
  box-shadow: 0 0 25px -5px rgba(244, 63, 94, 0.25);
}

.glow-indigo {
  box-shadow: 0 0 25px -5px rgba(99, 102, 241, 0.25);
}


