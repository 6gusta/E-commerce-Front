import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Index } from './index';
import { Produtos } from './produtos/produtos';
import { Carrinho } from './carrinho/carrinho';
import { Minhaconta } from './minhaconta/minhaconta';
import { CheckoutComponent } from './checkout/checkout';
import { ProdutoCadastroComponent } from './cadastro-intem/cadastrointem';
import { InfoCliente } from './info-cliente/info-cliente';
import { LoginAdmin} from './login-admin/login-admin'

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'index', component: Index },
  { path: 'produto/:id', component: Produtos },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout/:id', component: CheckoutComponent },
  { path: 'carrinho', component: Carrinho },
  { path: 'minhaconta', component: Minhaconta },
   { path: 'admin', component: LoginAdmin },
   {path: 'login', component: LoginAdmin},

  // ✅ Rotas de cliente
  { path: 'infocliente', component: InfoCliente },
  { path: 'infocliente/:id', component: InfoCliente },

  // ✅ Rotas de admin agrupadas sob /admin
  {
    path: 'admin',
    children: [
      { path: 'cadastrointem', component: ProdutoCadastroComponent }
      // Você pode adicionar mais aqui depois, tipo admin-dashboard, etc.
    ]
  }
];
