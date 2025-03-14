import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorDriveToComponent } from './configurator-drive-to.component';

describe('ConfiguratorDriveToComponent', () => {
  let component: ConfiguratorDriveToComponent;
  let fixture: ComponentFixture<ConfiguratorDriveToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguratorDriveToComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguratorDriveToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
