import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  configForm: FormGroup;
  props = [];

  api = {
    'required': ['port'],
    'properties': {
      'port': { 'type': ['number'] },
      'users': { 'type': 'array' },
      'secret': { 'type': 'string' },
      // 'limite_req': { 'type': 'string' },
      'token_expiration_time': { 'type': 'number' },
      'log_display_level': {
        'type': 'string',
        // 'pattern': '(combined|common|dev|short|tiny)'
      },
      // 'chainsFieldsResponse': { 'type': 'array' },
      // 'processFieldsResponse': { 'type': 'array' }
    }
  };


  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {


    // this.configForm = this.fb.group({
    //   api: this.fb.group({
    //     // port: 4200,
    //     users: this.fb.array([]),
    //     secret: 'secret',
    //     token_expiration_time: '400',
    //     log_display_level: 'combined'
    //   })
    // });
    const formDataObject = {};

    console.log(this.configForm);
    Object.keys(this.api.properties).forEach( key => {
      if (this.api.properties[key].type === 'string' ) {
        formDataObject[key] = new FormControl('');
        this.props.push({
          key: key,
          label: formDataObject[key].label,
          type: 'text'
        });
      } else if (this.api.properties[key].type === 'array') {
        formDataObject[key] = new FormArray([]);
        this.props.push({
          key: key,
          label: formDataObject[key].label,
          type: 'array'
        });
      }
    });
    this.configForm = this.fb.group({
      api: this.fb.group(formDataObject)
    });

  }

  addControl(controlName) {
    const arrayControl = this.configForm.get(`api.${controlName}`) as FormArray;
    arrayControl.push(this.fb.control(''));
  }


}
