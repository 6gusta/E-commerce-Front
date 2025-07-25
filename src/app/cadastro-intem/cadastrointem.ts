import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProdutoService } from '../services/produtoservice';
import { Produtomodel } from '../models/produto.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-intem',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './cadastrointem.html',
  styleUrls: ['./cadastrointem.css']
})
export class ProdutoCadastroComponent implements OnInit {
  categorias = ['NOVIDADES', 'PROMOCOES', 'MAISPEDIDOS'];
  tamanhos = ['S', 'M', 'L', 'XL'];
  tipos = [
    'CAMISA', 'CALCA', 'CONJUNTO', 'VESTIDO', 'SAIA', 'BERMUDA', 'BLUSA',
    'JAQUETA', 'CASACO', 'MOLETOM', 'SAPATO', 'TENIS', 'SANDALIA', 'BOTA',
    'BOLSA', 'MOCHILA', 'ACESSORIO', 'OCULOS', 'RELOGIO', 'MEIA', 'LINGERIE',
    'PIJAMA', 'CHAPEU', 'CUECA', 'GRAVATA'
  ];

  produtoForm: FormGroup;
  imagemPreview: string | ArrayBuffer | null = null;
  estaEditando = false;
  carregando = false; // para controle de loading (ex: botão desabilitado)

  constructor(private fb: FormBuilder, private produtoService: ProdutoService) {
    this.produtoForm = this.fb.group({
      idproduto: [null],
      nomeProduto: ['', Validators.required],
      descProduto: ['', Validators.required],
      precoProduto: [null, [Validators.required, Validators.min(0)]],
      categoriaProduto: ['', Validators.required],
      tipo: ['', Validators.required],
      estoqueProduto: [false],
      dataCadastro: ['', Validators.required],
      quantidade: [null, [Validators.required, Validators.min(0)]],
      imagemProduto: [null, Validators.required],
      tamanhosDisponiveis: this.fb.array([]),
      valorPromocional: [null]
    });

    // Validação dinâmica do campo valorPromocional
    this.produtoForm.get('categoriaProduto')?.valueChanges.subscribe(categoria => {
      const promoControl = this.produtoForm.get('valorPromocional');
      if (categoria === 'PROMOCOES') {
        promoControl?.setValidators([Validators.required, Validators.min(0)]);
      } else {
        promoControl?.clearValidators();
        promoControl?.setValue(null);
      }
      promoControl?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    const state = history.state;
    if (state && state.produto) {
      this.carregarProdutoParaEdicao(state.produto);
    }
  }

  get tamanhosDisponiveis(): FormArray {
    return this.produtoForm.get('tamanhosDisponiveis') as FormArray;
  }

  onTamanhoChange(event: any) {
    const value = event.target.value;
    const formArray = this.tamanhosDisponiveis;

    if (event.target.checked) {
      formArray.push(this.fb.control(value));
    } else {
      const index = formArray.controls.findIndex(x => x.value === value);
      if (index >= 0) formArray.removeAt(index);
    }
  }

  onImagemChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 600;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height && width > MAX_WIDTH) {
            height = height * (MAX_WIDTH / width);
            width = MAX_WIDTH;
          } else if (height > MAX_HEIGHT) {
            width = width * (MAX_HEIGHT / height);
            height = MAX_HEIGHT;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const resizedBase64 = canvas.toDataURL('image/webp');
            this.imagemPreview = resizedBase64;
            this.produtoForm.patchValue({ imagemProduto: resizedBase64 });
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  carregarProdutoParaEdicao(produto: any) {
    this.estaEditando = true;

    // Limpar tamanhos antigos
    while (this.tamanhosDisponiveis.length !== 0) {
      this.tamanhosDisponiveis.removeAt(0);
    }

    if (produto.tamanhosDisponiveis) {
      produto.tamanhosDisponiveis.forEach((tamanho: string) => {
        this.tamanhosDisponiveis.push(this.fb.control(tamanho));
      });
    }

    this.produtoForm.patchValue({
      idproduto: produto.idproduto,
      nomeProduto: produto.nomeProduto,
      descProduto: produto.descProduto,
      precoProduto: produto.precoProduto,
      categoriaProduto: produto.categoriaProduto,
      tipo: produto.tipo,
      valorPromocional: produto.valorPromocional,
      estoqueProduto: produto.estoqueProduto,
      dataCadastro: produto.dataCadastro,
      quantidade: produto.quantidade,
      imagemProduto: produto.imagemProduto
    });

    this.imagemPreview = produto.imagemProduto;
  }

  cancelarEdicao() {
    this.estaEditando = false;
    this.produtoForm.reset();
    this.imagemPreview = null;

    // Limpar tamanhos também ao cancelar
    while (this.tamanhosDisponiveis.length !== 0) {
      this.tamanhosDisponiveis.removeAt(0);
    }
  }

  onSubmit() {
    if (this.produtoForm.invalid) {
      this.produtoForm.markAllAsTouched();
      alert('⚠️ Preencha todos os campos obrigatórios!');
      return;
    }

    this.carregando = true;

    const produto: Produtomodel = this.produtoForm.value;

    if (this.estaEditando) {
      this.produtoService.atualizarProduto(produto.idproduto, produto).subscribe({
        next: () => {
          alert('✅ Produto atualizado com sucesso!');
          this.cancelarEdicao();
          this.carregando = false;
        },
        error: (err) => {
          console.error('Erro ao atualizar produto:', err);
          alert('❌ Erro ao atualizar produto.');
          this.carregando = false;
        }
      });
    } else {
      this.produtoService.cadastrarProduto(produto).subscribe({
        next: () => {
          alert('✅ Produto cadastrado com sucesso!');
          this.produtoForm.reset();
          this.imagemPreview = null;
          this.carregando = false;
        },
        error: (err) => {
          console.error('Erro ao cadastrar produto:', err);
          alert('❌ Erro ao cadastrar produto.');
          this.carregando = false;
        }
      });
    }
  }
}
