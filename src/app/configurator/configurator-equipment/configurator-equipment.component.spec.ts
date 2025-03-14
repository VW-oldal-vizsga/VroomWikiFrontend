import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorEquipmentComponent } from './configurator-equipment.component';

describe('ConfiguratorEquipmentComponent', () => {
  let component: ConfiguratorEquipmentComponent;
  let fixture: ComponentFixture<ConfiguratorEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguratorEquipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguratorEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
