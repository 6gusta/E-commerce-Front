import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProdutoService, Produto } from '../services/produtoservice';
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
      tamanhosDisponiveis: this.fb.array([]),
      valorPromocional: [null]
    });

    console.log('Form inicial:', this.produtoForm.value);

    // 🔁 Validação dinâmica do campo de promoção
    this.produtoForm.get('categoriaProduto')?.valueChanges.subscribe(categoria => {
      console.log('Categoria mudou para:', categoria);
      const promoControl = this.produtoForm.get('valorPromocional');
      if (categoria === 'PROMOCOES') {
        promoControl?.setValidators([Validators.required, Validators.min(0)]);
        console.log('Validadores de valorPromocional definidos:', promoControl?.validator);
      } else {
        promoControl?.clearValidators();
        promoControl?.setValue(null);
        console.log('Validadores de valorPromocional limpos e valor setado para null');
      }
      promoControl?.updateValueAndValidity();
      console.log('Valor promocional após updateValueAndValidity:', promoControl?.value);
    });

    this.produtoForm.get('valorPromocional')?.valueChanges.subscribe(valor => {
      console.log('valorPromocional mudou para:', valor);
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
      console.log('Tamanho selecionado:', value);
    } else {
      const index = formArray.controls.findIndex(x => x.value === value);
      formArray.removeAt(index);
      console.log('Tamanho desmarcado:', value);
    }
    console.log('Tamanhos disponíveis:', formArray.value);
  }

  onImagemChange(event: any): void {
    const file = event.target.files[0];
    console.log('Imagem selecionada:', file);
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
            console.log('Imagem convertida para base64:', resizedBase64);
            this.imagemPreview = resizedBase64;
            this.produtoForm.patchValue({ imagemProduto: resizedBase64 });
            console.log('Form valorImagem atualizado:', this.produtoForm.get('imagemProduto')?.value);
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log('==== SUBMIT ====');
    console.log('Form valid?', this.produtoForm.valid);
    console.log('Form Value no submit:', this.produtoForm.value);
    console.log('Valor promocional no submit:', this.produtoForm.get('valorPromocional')?.value);

    if (this.produtoForm.valid) {
      const produto: Produto = this.produtoForm.value;
      console.log('Produto a ser enviado:', produto);
      this.produtoService.cadastrarProduto(produto).subscribe({
        next: () => {
          alert('✅ Produto cadastrado com sucesso!');
          this.produtoForm.reset();
          this.imagemPreview = null;
          console.log('Form resetado após cadastro');
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
