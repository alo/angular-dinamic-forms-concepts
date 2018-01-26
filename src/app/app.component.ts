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

  api = {
    'required': ['port'],
    'properties': {
      'port': { 'type': ['number'] },
      'users': { 'type': 'array' },
      'secret': { 'type': 'string' },
      'limite_req': { 'type': 'string' },
      'token_expiration_time': { 'type': 'number' },
      'log_display_level': {
        'type': 'string',
        'pattern': '(combined|common|dev|short|tiny)'
      },
      'chainsFieldsResponse': { 'type': 'array' },
      'processFieldsResponse': { 'type': 'array' }
    }
  };


  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.configForm = this.fb.group({
      api: this.fb.group({
        port: 4200,
        users: 'listado de usuarios',
        // users: this.fb.array([]),
        secret: 'secret'
      })
    });
  }

  get control() {
    return this.configForm.get('users') as FormArray;
  }

  addUser(user) {
    this.control.push(new FormControl(user));
  }

  removeUser(index: number) {
    this.control.removeAt(index);
  }

  selectUser(user) {
    const index = this.control.value.indexOf(user);
    if (!!~index) {
      this.removeUser(index);
    } else {
      this.addUser(user);
    }
  }


}
