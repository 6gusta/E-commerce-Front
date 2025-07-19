import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Index } from './index';
import { Produtos } from './produtos/produtos';
import { Carrinho } from './carrinho/carrinho';
import { Minhaconta } from './minhaconta/minhaconta';
import { CheckoutComponent } from './checkout/checkout';
import { ProdutoCadastroComponent } from './cadastro-intem/cadastrointem';
import { InfoCliente } from './info-cliente/info-cliente';
import { LoginAdmin } from './login-admin/login-admin';
import { HomeAdmin } from './home-admin/home-admin';
import { Sucesso } from './sucesso/sucesso';
import { Erro } from './erro/erro';
import { Sobre } from './sobre/sobre';
import { Contato } from './contato/contato';

import { AuthGuard } from './services/auth.guard';  // Importa o guard

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'index', component: Index },
  { path: 'produto/:id', component: Produtos },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout/:id', component: CheckoutComponent },
  { path: 'carrinho', component: Carrinho },
  {path: 'sobre' , component: Sobre},
  {path: 'contato', component: Contato},
  {path: 'sucesso', component: Sucesso},
  {path: 'erro', component: Erro},
  
  // Rotas cliente
  { path: 'infocliente', component: InfoCliente },
  { path: 'infocliente/:id', component: InfoCliente },

  // Rotas admin com proteção no homeadmin
  {
    path: 'admin',
    children: [
      { path: '', component: LoginAdmin },    
      { path: 'login', component: LoginAdmin },     // /admin/login
      { path: 'cadastrointem', component: ProdutoCadastroComponent, canActivate: [AuthGuard] },  // protege cadastro
      { path: 'homeadmin', component: HomeAdmin, canActivate: [AuthGuard] },     
        { path: 'minhaconta', component: Minhaconta, canActivate: [AuthGuard] }
                      
    ]
  },

  // Wildcard para rotas inválidas
  { path: '**', redirectTo: '' }
];
