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
  @Input() groupName: string;

  constructor(
    private fb: FormBuilder
  ) { }

  static buildForm(propParent: any) {
    const formDataObject = {};

    Object.keys(propParent.properties).forEach( key => {
      const _propertieForm = CustomFormObjectComponent.buildPropertieForm(key, propParent.properties[key]);
      if (_propertieForm) {
        formDataObject[key] = _propertieForm;
      }
    });
    return new FormGroup(formDataObject);

  }

  static buildProp(key: string, propParent: any) {
    const props = [];
    propParent.key = key;
    Object.keys(propParent.properties).forEach( keyIndex => {
      const _propertieProp = CustomFormObjectComponent.buildPropertieProp(keyIndex, propParent.properties[keyIndex]);
      props.push(_propertieProp);
    });
    propParent.props = props;
    return propParent;
  }

  static buildPropertieForm(key: string, propertie: any) {
    if (propertie.type === 'string' ) {
      return CustomFormControlComponent.buildForm();
    } else if (propertie.type === 'array') {
      return CustomFormArrayComponent.buildForm();
    } else if (propertie.type === 'object') {
      return CustomFormObjectComponent.buildForm(propertie);
    } else {
      return null;
    }
  }

  static buildPropertieProp(key: string, propertie: any) {
    if (propertie.type === 'string' ) {
      return CustomFormControlComponent.buildProp(key, propertie);
    } else if (propertie.type === 'array') {
      return CustomFormArrayComponent.buildProp(key, propertie);
    } else if (propertie.type === 'object') {
      return CustomFormObjectComponent.buildProp(key, propertie);
    } else if ( Array.isArray((propertie.type))) {
      propertie.typeOptions = propertie.type;
      propertie.type = propertie.type[0];
      const _propertieForm = CustomFormObjectComponent.buildPropertieForm(key, propertie);
      return CustomFormObjectComponent.buildPropertieProp(key, propertie);
    } else {
      return {};
    }
  }

  ngOnInit() {
  }

  changeControlType(value, index, key) {
    const _prop = Object.assign({}, this.propParent[index]);
    _prop.type = value;
    this.formParent.removeControl(key);
    this.propParent[index] = CustomFormObjectComponent.buildPropertieProp(key, _prop);
    this.formParent.addControl(key, CustomFormObjectComponent.buildPropertieForm(key, _prop));
  }

}
