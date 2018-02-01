import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-form-control',
  templateUrl: './custom-form-control.component.html',
  styleUrls: ['./custom-form-control.component.css']
})
export class CustomFormControlComponent implements OnInit {

  static controlTypes = ['string', 'number', 'boolean'];

  @Input() formParent: FormGroup;
  @Input() prop: any;

  constructor() { }


  static buildForm(value?) {
    return new FormControl(value ? value : '');
  }

  static buildProp(key: string, item: any) {
    const _item: any = {};
    let _inputType = 'text';
    if (item.type === 'number') {
      _inputType = 'number';
    } else if (item.type === 'boolean') {
      _inputType = 'checkbox';
    }

    Object.assign(_item, item);
    _item.key = key;
    _item.inputType = _inputType;
    return _item;
  }

  static isControlType(value, type?): boolean {
    switch (type) {
      case 'string':
        if (typeof(value) === 'string') {
          return true;
        } else {
          return false;
        }
      case 'number':
        if (!isNaN(parseFloat(value))) {
          return true;
        } else {
          return false;
        }
      case 'boolean':
        if (value === true || value === false) {
          return true;
        } else {
          return false;
        }
      default:
        if (
          typeof(value) !== 'object'
          && !Array.isArray(value)
        ) {
          return true;
        } else {
          return false;
        }
    }
  }

  ngOnInit() {
  }

}
