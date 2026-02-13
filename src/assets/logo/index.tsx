interface Props extends React.ComponentProps<'svg'> {
    variant?: 'default' | 'icon';
}

export const Logo: React.FC<Props> = ({ variant = 'default' }) => {
    if (variant === 'default') {
        return null;
    }

    if (variant === 'icon') {
        return (
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1202_5208)">
                    <rect width="48" height="48" rx="12" fill="#2E90FA" />
                    <g filter="url(#filter0_d_1202_5208)">
                        <circle cx="28.875" cy="23.625" r="10.875" fill="url(#paint0_linear_1202_5208)" />
                        <path opacity="0.5" d="M19.2897 18.4836C18.4184 18.1706 17.4791 18 16.5 18C11.9437 18 8.25 21.6937 8.25 26.25C8.25 30.8064 11.9437 34.5 16.5 34.5H28.875C22.8689 34.5 18 29.6311 18 23.625C18 21.7652 18.4668 20.0145 19.2897 18.4836Z" fill="url(#paint1_linear_1202_5208)" />
                    </g>
                </g>
                <defs>
                    <filter id="filter0_d_1202_5208" x="5.25" y="5.25" width="37.5" height="42" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feMorphology radius="1.5" operator="erode" in="SourceAlpha" result="effect1_dropShadow_1202_5208" />
                        <feOffset dy="2.25" />
                        <feGaussianBlur stdDeviation="2.25" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1202_5208" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1202_5208" result="shape" />
                    </filter>
                    <linearGradient id="paint0_linear_1202_5208" x1="28.875" y1="12.75" x2="28.875" y2="34.5" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" stop-opacity="0.8" />
                        <stop offset="1" stop-color="white" stop-opacity="0.5" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_1202_5208" x1="18.5625" y1="18" x2="18.5625" y2="34.5" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" stop-opacity="0.8" />
                        <stop offset="1" stop-color="white" stop-opacity="0.5" />
                    </linearGradient>
                    <clipPath id="clip0_1202_5208">
                        <rect width="48" height="48" rx="12" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        );
    }
};