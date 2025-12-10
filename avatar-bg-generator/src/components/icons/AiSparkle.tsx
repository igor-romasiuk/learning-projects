interface IconProps {
  className?: string
}

export function AiSparkleGradient({ className }: IconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_gradient)">
        <path
          d="M10.0326 10.4565L10.2683 11.6562L10.5041 10.4565C10.9396 8.2407 12.6415 6.50865 14.8188 6.0655L15.9976 5.82555L14.8188 5.58561C12.6415 5.14245 10.9396 3.41041 10.5041 1.19458L10.2683 -0.00514412L10.0326 1.19458C9.59712 3.41041 7.8952 5.14245 5.71792 5.58561L4.53906 5.82555L5.71792 6.0655C7.8952 6.50865 9.59712 8.2407 10.0326 10.4565Z"
          fill="url(#paint0_gradient)"
        />
        <path
          d="M5.17225 14.8969L5.30152 15.5547L5.43079 14.8969C5.66956 13.682 6.6027 12.7323 7.79651 12.4893L8.44288 12.3577L7.79651 12.2262C6.6027 11.9832 5.66956 11.0335 5.43079 9.81855L5.30152 9.16075L5.17225 9.81855C4.93348 11.0335 4.00032 11.9832 2.80652 12.2262L2.16016 12.3577L2.80652 12.4893C4.00032 12.7323 4.93348 13.682 5.17225 14.8969Z"
          fill="url(#paint1_gradient)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_gradient"
          x1="11.8581"
          y1="3.36918"
          x2="7.62241"
          y2="12.3359"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5BF0A5" />
          <stop offset="0.265" stopColor="#5BF0A5" />
          <stop offset="0.615" stopColor="#00BF5F" />
          <stop offset="1" stopColor="#009D4E" />
        </linearGradient>
        <linearGradient
          id="paint1_gradient"
          x1="6.17321"
          y1="11.0109"
          x2="3.85076"
          y2="15.9273"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5BF0A5" />
          <stop offset="0.265" stopColor="#5BF0A5" />
          <stop offset="0.615" stopColor="#00BF5F" />
          <stop offset="1" stopColor="#009D4E" />
        </linearGradient>
        <clipPath id="clip0_gradient">
          <rect
            width="18"
            height="18"
            rx="4.04082"
            transform="matrix(-1 0 0 1 18 0)"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export function AiSparkleSolid({ className }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.31947 5.60797L8.52296 4.59052L8.72645 5.60797C9.10227 7.48714 10.5712 8.95603 12.4503 9.33186L13.4678 9.53535L12.4503 9.73884C10.5712 10.1147 9.10227 11.5836 8.72645 13.4627L8.52296 14.4802L8.31947 13.4627C7.94364 11.5836 6.47475 10.1147 4.59557 9.73884L3.57812 9.53535L4.59557 9.33186C6.47475 8.95603 7.94364 7.48714 8.31947 5.60797Z"
        fill="#5BF0A5"
      />
      <path
        d="M4.37067 2.03465L4.47242 1.52592L4.57416 2.03465C4.76208 2.97422 5.49651 3.70867 6.43611 3.89659L6.94483 3.99834L6.43611 4.10008C5.49651 4.28798 4.76208 5.02243 4.57416 5.96203L4.47242 6.47075L4.37067 5.96203C4.18275 5.02243 3.4483 4.28798 2.50872 4.10008L2 3.99834L2.50872 3.89659C3.4483 3.70867 4.18275 2.97422 4.37067 2.03465Z"
        fill="#5BF0A5"
      />
      <path
        d="M12.2836 3.64598L12.3515 3.30683L12.4193 3.64598C12.5446 4.27238 13.0342 4.76199 13.6606 4.88727L13.9997 4.95512L13.6606 5.02294C13.0342 5.14822 12.5446 5.63784 12.4193 6.26423L12.3515 6.60339L12.2836 6.26423C12.1584 5.63784 11.6687 5.14822 11.0423 5.02294L10.7032 4.95512L11.0423 4.88727C11.6687 4.76199 12.1584 4.27238 12.2836 3.64598Z"
        fill="#5BF0A5"
      />
    </svg>
  )
}
