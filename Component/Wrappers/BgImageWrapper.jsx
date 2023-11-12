import Image from 'next/image';
import bgImage from '../../public/images/bgimage2_cp.jpg'
const myLoader = ({ src }) => {
    return `${src}`
  }
export default function BgImageWrapper() {
    return (<>
        <Image
            loader={myLoader}
            src={bgImage}
            unoptimized
            alt="baground image"
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            quality={75}
            priority="true"
            blurDataURL={'data:image/webp;base64,...'}
            placeholder="blur"
            style={{
                objectFit: 'cover', // cover, contain, none
                opacity: "0.9"
            }}
        />
        {/* {children} */}
    </>)
}