import Image from "next/image"

interface AppIconProps {
  src: string
  alt: string
  backgroundColor: string
}

export function AppIcon({ src, alt, backgroundColor }: AppIconProps) {
  return (
    <figure style={{ backgroundColor }} className="p-6">
      <Image src={src} alt={alt} width={64} height={64} className="transition group-hover:scale-110" />
    </figure>
  )
}
