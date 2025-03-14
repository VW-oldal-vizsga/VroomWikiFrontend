import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorReadyToBuyComponent } from './configurator-ready-to-buy.component';

describe('ConfiguratorReadyToBuyComponent', () => {
  let component: ConfiguratorReadyToBuyComponent;
  let fixture: ComponentFixture<ConfiguratorReadyToBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguratorReadyToBuyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguratorReadyToBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
