export interface Produtomodel {
  idproduto: number;
  nomeProduto: string;
  descProduto: string;
  precoProduto: number;
  categoriaProduto: string;
  tipo: string;
  estoqueProduto: boolean;
  dataCadastro: string;
  quantidade: number;
  imagemProduto: string;
  tamanhosDisponiveis?: string[];
  total: number;
  valorPromocional: number;
}
