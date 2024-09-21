import Link from 'next/link'

export function Footer() {
    return (
        <footer className="bg-light-bg text-text py-8 mt-12">
            <div className="container mx-auto text-center">
                <p className="mb-4">&copy; 2023 Peke Clothes. Todos los derechos reservados.</p>
                <nav>
                    <ul className="flex justify-center space-x-4">
                        <li><Link href="/about" className="hover:underline text-primary">Sobre Nosotros</Link></li>
                        <li><Link href="/contact" className="hover:underline text-primary">Contacto</Link></li>
                        <li><Link href="/faq" className="hover:underline text-primary">Preguntas Frecuentes</Link></li>
                        <li><Link href="/returns-policy" className="hover:underline text-primary">Política de Devoluciones</Link></li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}