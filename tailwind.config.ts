import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Figtree', 'Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					100: 'hsl(var(--primary-100))',
					700: 'hsl(var(--primary-700))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					green: 'hsl(var(--accent-green))',
					magenta: 'hsl(var(--accent-magenta))',
					teal: 'hsl(var(--accent-teal))',
					skyblue: 'hsl(var(--accent-skyblue))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
				},
				danger: {
					DEFAULT: 'hsl(var(--danger))',
					foreground: 'hsl(var(--danger-foreground))',
				},
				neutral: {
					0: 'hsl(var(--neutral-0))',
					100: 'hsl(var(--neutral-100))',
					300: 'hsl(var(--neutral-300))',
					600: 'hsl(var(--neutral-600))',
					800: 'hsl(var(--neutral-800))',
					900: 'hsl(var(--neutral-900))',
				},
				jio: {
					DEFAULT: 'hsl(var(--jio))',
					foreground: 'hsl(var(--jio-foreground))',
					light: 'hsl(var(--jio-light))',
					dark: 'hsl(var(--jio-dark))',
					muted: 'hsl(var(--jio-muted))',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				none: '0px',
				sm: 'calc(var(--radius-sm))',
				DEFAULT: 'calc(var(--radius-md))',
				md: 'calc(var(--radius-md))',
				lg: 'calc(var(--radius-lg))',
				xl: 'calc(var(--radius-xl))',
				'2xl': 'calc(var(--radius-xl) + 8px)',
				'3xl': 'calc(var(--radius-xl) + 16px)',
				pill: '9999px',
				circle: '50%',
			},
			boxShadow: {
				sm: 'var(--shadow-1)',
				DEFAULT: 'var(--shadow-2)',
				md: 'var(--shadow-2)',
				lg: 'var(--shadow-3)',
				xl: 'var(--shadow-3)',
			},
			fontSize: {
				'xs': 'var(--font-size-caption)',
				'sm': 'var(--font-size-body-sm)',
				'base': 'var(--font-size-body-md)',
				'lg': 'var(--font-size-body-lg)',
				'xl': 'var(--font-size-h4)',
				'2xl': 'var(--font-size-h3)',
				'3xl': 'var(--font-size-h2)',
				'4xl': 'var(--font-size-h1)',
				'5xl': 'var(--font-size-display)',
			},
			lineHeight: {
				heading: 'var(--line-height-heading)',
				body: 'var(--line-height-body)',
			},
			spacing: {
				'0.5': 'var(--spacing-0.5)',
				'1': 'var(--spacing-1)',
				'1.5': 'var(--spacing-1.5)',
				'2': 'var(--spacing-2)',
				'3': 'var(--spacing-3)',
				'4': 'var(--spacing-4)',
				'6': 'var(--spacing-6)',
				'8': 'var(--spacing-8)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				spotlight: {
					'0%': {
						opacity: '0',
						transform: 'translate(-72%, -62%) scale(0.5)'
					},
					'100%': {
						opacity: '1',
						transform: 'translate(-50%,-40%) scale(1)'
					}
				},
				shimmer: {
					'0%': {
						backgroundPosition: '-500px 0'
					},
					'100%': {
						backgroundPosition: '500px 0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'slide-down': 'slide-down 0.3s ease-out',
				float: 'float 3s ease-in-out infinite',
				spotlight: 'spotlight 2s ease .75s 1 forwards',
				shimmer: 'shimmer 2s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
