
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
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
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
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
			boxShadow: {
				'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.08), 0 4px 16px -6px rgba(0, 0, 0, 0.06)',
				'medium': '0 4px 12px -2px rgba(0, 0, 0, 0.12), 0 8px 24px -8px rgba(0, 0, 0, 0.08)',
				'elevated': '0 8px 24px -4px rgba(0, 0, 0, 0.15), 0 16px 48px -12px rgba(0, 0, 0, 0.1)',
				'dramatic': '0 16px 48px -8px rgba(0, 0, 0, 0.2), 0 32px 64px -16px rgba(0, 0, 0, 0.15)',
				'amber-soft': '0 2px 8px -2px rgba(245, 158, 11, 0.15), 0 4px 16px -6px rgba(245, 158, 11, 0.1)',
				'amber-medium': '0 4px 12px -2px rgba(245, 158, 11, 0.2), 0 8px 24px -8px rgba(245, 158, 11, 0.15)',
				'green-soft': '0 2px 8px -2px rgba(34, 197, 94, 0.15), 0 4px 16px -6px rgba(34, 197, 94, 0.1)',
				'blue-soft': '0 2px 8px -2px rgba(59, 130, 246, 0.15), 0 4px 16px -6px rgba(59, 130, 246, 0.1)',
				'purple-soft': '0 2px 8px -2px rgba(147, 51, 234, 0.15), 0 4px 16px -6px rgba(147, 51, 234, 0.1)',
				'inner-subtle': 'inset 0 1px 3px rgba(0, 0, 0, 0.08)',
				'inner-medium': 'inset 0 2px 6px rgba(0, 0, 0, 0.12)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'shadow-pulse': {
					'0%, 100%': { boxShadow: '0 4px 12px -2px rgba(245, 158, 11, 0.2)' },
					'50%': { boxShadow: '0 8px 24px -4px rgba(245, 158, 11, 0.3)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'shadow-pulse': 'shadow-pulse 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
