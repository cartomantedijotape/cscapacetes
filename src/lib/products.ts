import type { Product, Review, BrandInfo, BumpProduct } from "@/types/product";

export const products: Product[] = [
  // NORISK Soul II Grand Prix Series
  { id: "1", name: "NORISK Soul II Grand Prix South Africa", slug: "norisk-soul-ii-gp-sa", image: "/products/norisk-soul-ii-grand-prix-south-africa.jpg", price: "R$ 62,00", priceNumber: 62, oldPrice: "R$ 474,00", oldPriceNumber: 474, rating: "4.9", sold: "2.745", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "2", name: "NORISK Soul II Grand Prix Argentina", slug: "norisk-soul-ii-gp-ar", image: "/products/norisk-soul-ii-grand-prix-argentina.jpg", price: "R$ 62,00", priceNumber: 62, oldPrice: "R$ 474,00", oldPriceNumber: 474, rating: "4.9", sold: "12.847", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "3", name: "NORISK Soul II Grand Prix France", slug: "norisk-soul-ii-gp-fr", image: "/products/norisk-soul-ii-grand-prix-france.jpg", price: "R$ 62,00", priceNumber: 62, oldPrice: "R$ 474,00", oldPriceNumber: 474, rating: "4.9", sold: "5.312", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "4", name: "NORISK Soul II Grand Prix Japan", slug: "norisk-soul-ii-gp-jp", image: "/products/norisk-soul-ii-grand-prix-japan.jpg", price: "R$ 62,00", priceNumber: 62, oldPrice: "R$ 474,00", oldPriceNumber: 474, rating: "4.9", sold: "4.287", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "5", name: "NORISK Soul II Grand Prix Brazil", slug: "norisk-soul-ii-gp-br", image: "/products/norisk-soul-ii-grand-prix-brazil.jpg", price: "R$ 62,00", priceNumber: 62, oldPrice: "R$ 474,00", oldPriceNumber: 474, rating: "4.8", sold: "6.456", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "6", name: "NORISK Soul II Grand Prix United Kingdom", slug: "norisk-soul-ii-gp-uk", image: "/products/norisk-soul-ii-grand-prix-uk.jpg", price: "R$ 62,00", priceNumber: 62, oldPrice: "R$ 474,00", oldPriceNumber: 474, rating: "4.9", sold: "3.198", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "7", name: "NORISK Soul II Grand Prix USA", slug: "norisk-soul-ii-gp-usa", image: "/products/norisk-soul-ii-grand-prix-usa.jpg", price: "R$ 62,00", priceNumber: 62, oldPrice: "R$ 474,00", oldPriceNumber: 474, rating: "4.8", sold: "4.234", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60", "62"] },
  // NORISK Other Models
  { id: "8", name: "NORISK Soul II Manty Rosa Fosco", slug: "norisk-soul-ii-manty-rosa", image: "/products/norisk-soul-ii-manty-rosa-fosco.jpg", price: "R$ 62,00", priceNumber: 62, oldPrice: "R$ 474,00", oldPriceNumber: 474, rating: "4.9", sold: "3.567", brand: "NORISK", category: "capacete", sizes: ["54", "56", "58", "60"] },
  { id: "9", name: "NORISK Rock Monocolor Preto Fosco", slug: "norisk-rock-preto-fosco", image: "/products/norisk-rock-preto-fosco.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 284,00", oldPriceNumber: 284, rating: "4.8", sold: "5.234", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "10", name: "NORISK Rock Monocolor Branco", slug: "norisk-rock-branco", image: "/products/norisk-rock-branco.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 284,00", oldPriceNumber: 284, rating: "4.9", sold: "4.123", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "11", name: "NORISK Rock Nardo Cinza", slug: "norisk-rock-nardo-cinza", image: "/products/norisk-rock-nardo-cinza.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 284,00", oldPriceNumber: 284, rating: "4.8", sold: "3.876", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "12", name: "NORISK Razor Black Edition", slug: "norisk-razor-black-edition", image: "/products/norisk-razor-black-edition.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 284,00", oldPriceNumber: 284, rating: "4.9", sold: "6.789", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "13", name: "NORISK City Monocolor Preto Fosco", slug: "norisk-city-preto-fosco", image: "/products/norisk-city-preto-fosco.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 284,00", oldPriceNumber: 284, rating: "4.8", sold: "4.567", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60"] },
  { id: "14", name: "NORISK City Monocolor Branco", slug: "norisk-city-branco", image: "/products/norisk-city-branco.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 284,00", oldPriceNumber: 284, rating: "4.9", sold: "3.456", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60"] },
  { id: "15", name: "NORISK City Monocolor Cinza Fosco", slug: "norisk-city-cinza-fosco", image: "/products/norisk-city-cinza-fosco.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 284,00", oldPriceNumber: 284, rating: "4.8", sold: "3.187", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60"] },
  { id: "16", name: "NORISK Avenger Monocolor Preto Fosco", slug: "norisk-avenger-preto-fosco", image: "/products/norisk-avenger-preto-fosco.jpg", price: "R$ 124,00", priceNumber: 124, oldPrice: "R$ 949,00", oldPriceNumber: 949, rating: "4.9", sold: "4.234", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "17", name: "NORISK Avenger Monocolor Branco", slug: "norisk-avenger-branco", image: "/products/norisk-avenger-branco.jpg", price: "R$ 124,00", priceNumber: 124, oldPrice: "R$ 949,00", oldPriceNumber: 949, rating: "4.9", sold: "3.698", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "18", name: "NORISK Darth II Monocolor Preto Fosco", slug: "norisk-darth-ii-preto-fosco", image: "/products/norisk-darth-ii-preto-fosco.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 237,00", oldPriceNumber: 237, rating: "4.8", sold: "7.567", brand: "NORISK", category: "capacete", sizes: ["56", "58", "60"] },
  // LS2 Helmets
  { id: "19", name: "LS2 FF358 XDron Cyan", slug: "ls2-xdron-cyan", image: "/products/ls2-xdron-cyan.webp", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 399,00", oldPriceNumber: 399, rating: "4.9", sold: "3.456", brand: "LS2", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "20", name: "LS2 FF353 Rapid Athena Roxo", slug: "ls2-rapid-athena-roxo", image: "/products/ls2-rapid-athena-roxo.webp", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 324,00", oldPriceNumber: 324, rating: "4.9", sold: "2.978", brand: "LS2", category: "capacete", sizes: ["54", "56", "58", "60"] },
  { id: "21", name: "LS2 F810 Vingo Pink", slug: "ls2-f810-vingo-pink", image: "/products/ls2-f810-vingo-pink.webp", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 399,00", oldPriceNumber: 399, rating: "4.9", sold: "4.213", brand: "LS2", category: "capacete", sizes: ["54", "56", "58", "60"] },
  { id: "22", name: "LS2 FF358 Classic Draze Preto", slug: "ls2-classic-draze-preto", image: "/products/ls2-classic-draze-preto.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 379,00", oldPriceNumber: 379, rating: "4.8", sold: "8.956", brand: "LS2", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "23", name: "LS2 FF358 XDRON Cyborg", slug: "ls2-xdron-cyborg", image: "/products/ls2-xdron-cyborg.webp", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 399,00", oldPriceNumber: 399, rating: "4.8", sold: "3.734", brand: "LS2", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "24", name: "LS2 FF353 Rapid Monocolor Preto Fosco", slug: "ls2-rapid-preto-fosco", image: "/products/ls2-rapid-preto-fosco.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 324,00", oldPriceNumber: 324, rating: "4.8", sold: "6.287", brand: "LS2", category: "capacete", sizes: ["54", "56", "58", "60", "62"] },
  // AGV
  { id: "25", name: "AGV Blade Tab Italy Branco", slug: "agv-blade-tab-italy-branco", image: "/products/agv-blade-tab-italy-branco.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 557,00", oldPriceNumber: 557, rating: "4.9", sold: "3.456", brand: "AGV", category: "capacete", sizes: ["56", "58", "60", "62"] },
  { id: "26", name: "AGV Blade Zoo", slug: "agv-blade-zoo", image: "/products/agv-blade-zoo.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 559,00", oldPriceNumber: 559, rating: "4.8", sold: "2.943", brand: "AGV", category: "capacete", sizes: ["56", "58", "60"] },
  { id: "27", name: "AGV Blade Valentino Heart", slug: "agv-blade-valentino-heart", image: "/products/agv-blade-valentino-heart.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 561,00", oldPriceNumber: 561, rating: "4.9", sold: "3.689", brand: "AGV", category: "capacete", sizes: ["56", "58", "60", "62"] },
  // Jaquetas
  { id: "28", name: "Jaqueta NORISK Trip Air Feminina Rosa", slug: "jaqueta-norisk-trip-air-rosa", image: "/products/jaqueta-norisk-trip-air-feminina-rosa.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 332,00", oldPriceNumber: 332, rating: "4.9", sold: "2.856", brand: "NORISK", category: "jaqueta", sizes: ["P", "M", "G", "GG"] },
  { id: "29", name: "Jaqueta NORISK Tornado Feminina Branco", slug: "jaqueta-norisk-tornado-branco", image: "/products/jaqueta-norisk-tornado-feminina-branco.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 332,00", oldPriceNumber: 332, rating: "4.8", sold: "3.189", brand: "NORISK", category: "jaqueta", sizes: ["P", "M", "G", "GG"] },
  { id: "30", name: "Jaqueta NORISK Tornado Preto", slug: "jaqueta-norisk-tornado-preto", image: "/products/jaqueta-norisk-tornado-preto.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 332,00", oldPriceNumber: 332, rating: "4.8", sold: "4.534", brand: "NORISK", category: "jaqueta", sizes: ["P", "M", "G", "GG", "XGG"] },
  { id: "31", name: "Jaqueta NORISK Tornado Cinza", slug: "jaqueta-norisk-tornado-cinza", image: "/products/jaqueta-norisk-tornado-cinza.jpg", price: "R$ 58,00", priceNumber: 58, oldPrice: "R$ 332,00", oldPriceNumber: 332, rating: "4.8", sold: "3.178", brand: "NORISK", category: "jaqueta", sizes: ["P", "M", "G", "GG"] },
  // Acessórios
  { id: "32", name: "Intercomunicador Bluetooth V10 para Capacete", slug: "intercomunicador-bluetooth-v10", image: "/products/intercomunicador-bluetooth-v10.jpg", price: "R$ 29,00", priceNumber: 29, oldPrice: "R$ 44,00", oldPriceNumber: 44, rating: "4.9", sold: "8.523", brand: "Acessórios", category: "acessorio" },
  { id: "33", name: "Viseira NORISK FF302 Fotocromática Transition VMVision", slug: "viseira-norisk-ff302", image: "/products/viseira-norisk-ff302-fotocromatica.jpg", price: "R$ 33,00", priceNumber: 33, oldPrice: "R$ 144,00", oldPriceNumber: 144, rating: "4.8", sold: "5.347", brand: "Acessórios", category: "acessorio" },
  { id: "34", name: "Alpinestars T-SPS V2 WP Preto", slug: "alpinestars-t-sps-v2-wp-preto", image: "/products/alpinestars-t-sps-v2-wp-preto.jpg", price: "R$ 122,00", priceNumber: 122, oldPrice: "R$ 759,00", oldPriceNumber: 759, rating: "4.8", sold: "6.523", brand: "Alpinestars", category: "acessorio", sizes: ["39", "40", "41", "42", "43", "44"] },
];

export const reviews: Review[] = [
  { name: "Lucas Souza", text: "Chegou no prazo, capacete de qualidade!!", rating: 5 },
  { name: "Joel Lima", text: "De todos os capacetes que tive, esse é o melhor!", rating: 5 },
  { name: "Carlos Santos", text: "Comprei meio na dúvida, mas a qualidade surpreendeu", rating: 5 },
  { name: "Fernanda Oliveira", text: "Jaqueta top demais, material resistente e bonita! Superou minhas expectativas", rating: 5 },
  { name: "Patrícia Mendes", text: "Amei a jaqueta, chegou certinho e o tamanho ficou perfeito!", rating: 5 },
  { name: "Camila Souza", text: "Capacete LS2 muito top! Acabamento impecável, viseira cristalina e ventilação excelente. Melhor custo-benefício que já comprei!", rating: 5 },
  { name: "Rafael Mendes", text: "Produto excelente, chegou bem embalado e dentro do prazo!", rating: 5 },
];

export const brands: Record<string, BrandInfo> = {
  NORISK: {
    name: "Norisk Oficial",
    logo: "/images/norisk-logo.png",
    description: "Capacete Norisk. Características: Aqui na NORISK, não seguimos o óbvio, criamos nosso próprio caminho.",
  },
  LS2: {
    name: "LS2 Helmets Brasil",
    description: "Com sede na Espanha, a marca LS2 nasceu em 2007 com o claro propósito de se tornar líder de mercado mundial na indústria de capacetes para motociclistas. Distribuída em mais de 125 países, a LS2 cobre todas as necessidades dos amantes das duas rodas — capacetes, jaquetas, calças, luvas, botas e óculos de proteção. Seus 5 pilares são: Segurança, Qualidade, Inovação, Design e Paixão pela corrida.",
  },
  AGV: {
    name: "AGV Helmets Brasil",
    description: "Fundada em 1947 por Gino Amisano em Valenza, Itália, a AGV é sinônimo de excelência em capacetes para motociclistas. Com mais de 75 anos de história, a marca é referência mundial em segurança, tecnologia e design.",
  },
  Alpinestars: {
    name: "Alpinestars Brasil",
    description: "Fundada em 1963 por Sante Mazzarolo no norte da Itália, a Alpinestars é líder mundial em equipamentos de proteção para motociclismo e automobilismo.",
  },
  "Acessórios": {
    name: "CS Acessórios Moto",
    logo: "/images/acessorios-logo.png",
    description: "Acessórios essenciais para o motociclista que busca praticidade, segurança e conforto.",
  },
};

export const bumpProducts: BumpProduct[] = [
  { name: "Viseira Norisk", image: "/images/bump-viseira.webp", price: 19, slug: "viseira-norisk" },
  { name: "Narigueira Alta Grande Ajuste Universal Capacete Norisk", image: "/images/bump-narigueira.webp", price: 12, slug: "narigueira" },
  { name: "Fone de capacete bluetooth com controle de voz HD stereo - À prova d'água", image: "/images/bump-fone.jpg", price: 15, slug: "fone-bluetooth" },
];

export const navCategories = [
  { label: "Capacetes", href: "/#capacetes" },
  { label: "Jaquetas", href: "/#jaquetas" },
  { label: "Promoções", href: "/#promocoes" },
  { label: "Sobre a loja", href: "/#sobre" },
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((p) => p.brand === brand);
}

export function getDiscountPercentage(product: Product): number {
  return Math.round(((product.oldPriceNumber - product.priceNumber) / product.oldPriceNumber) * 100);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, limit);
}

export function formatPrice(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}
