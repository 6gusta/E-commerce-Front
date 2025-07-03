import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  tamanhos = ['S', 'M', 'L', 'XL'];
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
  quantidade: [null, [Validators.required, Validators.min(0)]],


      imagemProduto: [null, Validators.required],
      tamanhosDisponiveis: this.fb.array([]) // ← adicionando aqui
    });
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
      formArray.removeAt(index);
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

        // Redimensiona proporcionalmente
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = height * (MAX_WIDTH / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = width * (MAX_HEIGHT / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const resizedBase64 = canvas.toDataURL('image/webp');

          // Salva imagem redimensionada no formulário e na preview
          this.imagemPreview = resizedBase64;
          this.produtoForm.patchValue({ imagemProduto: resizedBase64 });
        }
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}


  onSubmit() {
    if (this.produtoForm.valid) {
       console.log(this.produtoForm.value)
      const produto: Produto = this.produtoForm.value;

      this.produtoService.cadastrarProduto(produto).subscribe({
        next: () => {
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
