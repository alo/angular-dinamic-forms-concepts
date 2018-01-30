import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-form-control',
  templateUrl: './custom-form-control.component.html',
  styleUrls: ['./custom-form-control.component.css']
})
export class CustomFormControlComponent implements OnInit {

  @Input() formParent: FormGroup;
  @Input() prop: any;

  constructor() { }

  static buildForm() {
    return new FormControl('');
  }

  static buildProp(key: string, item: any) {
    const _item: any = {};
    let _inputType = 'text';
    if (item.type === 'number') {
      _inputType = 'number';
    }

    Object.assign(_item, item);
    _item.key = key;
    _item.inputType = _inputType;
    return _item;
  }

  ngOnInit() {
  }

}
