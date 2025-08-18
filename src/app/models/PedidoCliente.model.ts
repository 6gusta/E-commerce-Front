export interface PedidoCliente{

     nomeProduto: string;
  categoriaProduto: string;
  precoUnitario: number;
  quantidade: number;
  descricaoProduto: string;
  tamanhosDisponiveis: string[];
  tipoPagamento: string;

  nomeCliente: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;

}