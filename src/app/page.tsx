import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Logo from '@/components/Logo'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FFFAF0] text-[#4A4A4A]">
      <header className="bg-[#E6F3FF] py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/bebes" className="hover:underline text-[#FF9999] font-medium">Bebés</Link></li>
              <li><Link href="/ninos-pequenos" className="hover:underline text-[#FF9999] font-medium">Niños Pequeños</Link></li>
              <li><Link href="/ninos" className="hover:underline text-[#FF9999] font-medium">Niños Grandes</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#FF9999]">Bienvenidos a Peke Clothes</h1>
          <p className="text-xl text-[#4A4A4A]">¡Ropa adorable y cómoda para tus pequeños, desde recién nacidos hasta adolescentes!</p>
        </section>

        <Carousel className="mb-12">
          <CarouselContent>
            {[
              { src: "/peke-logo.png?height=250&width=600&text=Colección+de+Bebés", alt: "Colección de ropa para bebés" },
              { src: "/peke-logo.png?height=250&width=600&text=Colección+de+Niños+Pequeños", alt: "Colección de ropa para niños pequeños" },
              { src: "/peke-logo.png?height=250&width=600&text=Colección+de+Niños", alt: "Colección de ropa para niños grandes" },
            ].map((img, index) => (
              <CarouselItem key={index}>
                <Image src={img.src} alt={img.alt} width={800} height={400} className="rounded-lg shadow-md" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <section className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { title: "Bebés (0-2 años)", href: "/bebes" },
            { title: "Niños Pequeños (2-5 años)", href: "/ninos-pequenos" },
            { title: "Niños Grandes (6-14 años)", href: "/ninos-grandes" },
          ].map((category, index) => (
            <Card key={index} className="bg-white border-[#FF9999] shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-[#FF9999]">{category.title}</h2>
                <div className="w-[300px] h-[200px] bg-[#E6F3FF] flex items-center justify-center text-[#FF9999] font-bold text-lg rounded-md mb-4">
                  {category.title}
                </div>
                <Button asChild className="w-full bg-[#FF9999] hover:bg-[#FF7777] text-white">
                  <Link href={category.href}>Comprar Ahora</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="bg-[#E6F3FF] p-8 rounded-lg mb-12 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-[#FF9999]">¿Por qué elegir Peke Clothes?</h2>
          <ul className="list-disc list-inside space-y-2 text-[#4A4A4A]">
            <li>Ropa importada de USA</li>
            <li>Telas de alta calidad y comodidad</li>
            <li>Diseños adorables para todas las edades</li>
            <li>Precios accesibles para familias en crecimiento</li>
            <li>Devoluciones y cambios fáciles</li>
          </ul>
        </section>

        <section className="text-center mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-[#FF9999]">Únete a Nuestro Boletín</h2>
          <p className="mb-4 text-[#4A4A4A]">¡Mantente actualizado con nuestras últimas colecciones y ofertas exclusivas!</p>
          <form className="flex flex-col sm:flex-row justify-center gap-2">
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              className="border rounded-md px-4 py-2 w-full sm:w-auto text-[#4A4A4A]"
              aria-label="Correo electrónico para boletín"
            />
            <Button type="submit" className="bg-[#FF9999] hover:bg-[#FF7777] text-white">Suscribirse</Button>
          </form>
        </section>
      </main>

      <footer className="bg-[#E6F3FF] text-[#4A4A4A] py-8 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Peke Clothes. Todos los derechos reservados.</p>
          <nav className="mt-4">
            <ul className="flex justify-center space-x-4">
              <li><Link href="/sobre-nosotros" className="hover:underline">Sobre Nosotros</Link></li>
              <li><Link href="/contacto" className="hover:underline">Contacto</Link></li>
              <li><Link href="/preguntas-frecuentes" className="hover:underline">Preguntas Frecuentes</Link></li>
              <li><Link href="/politica-de-devoluciones" className="hover:underline">Política de Devoluciones</Link></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  )
}