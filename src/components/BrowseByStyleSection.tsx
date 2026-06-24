import Image from "next/image"
import Link from "next/link"

export default function BrowseByStyleSection() {
  const styles = [
    {
      title: "Casual",
      href: "/shop?style=casual",
      image: "/assets/casual.png",
      className: "lg:col-span-1",
    },
    {
      title: "Formal",
      href: "/shop?style=formal",
      image: "/assets/formal.png",
      className: "lg:col-span-2",
    },
    {
      title: "Party",
      href: "/shop?style=party",
      image: "/assets/party.png",
      className: "lg:col-span-2",
    },
    {
      title: "Gym",
      href: "/shop?style=gym",
      image: "/assets/gym.png",
      className: "lg:col-span-1",
    },
  ]

  return (
    <section className="px-4 py-8 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl rounded-[40px] bg-[#F0F0F0] px-6 py-10 sm:px-16 sm:py-16">
        <h2 className="mb-10 text-center text-3xl font-extrabold font-integralcf sm:mb-16 sm:text-5xl">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {styles.map((style) => (
            <Link
              key={style.title}
              href={style.href}
              className={`group relative h-[190px] sm:h-[289px] overflow-hidden rounded-3xl bg-white transition-all duration-300 hover:scale-[1.01] ${style.className}`}
            >
              <div className="absolute left-6 top-6 z-10 sm:left-9 sm:top-7">
                <span className="text-2xl font-bold font-satoshi sm:text-4xl text-black">
                  {style.title}
                </span>
              </div>
              {style.image && (
                <div className="relative h-full w-full overflow-hidden">
                   <Image
                    src={style.image}
                    alt={style.title}
                    fill
                    className="object-cover object-right-top transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
