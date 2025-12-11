import React from 'react';

const IconWrapper = ({ children, className }) => (
    <div className={`relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-50 to-white shadow-inner border border-white/50 ${className}`}>
        <div className="absolute inset-0 bg-primary-100/20 blur-xl rounded-full" />
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 relative z-10"
        >
            {children}
        </svg>
    </div>
);

export const MultiPlatformIcon = () => (
    <IconWrapper>
        <defs>
            <linearGradient id="mp-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
        <path
            d="M7 2H17C18.1046 2 19 2.89543 19 4V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V4C5 2.89543 5.89543 2 7 2Z"
            stroke="url(#mp-grad)"
            strokeWidth="1.5"
            fill="url(#mp-grad)"
            fillOpacity="0.1"
        />
        <path
            d="M12 18H12.01"
            stroke="url(#mp-grad)"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <rect x="8" y="5" width="8" height="10" rx="1" stroke="url(#mp-grad)" strokeWidth="1.5" strokeOpacity="0.5" />
        <path d="M21 8L23 8M21 12L23 12M21 16L23 16" stroke="url(#mp-grad)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M1 8L3 8M1 12L3 12M1 16L3 16" stroke="url(#mp-grad)" strokeWidth="1.5" strokeLinecap="round" />
    </IconWrapper>
);

export const PipelineIcon = () => (
    <IconWrapper>
        <defs>
            <linearGradient id="pipe-grad" x1="24" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
        </defs>
        <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="url(#pipe-grad)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeOpacity="0.3"
        />
        <path
            d="M12 6V18M6 12H18"
            stroke="url(#pipe-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.2"
        />
        <path
            d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
            stroke="url(#pipe-grad)"
            strokeWidth="1.5"
            fill="url(#pipe-grad)"
            fillOpacity="0.1"
        />
        <path
            d="M12 7V5M12 19V17M17 12H19M7 12H5"
            stroke="url(#pipe-grad)"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path d="M15.5355 8.46447L16.9497 7.05025M7.05025 16.9497L8.46447 15.5355" stroke="url(#pipe-grad)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8.46447 8.46447L7.05025 7.05025M16.9497 16.9497L15.5355 15.5355" stroke="url(#pipe-grad)" strokeWidth="1.5" strokeLinecap="round" />
    </IconWrapper>
);

export const IntegrationIcon = () => (
    <IconWrapper>
        <defs>
            <linearGradient id="int-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="4" fill="url(#int-grad)" fillOpacity="0.2" stroke="url(#int-grad)" strokeWidth="1.5" />
        <path d="M12 8V4M12 20V16M8 12H4M20 12H16" stroke="url(#int-grad)" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="10" y="2" width="4" height="4" rx="1" fill="white" stroke="url(#int-grad)" strokeWidth="1.5" />
        <rect x="10" y="18" width="4" height="4" rx="1" fill="white" stroke="url(#int-grad)" strokeWidth="1.5" />
        <rect x="2" y="10" width="4" height="4" rx="1" fill="white" stroke="url(#int-grad)" strokeWidth="1.5" />
        <rect x="18" y="10" width="4" height="4" rx="1" fill="white" stroke="url(#int-grad)" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="1.5" fill="url(#int-grad)" />
    </IconWrapper>
);

export const ScaleIcon = () => (
    <IconWrapper>
        <defs>
            <linearGradient id="scale-grad" x1="0" y1="24" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
        </defs>
        <path
            d="M3 20H21"
            stroke="url(#scale-grad)"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <rect x="5" y="12" width="3" height="6" rx="1" fill="url(#scale-grad)" fillOpacity="0.1" stroke="url(#scale-grad)" strokeWidth="1.5" />
        <rect x="10.5" y="8" width="3" height="10" rx="1" fill="url(#scale-grad)" fillOpacity="0.1" stroke="url(#scale-grad)" strokeWidth="1.5" />
        <rect x="16" y="4" width="3" height="14" rx="1" fill="url(#scale-grad)" fillOpacity="0.1" stroke="url(#scale-grad)" strokeWidth="1.5" />
        <path
            d="M5 10L10.5 6L16 2"
            stroke="url(#scale-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2 2"
        />
        <path d="M19 2L21 4M19 2L17 4" stroke="url(#scale-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
);

export const AiMatchingIcon = () => (
    <IconWrapper className="w-24 h-24 rounded-3xl !bg-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-transparent rounded-2xl opacity-50" />
        <defs>
            <linearGradient id="ai-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 relative z-10">
            <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                stroke="url(#ai-grad)"
                strokeWidth="1.5"
                strokeOpacity="0.2"
            />
            <path
                d="M9 9C9 9 10.5 11 12 11C13.5 11 15 9 15 9"
                stroke="url(#ai-grad)"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M12 11V15"
                stroke="url(#ai-grad)"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="3" stroke="url(#ai-grad)" strokeWidth="1.5" strokeOpacity="0.5" />
            <path d="M7 12H5M19 12H17M12 5V7M12 17V19" stroke="url(#ai-grad)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="12" r="8" stroke="url(#ai-grad)" strokeWidth="1.5" strokeDasharray="2 2" />

            {/* Brain-like connections */}
            <circle cx="9" cy="9" r="1.5" fill="url(#ai-grad)" />
            <circle cx="15" cy="9" r="1.5" fill="url(#ai-grad)" />
            <circle cx="9" cy="15" r="1.5" fill="url(#ai-grad)" />
            <circle cx="15" cy="15" r="1.5" fill="url(#ai-grad)" />
        </svg>
    </IconWrapper>
);
