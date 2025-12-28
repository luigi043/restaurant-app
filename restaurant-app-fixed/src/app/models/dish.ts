// Modelo para pratos do menu
export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'entrada' | 'principal' | 'sobremesa' | 'bebida';
  image: string;
  isVegetarian: boolean;
  isSpicy: boolean;
  ingredients: string[];
  calories?: number;
  preparationTime?: number;
}

// Modelo para itens no carrinho
export interface CartItem {
  dish: Dish;
  quantity: number;
  notes?: string;
}
