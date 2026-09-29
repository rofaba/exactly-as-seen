import type { SiteImage } from "@/data/images";

export function Img({
  image,
  className,
  priority = false,
  sizes,
}: {
  image: SiteImage;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <img
      src={image.url}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      className={className}
    />
  );
}
