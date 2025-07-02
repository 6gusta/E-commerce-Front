import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Index } from './index';
import { Produtos } from './produtos/produtos';
import { Carrinho } from './carrinho/carrinho';
import { Minhaconta } from './minhaconta/minhaconta';
import { Checkout } from './checkout/checkout';
import { ProdutoCadastroComponent } from './cadastro-intem/cadastrointem';


export const routes: Routes = [
     { path: '', component: Home },
     { path: 'index', component: Index},
   {path: 'checkout', component: Checkout},
   { path: 'produto/:id', component: Produtos },
   {path: 'cadastrointem', component: ProdutoCadastroComponent},

      

     {path: 'carrinho', component: Carrinho},
     {path: 'minhaconta', component: Minhaconta}
];
