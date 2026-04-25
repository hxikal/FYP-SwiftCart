import { jsx as _jsx } from "react/jsx-runtime";
export function Button({ variant = 'primary', fullWidth = false, className = '', children, ...props }) {
    const baseStyles = 'px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const variantStyles = {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-muted text-foreground hover:bg-muted/80',
        ghost: 'text-foreground hover:bg-muted',
    };
    const widthStyle = fullWidth ? 'w-full' : '';
    return (_jsx("button", { className: `${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`, ...props, children: children }));
}
