import Link from "next/link";
import { ShieldCheck, Truck, Store } from "lucide-react";

export function Footer() {
  return (
    <footer id="sobre" className="bg-cs-footer-bg text-cs-footer-fg">
      {/* Trust badges */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-cs-green shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">Compra Segura</p>
              <p className="text-xs text-cs-footer-fg/70">Seus dados protegidos em todas as etapas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="h-8 w-8 text-cs-green shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">Prazo de entrega</p>
              <p className="text-xs text-cs-footer-fg/70">Entregamos em todo o Brasil</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Store className="h-8 w-8 text-cs-green shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">Sobre a loja</p>
              <p className="text-xs text-cs-footer-fg/70">Planeta Atacados — Capacetes e acessórios para motociclistas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Comprar</h4>
          <ul className="space-y-2">
            <li><Link href="/#capacetes" className="text-xs hover:text-white transition-colors">Capacetes</Link></li>
            <li><Link href="/#jaquetas" className="text-xs hover:text-white transition-colors">Jaquetas</Link></li>
            <li><Link href="/#acessorios" className="text-xs hover:text-white transition-colors">Acessórios</Link></li>
            <li><Link href="/#promocoes" className="text-xs hover:text-white transition-colors">Promoções</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Atendimento</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="text-xs hover:text-white transition-colors">Trocas e devoluções</Link></li>
            <li><Link href="#" className="text-xs hover:text-white transition-colors">Política de privacidade</Link></li>
            <li><Link href="#" className="text-xs hover:text-white transition-colors">Termos de uso</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Sobre a loja</h4>
          <p className="text-xs leading-relaxed">
            Planeta Atacados é sua loja online de capacetes e acessórios para motociclistas. Trabalhamos com as melhores marcas do mercado como NORISK, LS2, AGV e Alpinestars.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-cs-footer-fg/50">
            © 2025 Planeta Atacados. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
