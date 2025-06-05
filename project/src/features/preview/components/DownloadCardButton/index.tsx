import { Button } from '@/features/common/components/ui/button'

interface ComponentProps {
  onClick?: () => void
}

export default function DownloadCardButton({ onClick }: ComponentProps) {
  return (
    <Button
      type="button"
      className="w-full h-auto flex items-center justify-center gap-2 py-1.5 px-4 border-2 border-black rounded text-black bg-transparent cursor-pointer hover:opacity-50 hover:bg-transparent"
      onClick={onClick}
    >
      <span className="text-xl">標本を画像保存する</span>
      <span className="size-6 shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="19"
          viewBox="0 0 23 19"
          fill="none"
          className="size-6"
        >
          <g clipPath="url(#clip0_315_1096)">
            <path
              d="M10.701 11.8441C10.8447 12.0339 11.0384 12.138 11.2462 12.138C11.454 12.138 11.6477 12.0335 11.7914 11.8441L15.7271 6.65637C15.8743 6.46264 15.9147 6.27461 15.8418 6.12745C15.7684 5.98028 15.5944 5.89901 15.3511 5.89901H13.8438C13.4357 5.89901 13.104 5.56733 13.104 5.15921V0.879931C13.104 0.394936 12.7095 0 12.2245 0H10.2674C9.78241 0 9.38792 0.394936 9.38792 0.879931V5.15965C9.38792 5.56777 9.0558 5.89945 8.64812 5.89945H7.14086C6.89749 5.89945 6.72352 5.98072 6.65016 6.12788C6.57723 6.27505 6.61765 6.46308 6.76482 6.65725L10.7006 11.845L10.701 11.8441Z"
              fill="currentColor"
            />
            <path
              d="M19.5588 11.1764V16.0659H2.93369V11.1764H0V17.8824C0 18.4988 0.501249 19 1.1176 19H21.3749C21.9912 19 22.4925 18.4988 22.4925 17.8824V11.1764H19.5588Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_315_1096">
              <rect width="22.4925" height="19" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>
    </Button>
  )
}
