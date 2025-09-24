import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';

import { EditProfilePage } from './edit-profile.page';

describe('EditProfilePage', () => {
  let component: EditProfilePage;
  let fixture: ComponentFixture<EditProfilePage>;
  const navControllerSpy = jasmine.createSpyObj('NavController', ['navigateForward']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfilePage],
      providers: [{ provide: NavController, useValue: navControllerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to pengaturan', () => {
    component.goBack();

    expect(navControllerSpy.navigateForward).toHaveBeenCalledWith('/tabs/pengaturan');
  });
});
