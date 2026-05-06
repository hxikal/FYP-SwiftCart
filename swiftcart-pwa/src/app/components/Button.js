import { jsx as _jsx } from "react/jsx-runtime";
export function Button({ variant = 'primary', fullWidth = false, className = '', children, ...props }) {
    const baseStyles = 'px-6 py-3 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';
    const variantStyles = {
        primary: 'bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(37,99,235,0.22)] hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'text-foreground hover:bg-muted',
    };
    const widthStyle = fullWidth ? 'w-full' : '';
    return (_jsx("button", { className: `${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`, ...props, children: children }));
}
