import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-form-control',
  templateUrl: './custom-form-control.component.html',
  styleUrls: ['./custom-form-control.component.css']
})
export class CustomFormControlComponent implements OnInit {

  @Input() formParent: FormGroup;
  @Input() prop: any;

  constructor() { }

  ngOnInit() {
  }

}
