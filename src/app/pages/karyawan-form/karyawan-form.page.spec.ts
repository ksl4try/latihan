import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KaryawanFormPage } from './karyawan-form.page';

describe('KaryawanFormPage', () => {
  let component: KaryawanFormPage;
  let fixture: ComponentFixture<KaryawanFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KaryawanFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
