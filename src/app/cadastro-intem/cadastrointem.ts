import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService, Produto } from '../services/produtoservice'; // ajuste o path conforme seu projeto
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-intem',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './cadastrointem.html',
  styleUrls: ['./cadastrointem.css']
})
export class ProdutoCadastroComponent {
  categorias = ['NOVIDADES', 'PROMOCOES', 'MAISPEDIDOS'];
  produtoForm: FormGroup;
  imagemPreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private produtoService: ProdutoService) {
    this.produtoForm = this.fb.group({
      nomeProduto: ['', Validators.required],
      descProduto: ['', Validators.required],
      precoProduto: [null, [Validators.required, Validators.min(0)]],
      categoriaProduto: ['', Validators.required],
      estoqueProduto: [false],
      dataCadastro: ['', Validators.required],
      imagemProduto: [null, Validators.required]
    });
  }

  onImagemChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result;
        this.produtoForm.patchValue({ imagemProduto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.produtoForm.valid) {
      const produto: Produto = this.produtoForm.value;

      this.produtoService.cadastrarProduto(produto).subscribe({
        next: (res) => {
          alert('✅ Produto cadastrado com sucesso!');
          this.produtoForm.reset();
          this.imagemPreview = null;
        },
        error: (err) => {
          console.error('Erro ao cadastrar:', err);
          alert('❌ Ocorreu um erro ao cadastrar o produto.');
        }
      });
    } else {
      alert('⚠️ Preencha todos os campos obrigatórios!');
    }
  }
}
