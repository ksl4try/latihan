import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KaryawanDetailPage } from './karyawan-detail.page';

describe('KaryawanDetailPage', () => {
  let component: KaryawanDetailPage;
  let fixture: ComponentFixture<KaryawanDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KaryawanDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
