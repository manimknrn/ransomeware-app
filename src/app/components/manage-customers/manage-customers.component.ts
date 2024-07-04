import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeneralTableComponent } from '../../shared/components/general-table/general-table.component';
import { TableBtn } from '../../shared/models/table-button';
import { TableColumn } from '../../shared/models/table.column';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss'],
  imports: [MatTableModule, GeneralTableComponent, FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true
})
export class ManageCustomersComponent implements OnInit {
  data!: Customer[]
  pageList = {
    currentPage: 0,
    pageSize: 10
  };
  currentPage = 0;
  totalDataCount = 0;
  sortColumn = '';
  sortDirection = 'asc';
  columns!: TableColumn[];
  buttons!: TableBtn[];
  actionHeader: string = '';
  filterPlaceholder: string = '';
  dataSource = [];

  constructor(private customerService: CustomerService, public dialog: MatDialog, readonly router: Router) {
    this.render(this.pageList, '');
    this.columns = [
      { columnDef: 'name', header: 'Name', cell: (element: Customer) => `${element.name}` },
      { columnDef: 'extensions', header: 'Extensions', cell: (element: Customer) => `${element.extensions}` },
      { columnDef: 'extensionPattern', header: 'Extension Pattern', cell: (element: Customer) => `${element.extensionPattern}` },
      { columnDef: 'ransomNoteFilenames', header: 'Ransom Note File Names', cell: (element: Customer) => `${element.ransomNoteFilenames}` },
      { columnDef: 'comment', header: 'Comment', cell: (element: Customer) => `${element.comment}` },
      { columnDef: 'encryptionAlgorithm', header: 'Encryption Algorithm', cell: (element: Customer) => `${element.encryptionAlgorithm}` },
      { columnDef: 'decryptor', header: 'Decryptor', cell: (element: Customer) => `${element.decryptor}` },
      { columnDef: 'resources', header: 'Resources', cell: (element: Customer) => `${element.resources}` },
      { columnDef: 'screenshots', header: 'Screenshots', cell: (element: Customer) => `${element.screenshots}` },
      { columnDef: 'microsoftDetectionName', header: 'Microsoft DetectionName', cell: (element: Customer) => `${element.microsoftDetectionName}` },
      { columnDef: 'microsoftInfo', header: 'Microsoft Info', cell: (element: Customer) => `${element.microsoftInfo}` },
      { columnDef: 'sandbox', header: 'Sandbox', cell: (element: Customer) => `${element.sandbox}` },
      { columnDef: 'iocs', header: 'Iocs', cell: (element: Customer) => `${element.iocs}` },
      { columnDef: 'snort', header: 'Snort', cell: (element: Customer) => `${element.snort}` }
    ];

    this.buttons = [
      { styleClass: 'submit', icon: 'edit', payload: (element: Customer) => `${element.id}`, action: 'edit', tooltip: 'Edit', enable: true },
      { styleClass: 'submit', icon: 'delete', payload: (element: Customer) => `${element.id}`, action: 'delete', tooltip: 'Delete', enable: true },
    ]

    this.actionHeader = 'Register Ransomware';
  }

  ngOnInit(): void {
  }

  render(value: any, searchFilter?: string) {
    this.customerService.getCustomers().subscribe((res: any) => {
      let data = !!res ? this.removeDuplicates(res.data) : [];
      this.data = this.addIds(data);
      this.totalDataCount = res.data.length;
    });
  }

  addIds(data: any[]): any[] {
    return data.map((item, index) => {
      return { id: item._id || index, ...item };
    });
  }

  removeDuplicates(data: any[]): any[] {
    const unique = new Map();
    return data.filter(item => {
      const key = JSON.stringify(item.name); // Use JSON string as key for uniqueness
      return !unique.has(key) && unique.set(key, true);
    });
  }

  loadData(value: any) {
    let val = {
      currentPage: value.currentPage,
      pageSize: value.pageSize
    }
    this.pageList.pageSize = value.pageSize;
    this.render(val, '')
  }

  buttonClick(result: string[]) {
    if (result[0] == 'delete') {
      this.deleteCustomer(+result[1]);
    } else if (result[0] == 'edit') {
      this.editCustomer(+result[1]);
    }
  }

  deleteCustomer(id: number): void {
    const formData = this.data.find(res => res.id === id);
    this.data = this.data.filter(customer => customer.id !== id); //this is just to show the removal as mock
    this.customerService.deleteCustomer(id, formData).subscribe(response => {
      console.info(`Customer with id ${formData} deleted.`, response);
    }, error => {
      console.error('Error while removing customer', error);
    })
  }

  editCustomer(id: number): void {
    const formData = this.data.find(res => res.id === id);
    this.router.navigate([`/register-ransomware`], { state: { data: formData } });
  }

  actionFeature(event: any) {
    this.router.navigateByUrl('/register-ransomware');
  }
}
