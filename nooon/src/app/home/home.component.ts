import { Component } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { BestSellerComponent } from "../best-seller/best-seller.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, BestSellerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
