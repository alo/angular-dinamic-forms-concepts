import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { CustomFormArrayComponent } from '../custom-form-array/custom-form-array.component';
import { CustomFormControlComponent } from '../custom-form-control/custom-form-control.component';

@Component({
  selector: 'app-custom-form-object',
  templateUrl: './custom-form-object.component.html',
  styleUrls: ['./custom-form-object.component.css']
})
export class CustomFormObjectComponent implements OnInit {

  @Input() formParent: FormGroup;
  @Input() propParent: any;

  props = [];

  constructor(
    private fb: FormBuilder
  ) { }

  static buildForm(propParent: any) {
    const formDataObject = {};

    Object.keys(propParent.properties).forEach( key => {
      if (propParent.properties[key].type === 'string' ) {
        formDataObject[key] = CustomFormControlComponent.buildForm();
      } else if (propParent.properties[key].type === 'array') {
        formDataObject[key] = CustomFormArrayComponent.buildForm();
      }
    });
    return new FormGroup(formDataObject);

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    Object.keys(this.propParent.properties).forEach( key => {
      if (this.propParent.properties[key].type === 'string' ) {
        this.props.push({
          key: key,
          label: this.propParent.properties[key].label,
          type: 'text'
        });
      } else if (this.propParent.properties[key].type === 'array') {
        this.props.push({
          key: key,
          label: this.propParent.properties[key].label,
          type: 'array'
        });
      }
    });
  }

}
