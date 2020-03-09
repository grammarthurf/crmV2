import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorExternoComponent } from './vendedor-externo.component';

describe('VendedorExternoComponent', () => {
  let component: VendedorExternoComponent;
  let fixture: ComponentFixture<VendedorExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
