import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { CustomFormObjectComponent } from './components/custom-form-object/custom-form-object.component';

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
      'port': { 'type': ['number', 'string'] },
      'users': { 'type': 'array' },
      'secret': { 'type': 'string' },
      // 'limite_req': { 'type': 'string' },
      'token_expiration_time': { 'type': 'number' },
      'log_display_level': {
        'type': 'string',
        // 'pattern': '(combined|common|dev|short|tiny)'
      },
      'history': {
        'type': 'object',
        'properties': {
          'disable': {'type': 'boolean'},
          'test': {'type': 'string'},
          'test2': {'type': 'string'},
          'test3': { 'type': 'array' },
          'mongodb': {
            'type': 'object',
            'required': ['host', 'database'],
            'properties': {
              'host': {'type': 'string'},
              'port': {'type': 'number'},
              'database': {'type': 'string'},
              'test4': { 'type': 'array' }
            }
          }
        }
      }
      // 'chainsFieldsResponse': { 'type': 'array' },
      // 'processFieldsResponse': { 'type': 'array' }
    }
  };


  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.configForm = this.fb.group({
      api: CustomFormObjectComponent.buildForm(this.api)
    });

  }


}
