
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterCustomerComponent } from './register-customer.component';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler, provideHttpClient } from '@angular/common/http';

describe('RegisterCustomerComponent', () => {
  let component: RegisterCustomerComponent;
  let fixture: ComponentFixture<RegisterCustomerComponent>;
  let httpMock: HttpTestingController;
  let routeStub: any;
  let formGroup: FormGroup;
  let formControl: FormControl;

  beforeEach(async () => {
    routeStub = { params: of({ id: '123' }) };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        HttpClient, HttpHandler,
        { provide: ActivatedRoute, useValue: routeStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCustomerComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    const httpClient = TestBed.inject(HttpClient);
    httpClient.get('assets/form-config.json').subscribe((fields: any) => {
      component.formConfig.fields = fields;

      component.formConfig.fields.forEach((field: { name: any; validations: any[]; }) => {
        formGroup.addControl(field.name, new FormControl(''));
        if (field.validations) {
          const validators: any[] = [];
          field.validations.forEach((validation: { type: string; }) => {
            if (validation.type === 'required') {
              validators.push(Validators.required);
            }

          });
          formGroup.get(field.name)?.setValidators(validators);
          formControl.setValidators(validators);
        }
        formGroup.addControl(field.name, formControl);
      });
      fixture.detectChanges();
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load form configuration on init', fakeAsync(() => {
    const mockFormConfig = [
      {
        "name": [
          ".CryptoHasYou."
        ],
        "extensions": ".enc",
        "extensionPattern": "",
        "ransomNoteFilenames": " YOUR_FILES_ARE_LOCKED.txt",
        "comment": "",
        "encryptionAlgorithm": "AES(256)",
        "decryptor": "",
        "resources": [
          "http://www.nyxbone.com/malware/CryptoHasYou.html"
        ],
        "screenshots": "",
        "microsoftDetectionName": "Trojan:Win32/Dynamer!ac",
        "microsoftInfo": "https://www.microsoft.com/security/portal/threat/encyclopedia/entry.aspx?Name=Trojan%3AWin32%2FDynamer!ac",
        "sandbox": "https://www.hybrid-analysis.com/sample/afd3394fb538b36d20085504b86000ea3969e0ae5da8e0c058801020ec8da67c?environmentId=4",
        "iocs": "https://otx.alienvault.com/pulse/57180b18c1492d015c14bed8/",
        "snort": ""
      }
    ];

    fixture.detectChanges();

    tick();

    expect(component.formConfig).toEqual(mockFormConfig);
  }));

  it('should patch form values in edit mode', fakeAsync(() => {
    const mockFormConfig = {
      fields: [
        { name: 'name', validations: [{ name: 'required' }] },
        { name: 'extensions', validations: [{ extensions: 'required' }] },
        { name: 'extensionPattern', validations: [{ extensionPattern: 'required' }] },
        { name: 'ransomNoteFilenames', validations: [{ ransomNoteFilenames: 'required' }] },
        { name: 'comment', validations: [{ comment: 'required' }] }
      ]
    };

    const req = httpMock.expectOne('assets/form-config.json');
    req.flush(mockFormConfig);
    tick();
    fixture.detectChanges();

    const customerData = {
      "name": [
        ".CryptoHasYou."
      ],
      "extensions": ".enc",
      "extensionPattern": "",
      "ransomNoteFilenames": " YOUR_FILES_ARE_LOCKED.txt",
      "comment": "",
      "encryptionAlgorithm": "AES(256)",
      "decryptor": "",
      "resources": [
        "http://www.nyxbone.com/malware/CryptoHasYou.html"
      ],
      "screenshots": "",
      "microsoftDetectionName": "Trojan:Win32/Dynamer!ac",
      "microsoftInfo": "https://www.microsoft.com/security/portal/threat/encyclopedia/entry.aspx?Name=Trojan%3AWin32%2FDynamer!ac",
      "sandbox": "https://www.hybrid-analysis.com/sample/afd3394fb538b36d20085504b86000ea3969e0ae5da8e0c058801020ec8da67c?environmentId=4",
      "iocs": "https://otx.alienvault.com/pulse/57180b18c1492d015c14bed8/",
      "snort": ""
    }

    spyOn(component.dynamicFormComponent, 'patchFormValues');

    component.ngAfterViewInit();
    component.cdr.detectChanges();

    expect(component.dynamicFormComponent.patchFormValues).toHaveBeenCalledWith(customerData);
  }));

  it('should handle form submission', fakeAsync(() => {
    const mockFormConfig = {
      fields: [
        { name: 'name', validations: [{ name: 'required' }] },
        { name: 'extensions', validations: [{ extensions: 'required' }] },
        { name: 'extensionPattern', validations: [{ extensionPattern: 'required' }] },
        { name: 'ransomNoteFilenames', validations: [{ ransomNoteFilenames: 'required' }] },
        { name: 'comment', validations: [{ comment: 'required' }] }
      ]
    };

    component.dynamicFormComponent.form.setValue({
      "name": [
        ".CryptoHasYou."
      ],
      "extensions": ".enc",
      "extensionPattern": "",
      "ransomNoteFilenames": " YOUR_FILES_ARE_LOCKED.txt",
      "comment": "",
      "encryptionAlgorithm": "AES(256)",
      "decryptor": "",
      "resources": [
        "http://www.nyxbone.com/malware/CryptoHasYou.html"
      ],
      "screenshots": "",
      "microsoftDetectionName": "Trojan:Win32/Dynamer!ac",
      "microsoftInfo": "https://www.microsoft.com/security/portal/threat/encyclopedia/entry.aspx?Name=Trojan%3AWin32%2FDynamer!ac",
      "sandbox": "https://www.hybrid-analysis.com/sample/afd3394fb538b36d20085504b86000ea3969e0ae5da8e0c058801020ec8da67c?environmentId=4",
      "iocs": "https://otx.alienvault.com/pulse/57180b18c1492d015c14bed8/",
      "snort": ""
    });

    spyOn(console, 'log');
    spyOn(component.router, 'navigate');

    component.onSubmit();

    expect(console.log).toHaveBeenCalledWith('Registering new customer:', {
      "name": [
        ".CryptoHasYou."
      ],
      "extensions": ".enc",
      "extensionPattern": "",
      "ransomNoteFilenames": " YOUR_FILES_ARE_LOCKED.txt",
      "comment": "",
      "encryptionAlgorithm": "AES(256)",
      "decryptor": "",
      "resources": [
        "http://www.nyxbone.com/malware/CryptoHasYou.html"
      ],
      "screenshots": "",
      "microsoftDetectionName": "Trojan:Win32/Dynamer!ac",
      "microsoftInfo": "https://www.microsoft.com/security/portal/threat/encyclopedia/entry.aspx?Name=Trojan%3AWin32%2FDynamer!ac",
      "sandbox": "https://www.hybrid-analysis.com/sample/afd3394fb538b36d20085504b86000ea3969e0ae5da8e0c058801020ec8da67c?environmentId=4",
      "iocs": "https://otx.alienvault.com/pulse/57180b18c1492d015c14bed8/",
      "snort": ""
    });
    expect(component.router.navigate).toHaveBeenCalledWith(['/manage-ransomware']);
  }));
});

