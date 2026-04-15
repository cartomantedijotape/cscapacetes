export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: string;
  priceNumber: number;
  oldPrice: string;
  oldPriceNumber: number;
  rating: string;
  sold: string;
  brand: "NORISK" | "LS2" | "AGV" | "Alpinestars" | "Acessórios";
  category: "capacete" | "jaqueta" | "acessorio";
  sizes?: string[];
  badge?: string;
}

export interface Review {
  name: string;
  text: string;
  rating: number;
}

export interface BrandInfo {
  name: string;
  logo?: string;
  description: string;
}

export interface BumpProduct {
  name: string;
  image: string;
  price: number;
  slug: string;
}
