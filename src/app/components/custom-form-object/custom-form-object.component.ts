import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
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

  constructor() { }

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
    if (propParent.anyOf) {
      Object.assign(propParent, CustomFormObjectComponent.matchAnyOf(propParent.anyOf, propParent._anyOfIndex));
    }
    Object.keys(propParent.properties).forEach( keyIndex => {
      const _propertieProp = CustomFormObjectComponent.buildPropertieProp(keyIndex, propParent.properties[keyIndex]);
      props.push(_propertieProp);
    });
    propParent.props = props;
    return propParent;
  }

  static buildPropertieForm(key: string, propertie: any) {
    if (propertie.type === 'string' || propertie.type === 'number' || propertie.type === 'boolean') {
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
    if (CustomFormControlComponent.controlTypes.indexOf(propertie.type) >= 0) {
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

  static patchForm(form: FormGroup, value: any, prop: any) {
    // form.patchValue(value);
    Object.keys(value).forEach(key => {
      const _propIndex = CustomFormObjectComponent.getPropIndex(prop, key);
      if (prop[_propIndex].typeOptions && prop[_propIndex].typeOptions.length) {
        let typeMatched = false;
        for (const type of prop[_propIndex].typeOptions) {
          if (!typeMatched && type !== prop[_propIndex].type) {
            if (type === 'array' && CustomFormArrayComponent.isArrayType(value[key])) {
              CustomFormObjectComponent.changeControlType(type, _propIndex, key, prop, form);
              typeMatched = true;
            } else if (type === 'object' && CustomFormObjectComponent.isObjectType(value[key])) {
              CustomFormObjectComponent.changeControlType(type, _propIndex, key, prop, form);
              typeMatched = true;
            } else if (
              CustomFormControlComponent.controlTypes.indexOf(type) >= 0
              && CustomFormControlComponent.isControlType(value[key], type)
              && !CustomFormArrayComponent.isArrayType(value[key])
              && !CustomFormObjectComponent.isObjectType(value[key])
            ) {
              CustomFormObjectComponent.changeControlType(type, _propIndex, key, prop, form);
              typeMatched = true;
            }
          }
        }
      }
      if (prop[_propIndex].anyOf && CustomFormObjectComponent.isObjectType(value[key])) {
        const _possiblesAnyOf = {};
        for (let i = 0; i < prop[_propIndex].anyOf.length; i++) {
          _possiblesAnyOf[i] = prop[_propIndex].anyOf[i];
        }
        let _anyOfIndex = null;
        Object.keys(value[key]).forEach(valueKey => {
          Object.keys(_possiblesAnyOf).forEach(index => {
            if (!_possiblesAnyOf[index].properties[valueKey]) {
              delete _possiblesAnyOf[index];
            } else {
              _anyOfIndex = index;
            }
          });
        });
        CustomFormObjectComponent.changeAnyOf(_anyOfIndex, prop[_propIndex], form.controls[key]);
      }
      if (CustomFormArrayComponent.isArrayType(value[key])) {
        for (const val of value[key]) {
          CustomFormArrayComponent.addControl(key, prop[_propIndex], form, val);
        }
        form.controls[key].patchValue(value[key]);
      } else if (CustomFormObjectComponent.isObjectType(value[key])) {
        CustomFormObjectComponent.patchForm(
          form.controls[key] as FormGroup,
          value[key],
          prop[_propIndex].props
        );
      } else {
        form.controls[key].patchValue(value[key]);
      }
    });
  }

  static getPropIndex(prop, key) {
    for (let i = 0; i < prop.length; i++) {
      if (prop[i].key === key) {
        return i;
      }
    }
  }

  static changeControlType(value, index, key, propParent, formParent) {
    const _prop = Object.assign({}, propParent[index]);
    _prop.type = value;
    formParent.removeControl(key);
    propParent[index] = CustomFormObjectComponent.buildPropertieProp(key, _prop);
    formParent.addControl(key, CustomFormObjectComponent.buildPropertieForm(key, _prop));
  }

  static isObjectType(value) {
    if (value !== null && typeof value === 'object') {
      return true;
    } else {
      return false;
    }
  }

  static matchAnyOf(options, index?) {
    return options[index ? index : 0];
  }

  static changeAnyOf(index, propParent, formParent) {
    propParent._anyOfIndex = index;
    CustomFormObjectComponent.buildProp(propParent.key, propParent);

    const _form = CustomFormObjectComponent.buildForm(propParent);
    Object.keys(formParent.controls).forEach(key => {
      formParent.removeControl(key);
    });
    Object.keys(_form.controls).forEach(key => {
      formParent.addControl(key, CustomFormObjectComponent.buildPropertieForm(key, propParent.properties[key]));
    });
  }

  ngOnInit() {
  }

  changeControlType(value, index, key) {
    CustomFormObjectComponent.changeControlType(value, index, key, this.propParent.props, this.formParent);
  }

  changeAnyOf(index) {
    CustomFormObjectComponent.changeAnyOf(index, this.propParent, this.formParent);
  }

}
