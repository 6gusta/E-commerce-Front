import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Index } from './index';
import { Produtos } from './produtos/produtos';
import { Carrinho } from './carrinho/carrinho';
import { Minhaconta } from './minhaconta/minhaconta';
import { CheckoutComponent } from './checkout/checkout';
import { ProdutoCadastroComponent } from './cadastro-intem/cadastrointem';
import { InfoCliente } from './info-cliente/info-cliente'


export const routes: Routes = [
     { path: '', component: Home },
     { path: 'index', component: Index},
     {path: 'checkout', component: CheckoutComponent},
     { path: 'produto/:id', component: Produtos },
      { path: 'checkout/:id', component: CheckoutComponent },
     {path: 'cadastrointem', component: ProdutoCadastroComponent},
     {path: 'infocliente', component: InfoCliente},
     { path: 'infocliente/:id', component: InfoCliente },

     {path: 'carrinho', component: Carrinho},
     {path: 'minhaconta', component: Minhaconta}
];
