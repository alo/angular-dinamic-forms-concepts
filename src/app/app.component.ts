import { Component } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
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

  config = {
    'type': 'object',
    'required': ['general'],
    'properties': {
      'general': {
        'type': 'object',
        'properties': {
          'binBackup': {'type': 'string'},
          'planFilePath': {'type': 'string'},
          'refreshIntervalBinBackup': {'type': 'number'},
          'modulesPath': {'type': 'string'},
          'api': {
            'type': 'object',
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
                  'testBoolean': {'type': 'boolean'},
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
          }
        }
      }
    }
  };

  result = {
    'general': {
      'binBackup': 'bin test',
      'planFilePath': 'path/test',
      'refreshIntervalBinBackup': '',
      'modulesPath': 'path/test/modules',
      'api': {
        'port': '8888',
        'users': [
          'kbsa',
          'misha'
        ],
        'testArray': '',
        'secret': 'shhhh',
        'token_expiration_time': '',
        'log_display_level': '',
        'history': {
          'disable': false,
          'testBoolean': true,
          'test': '',
          'test2': 'testaso',
          'test3': [
            'ou',
            'yeah',
            'niggi'
          ],
          'testarray': [
            'wtf',
            'omg'
          ],
          'testObject': '',
          'mongodb': {
            'host': 'mongodb',
            'port': '3600',
            'database': '',
            'test4': []
          }
        }
      }
    }
  };

  constructor() {
    this.createForm();
  }

  createForm() {
    this.configProp = CustomFormObjectComponent.buildProp('config', this.config);
    this.configForm = CustomFormObjectComponent.buildForm(this.configProp);

    CustomFormObjectComponent.patchForm(
      this.configForm,
      this.result,
      this.configProp.props
    );
  }


}
