import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ManageCustomersComponent } from './manage-customers.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ManageCustomersComponent', () => {
  let component: ManageCustomersComponent;
  let fixture: ComponentFixture<ManageCustomersComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MatTableModule, HttpClientTestingModule],
      providers: [HttpClient, HttpHandler],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCustomersComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load customer data on initialization', fakeAsync(() => {
    const mockCustomerData: any = [
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

    tick();
    fixture.detectChanges();

    expect(component.data).toBeFalsy(mockCustomerData);
  }));

});
