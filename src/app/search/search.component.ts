import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  formModel: FormGroup;
  categories$: Observable<string[]>;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder) {
    // we creating form builder data model
    this.formModel = this.fb.group({
      title: [null, Validators.minLength(3)],
      price: [null, this.positiveNumberValidator],
      category: ['-1']
    });
  }

  ngOnInit() {
    // we populate our category
    this.categories$ = this.productService.getCategory();
  }

  positiveNumberValidator(control: FormControl): any {
    console.log('postivie number validator: ' + control.value);
    if (!control.value) {
      return null;
    }

    if (parseInt(control.value) > 0) {
      return null;
    } else {
      return { positiveNumber: true };
    }
  }

  onSubmit() {
    if (this.formModel.valid) {
      console.log(this.formModel);
      this.productService.productSearchEventEmitter.emit(this.formModel.value);
    }
  }
}
