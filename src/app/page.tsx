import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Logo from '@/components/Logo'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <header className="bg-light-bg py-6 shadow-md">
        <div className="container mx-auto flex flex-col items-center">
          <div className="flex items-center mb-4">
            <Logo className="mr-4" />
            <h1 className="text-6xl font-bold">
              <span className="text-secondary">Peke</span>
              <span className="text-primary"> Clothes</span>
            </h1>
          </div>
          <nav className="mt-2">
            <ul className="flex space-x-6">
              <li><Link href="/products/babies" className="hover:underline text-primary font-medium">Bebés</Link></li>
              <li><Link href="/products/toddlers" className="hover:underline text-primary font-medium">Niños Pequeños</Link></li>
              <li><Link href="/products/kids" className="hover:underline text-primary font-medium">Niños Grandes</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4">
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
            { title: "Bebés (0-2 años)", href: "/products/babies" },
            { title: "Niños Pequeños (2-5 años)", href: "/products/toddlers" },
            { title: "Niños Grandes (6-14 años)", href: "/products/kids" },
          ].map((category, index) => (
            <Card key={index} className="bg-white border-primary shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-primary">{category.title}</h2>
                <div className="w-[300px] h-[200px] bg-light-bg flex items-center justify-center text-primary font-bold text-lg rounded-md mb-4">
                  {category.title}
                </div>
                <Button asChild className="w-full bg-primary hover:bg-hover text-white">
                  <Link href={category.href}>Comprar Ahora</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="bg-[#E6F3FF] p-8 rounded-lg mb-12 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-[#FF9FD5]">¿Por qué elegir Peke Clothes?</h2>
          <ul className="list-disc list-inside space-y-2 text-[#4A4A4A]">
            <li>Ropa importada de USA</li>
            <li>Telas de alta calidad y comodidad</li>
            <li>Diseños adorables para todas las edades</li>
            <li>Precios accesibles para familias en crecimiento</li>
            <li>Devoluciones y cambios fáciles</li>
          </ul>
        </section>

        <section className="text-center mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-[#FF9FD5]">Únete a Nuestro Boletín</h2>
          <p className="mb-4 text-[#4A4A4A]">¡Mantente actualizado con nuestras últimas colecciones y ofertas exclusivas!</p>
          <form className="flex flex-col sm:flex-row justify-center gap-2">
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              className="border rounded-md px-4 py-2 w-full sm:w-auto text-[#4A4A4A]"
              aria-label="Correo electrónico para boletín"
            />
            <Button type="submit" className="bg-[#FF9FD5] hover:bg-[#FF7777] text-white">Suscribirse</Button>
          </form>
        </section>
      </main>

      <footer className="bg-light-bg text-text py-8 mt-12">
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