import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {
    path: "detail/:id",
    component: ProductDetailComponent,
  },
  {path: "products",
  component: StockComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
