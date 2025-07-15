import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-admin',
   standalone: true,
  imports: [RouterModule,MatIconModule,CommonModule,    MatButtonModule],
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.css'
})
export class HeaderAdmin {
 showSearch: boolean = false;

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.search-bar, button');
    if (!clickedInside) {
      this.showSearch = false;
    }
  }

}
