export interface Prato {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: 'entrada' | 'principal' | 'bebida' | 'sobremesa';
  imagem: string;
  vegetariano: boolean;
  picante: boolean;
  destaque: boolean;
  ingredientes: string[];
  tempoPreparo: number; // em minutos
  calorias?: number;
}

export interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
}

export interface ItemCarrinho {
  prato: Prato;
  quantidade: number;
}

export interface Reserva {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  data: Date;
  hora: string;
  numeroPessoas: number;
  observacoes?: string;
}

export interface Promocao {
  id: number;
  titulo: string;
  descricao: string;
  codigo: string;
  desconto: number; // porcentagem
  validoAte: Date;
}
