import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,           // ESSENCIAL para importar em AppComponent
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'] // array com 's' no final
})
export class Footer {}
