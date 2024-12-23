import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent {
@Input() product: any;
isVisible: boolean = false;

openModal() {
  this.isVisible = true;
}

closedModal() {
  this.isVisible = false;
}

closeModalOnOutsideClick(event: MouseEvent) {
  const modalContent = event.target as HTMLElement;
  if(modalContent.classList.contains('modal')){
    this.closedModal()
  }
}
}
