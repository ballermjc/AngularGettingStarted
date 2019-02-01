import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  errorMessage: string = '';
  product: IProduct | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    if(id) {
      this.getProduct(id);
    }
  }
  
  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      product => {
        this.product = product;
        this.pageTitle += `: ${this.product.productName}`;

      }
    )
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
