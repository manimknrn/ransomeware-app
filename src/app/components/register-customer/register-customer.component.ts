import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form.component';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { FormConfigService } from '../../services/form-config.service';

@Component({
  selector: 'app-register-customer',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, MatCardModule],
  templateUrl: './register-customer.component.html',
  styleUrl: './register-customer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterCustomerComponent {

  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;
  formConfig: any;
  customerId!: number;
  isEditMode: boolean = false;


  constructor(private customerService: CustomerService, readonly cdr: ChangeDetectorRef, readonly formConfigService: FormConfigService, private route: ActivatedRoute,
    readonly router: Router) {
    this.formConfigService.getFormConfig().subscribe((config: any) => {
      this.formConfig = config;
    });
    const navigation = this.router.getCurrentNavigation();
    this.customerId = navigation?.extras.state?.['data'];
    this.isEditMode = !!this.customerId;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.isEditMode && this.customerId) {
      this.loadCustomerData(this.customerId);
    }
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.dynamicFormComponent.form.valid) {
      const formData = this.dynamicFormComponent.form.value;
      formData.registrationDate = new Date().toISOString().split('T')[0];
      if (this.isEditMode && this.customerId) {
        // Update existing customer
        console.info('Updating customer:', formData);
      } else {
        this.customerService.registerCustomer(formData).subscribe(response => {
          console.info('Customer registered', response);
        }, error => {
          console.error('Error registering customer', error);
        })
      }
      this.router.navigate(['/manage-ransomware']);
    }
  }

  loadCustomerData(data: any): void {
    this.dynamicFormComponent.patchFormValues(data);
  }
}
