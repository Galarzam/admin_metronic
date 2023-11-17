import { Component, OnInit } from '@angular/core';
import { SalesService } from '../_services/sales.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailSalesListComponent } from '../detail-sales-list/detail-sales-list.component';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {

  SALES:any = [];
  isLoading$:any = null;

  search:any = null;

  constructor(
    public _salesServices: SalesService,
    public _modelService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._salesServices.isLoadingSubject;
    this.allSales();
  }

  allSales(page=1){
    let data = {
      search: this.search,
    }
    this._salesServices.allSales(page,data).subscribe((resp:any) => {
      console.log(resp); 
      this.SALES = resp.orders.data;
    })
  }

  reset(){
    this.search = null;
    this.allSales();
  }

  showDetail(sale){
    const modalRef = this._modelService.open(DetailSalesListComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.sale = sale;
    modalRef.result.then(
      () => {
        
      },
      () => {
        
      }
    )
  }

}
