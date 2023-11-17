import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { ProductsService } from '../_services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteImagenPComponent } from './delete-imagen-p/delete-imagen-p.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  isLoading$:any ;

  title:any = null;
  sku:any = null;
  categorie_id:any = '';
  price_soles:any = '';
  price_usd:any = '';
  resumen:any = null;
  description:any = null;

  categories:any = [];

  text:any = null;
  tags:any = [];

  imagen_file:any = null;
  imagen_previzualiza:any = null;

  images_files:any = [];
  img_files:any = null;
  img_previzualizar:any = null;

  product_id:any = null;
  product:any = {
    title: '',
  };

  state:any = 1;
  stock:any = '';

  constructor(
    public toaster:Toaster,
    public _productService: ProductsService,
    public router: Router,
    public activerouter: ActivatedRoute,
    public modelService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._productService.isLoading$;
    this.activerouter.params.subscribe((resp:any) => {
      this.product_id = resp["id"] || "";
    })
    this._productService.getInfo().subscribe((resp:any) => {
      this.categories = resp.categories;
    })
    this._productService.showProduct(this.product_id).subscribe((resp:any) => {
      console.log(resp);
      this.product = resp.product;
      this.title = this.product.title;
      this.sku = this.product.sku;
      this.categorie_id = this.product.categorie_id;
      this.price_soles = this.product.price_soles;
      this.price_usd = this.product.price_usd;
      this.resumen = this.product.resumen;
      this.description = this.product.description;
      this.tags = this.product.tags_a;
      this.imagen_previzualiza = this.product.imagen;
      this.images_files = this.product.images;
      this.stock = this.product.stock;
      this.state = this.product.state;
    })
  }

  loadServices(){
    this._productService.isLoadingSubject.next(true);
    setTimeout(() => {
      this._productService.isLoadingSubject.next(false)
    }, 50);
  }

  processFile($event){
    if($event.target.files[0].type.indexOf("image") < 0){
      this.toaster.open(NoticyAlertComponent,{text:`danger-'EL ARCHIVO CARGADO NO ES UNA IMAGEN'`});
      return;
    }
    this.imagen_file = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imagen_file);
    reader.onloadend = () => this.imagen_previzualiza = reader.result;
    this.loadServices();
  }

  addTags(){
    this.tags.push(this.text)
    this.text = null;
  }
  removeTags(index){
    this.tags.splice(index,1);
  }

  addFile($event){
    if($event.target.files[0].type.indexOf("image") < 0){
      this.toaster.open(NoticyAlertComponent,{text:`danger-'EL ARCHIVO CARGADO NO ES UNA IMAGEN'`});
      return;
    }
    this.img_files = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.img_files);
    reader.onloadend = () => this.img_previzualizar = reader.result;
  }

  addImages(){
    if(!this.img_files){
      this.toaster.open(NoticyAlertComponent,{text:`danger-'DEBES AGREGAR UNA IMAGEN'`});
      return;
    }
    let formaData = new FormData();
    formaData.append("product_id",this.product_id);
    formaData.append("file",this.img_files)
    this._productService.addImagenProduct(formaData).subscribe((resp:any) => {
      this.img_files = null;
      this.img_previzualizar = null;
      this.images_files.unshift(resp.imagen);
    })
  }

  removeImages(imagen_){
    // this.images_files.splice(index,1);
    const modalRef = this.modelService.open(DeleteImagenPComponent, {centered : true, size: 'sm'});
    modalRef.componentInstance.imagen_ = imagen_;
    modalRef.result.then(
      () => {

      },
      () => {
        
      }
    )
    modalRef.componentInstance.ImagenE.subscribe((resp:any) => {
      let INDEX = this.images_files.findIndex(item => item.id == resp.id);
      this.images_files.splice(INDEX,1);
    })
  }

  createProduct(){

    if(! this.title ||
      ! this.sku ||
      ! this.categorie_id ||
      ! this.price_soles ||
      ! this.price_usd ||
      ! this.resumen ||
      ! this.description){
        this.toaster.open(NoticyAlertComponent,{text:`danger-'TODOS LOS CAMPOS SON OBLIGATORIOS'`});
      return;
    }
    if(this.images_files.length == 0){
      this.toaster.open(NoticyAlertComponent,{text:`danger-'Debes ingresar un conjunto de imagenes'`})
        return;
    }

    let formaData = new FormData();
    formaData.append("title",this.title);
    formaData.append("sku",this.sku)
    formaData.append("categorie_id",this.categorie_id)
    formaData.append("price_soles",this.price_soles)
    formaData.append("price_usd",this.price_usd)
    formaData.append("resumen",this.resumen)
    formaData.append("description",this.description)
    formaData.append("imagen_file",this.imagen_file)
    formaData.append("tags",this.tags)
    formaData.append("stock",this.stock)
    formaData.append("state",this.state);

    // let index = 0;
    // for (const imagen of this.images_files) {
    //   formaData.append("files["+index+"]",imagen.file);
    //   index++;
    // }

    this._productService.updateProduct(this.product_id,formaData).subscribe((resp:any) => {
      console.log(resp);
      this.toaster.open(NoticyAlertComponent,{text:`primary-'SE REGISTRO LOS CAMBIOS DEL PRODUCTO'`});
    })
  }
}
