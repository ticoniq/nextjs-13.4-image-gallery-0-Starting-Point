import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Dynamic Fetching - Next js image Gallery',
}

export const revalidate = 0;

export default async function Page() {
  const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_aCCESS_KEY, {
    // cache: "no-cache",
    // next: {
    //   revalidate: 0
    // }
  });
  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width)
  const height = (width / image.width) * image.height

  return(
    <div className="d-flex flex-column align-items-center">
      <Image 
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded shadow mv-100 h-100"
      />
      by <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
  )
}