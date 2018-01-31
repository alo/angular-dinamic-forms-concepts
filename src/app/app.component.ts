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
  configProp: any;

  api = {
    'required': ['port'],
    'properties': {
      'port': { 'type': ['string', 'number'] },
      'users': { 'type': 'array' },
      'testArray': { 'type': ['string', 'array'] },
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
          'testarray': { 'type': ['array', 'string'] },
          'testObject': {
            'type': ['string', 'object'],
            'properties': {
              'test': {'type': 'string'},
              'test2': {'type': 'string'},
              'test3': { 'type': 'array' }
            }
          },
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

  result = {
    'api': {
      'port': '',
      'users': [],
      'testArray': 'rggg',
      'secret': 'ssssh',
      'token_expiration_time': '',
      'log_display_level': '',
      'history': {
        'test': '',
        'test2': 'feeeee',
        'test3': [
          'fee',
          'ggr',
          'htttt'
        ],
        'testarray': [],
        'testObject': 'grgr',
        'mongodb': {
          'host': '',
          'port': '5555',
          'database': '',
          'test4': [
            'hrth',
            'fffff'
          ]
        }
      }
    }
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.configProp = CustomFormObjectComponent.buildProp('api', this.api);
    this.configForm = this.fb.group({
      api: CustomFormObjectComponent.buildForm(this.configProp)
    });

    CustomFormObjectComponent.patchForm(
      this.configForm.controls.api as FormGroup,
      this.result.api,
      this.configProp.props
    );
  }


}
