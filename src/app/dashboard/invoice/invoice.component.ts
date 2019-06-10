import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  myForm: FormGroup;
  consigmentDetail=[];
  contactlist=[];
  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService,private companyService:CompanyService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      Work_order: '',
      customer: '',
      invoice_date: '',
      terms: '',
      due_date: '',
      sub_total: '',
      adjustment: 0,
      periodstart: '',
      periodend: '',
      reverse_change: '',
      gstamount: 0,
      gstrate: 0,
      amount: '',
      arraydata: this.fb.array([])
    })

    this.myForm.valueChanges.subscribe(() => {
      this.onmyFormValuesChanged();
    });
    this.addPhone();
    this.getConsignmentList();
    this.customerList();
    this.customerList(); 
  }
  getConsignmentList() {
    this.userService.consignmentList(localStorage.getItem('SuperAdmin')).subscribe(data => {
      console.log(data)
      let result: any = {}
      result = data;
      this.consigmentDetail = result.result
      console.log(this.consigmentDetail);
    },
      error => {
        console.log(error);

      })
  }
  customerList() {
  
    this.companyService.getcontact(localStorage.getItem('SuperAdmin')).subscribe(data => {
     
      let result: any = {}
      result = data;
      this.contactlist = result.result
      console.log(this.contactlist);
    },
      error => {
        console.log(error);

      })
  }

  onmyFormValuesChanged() {
    let i = 0;
    var amounts = 0;
    console.log(this.myForm.value.arraydata)
    if (this.myForm.value.arraydata.length != 0) {
      for (i = 0; i < this.myForm.value.arraydata.length; i++) {
        amounts = (amounts) + parseInt(this.myForm.value.arraydata[i].amount)
      }
    }

    this.myForm.value.sub_total = amounts;
    this.calc();
  }
  get phoneForms() {
    return this.myForm.get('arraydata') as FormArray
  }


  calc() {
    console.log(this.myForm.value.sub_total.toString())
    console.log(this.myForm.value.adjustment)

    var adjustedval = eval(this.myForm.value.sub_total + parseInt(this.myForm.value.adjustment))
    console.log(adjustedval)
    this.myForm.value.gstamount = (this.myForm.value.gstrate * adjustedval) / 100;

    this.myForm.value.amount = this.myForm.value.gstamount + adjustedval;


  }
  addPhone() {

    const phone = this.fb.group({
      serial_number: [this.phoneForms.value.length + 1],
      cosignmentId: [],
      description: [],
      amount: [0]
    })
    this.phoneForms.push(phone);

  }

  deletePhone(i) {
    this.phoneForms.removeAt(i)
  }
  submit() {
    console.log(this.myForm.value);
    let data = {
      customer: this.myForm.value.customer,
      Work_order: this.myForm.value.Work_order,
      invoice_date: this.myForm.value.invoice_date,
      terms: this.myForm.value.terms,
      due_date: this.myForm.value.due_date,
      sub_total: this.myForm.value.sub_total,
      total: this.myForm.value.amount,
      adjustment: {
        amount: this.myForm.value.adjustment,
      },
      period: {
        start_date: this.myForm.value.periodstart,
        end_date: this.myForm.value.periodend,
      },
      reverse_change: this.myForm.value.reverse_change,
      gst: {
        rate: this.myForm.value.gstrate,
        amount: this.myForm.value.gstamount,
      },
      items_details: this.myForm.value.arraydata,
      userId: localStorage.getItem('userId'),
    }
    console.log(data);
    this.userService.creatinvoice(data).subscribe(result=>{
      console.log(data);
      this.toastr.success('Awesome!', 'invoice saved suceesfully');
    },
    err=>{
      console.log(err);
      this.toastr.error('Error!', 'Server Error')

    })
  }
}
