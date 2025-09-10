import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KaryawanListPage } from './karyawan-list.page';

describe('KaryawanListPage', () => {
  let component: KaryawanListPage;
  let fixture: ComponentFixture<KaryawanListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KaryawanListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
