import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Index } from './index';
import { Produtos } from './produtos/produtos';
import { Carrinho } from './carrinho/carrinho';

export const routes: Routes = [
     { path: '', component: Home },
     { path: 'index', component: Index},
     {path: 'produtos', component: Produtos},
     {path: 'carrinho', component: Carrinho}
];
