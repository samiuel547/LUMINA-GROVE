export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Natural Titanium",
    price: "From $1,200",
    category: "Titanium Series",
    image: "https://picsum.photos/seed/titanium1/600/800"
  },
  {
    id: 2,
    name: "Blue Titanium",
    price: "From $1,200",
    category: "Titanium Series",
    image: "https://picsum.photos/seed/titanium2/600/800"
  },
  {
    id: 3,
    name: "White Titanium",
    price: "From $1,200",
    category: "Titanium Series",
    image: "https://picsum.photos/seed/titanium3/600/800"
  },
  {
    id: 4,
    name: "Black Titanium",
    price: "From $1,200",
    category: "Titanium Series",
    image: "https://picsum.photos/seed/titanium4/600/800"
  },
  {
    id: 5,
    name: "Titanium Pro",
    price: "From $1,450",
    category: "Pro Series",
    image: "https://picsum.photos/seed/titanium5/600/800"
  },
  {
    id: 6,
    name: "Titanium Ultra",
    price: "From $1,999",
    category: "Ultra Series",
    image: "https://picsum.photos/seed/titanium6/600/800"
  }
];
