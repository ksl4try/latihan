import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { Auth } from 'src/app/services/auth.service';

import { LogPresensiPage } from './log-presensi.page';

describe('LogPresensiPage', () => {
  let component: LogPresensiPage;
  let fixture: ComponentFixture<LogPresensiPage>;
  const navControllerSpy = jasmine.createSpyObj('NavController', ['navigateForward', 'navigateRoot']);
  const authSpy = jasmine.createSpyObj('Auth', ['isAuthenticated', 'getUser']);

  beforeEach(async () => {
    authSpy.isAuthenticated.and.returnValue(true);
    authSpy.getUser.and.returnValue(null);

    await TestBed.configureTestingModule({
      imports: [LogPresensiPage],
      providers: [
        { provide: NavController, useValue: navControllerSpy },
        { provide: Auth, useValue: authSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LogPresensiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login when token invalid', () => {
    authSpy.isAuthenticated.and.returnValue(false);

    component.ionViewWillEnter();

    expect(navControllerSpy.navigateRoot).toHaveBeenCalledWith('/login');
  });
});
