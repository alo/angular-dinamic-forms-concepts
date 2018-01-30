import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CustomFormControlComponent } from '../custom-form-control/custom-form-control.component';

@Component({
  selector: 'app-custom-form-array',
  templateUrl: './custom-form-array.component.html',
  styleUrls: ['./custom-form-array.component.css']
})
export class CustomFormArrayComponent implements OnInit {

  @Input() formParent: FormGroup;
  @Input() prop: any;

  constructor(
    private fb: FormBuilder
  ) { }

  static buildForm() {
    return new FormArray([]);
  }

  static buildProp(key: string, item: any) {
    const _item: any = {};

    Object.assign(_item, item);
    _item.key = key;
    _item.items = [];
    return _item;
  }

  ngOnInit() {
  }

  addControl(controlName) {
    this.prop.items.push(CustomFormControlComponent.buildProp(this.prop.items.length, {}));
    const arrayControl = this.formParent.get(controlName) as FormArray;
    arrayControl.push(CustomFormControlComponent.buildForm());
  }

  deleteControl(controlName, index) {
    this.prop.items.pop();
    const arrayControl = this.formParent.get(controlName) as FormArray;
    arrayControl.removeAt(index);
  }

}
