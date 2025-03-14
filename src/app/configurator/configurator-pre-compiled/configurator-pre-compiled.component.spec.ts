import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorPreCompiledComponent } from './configurator-pre-compiled.component';

describe('ConfiguratorPreCompiledComponent', () => {
  let component: ConfiguratorPreCompiledComponent;
  let fixture: ComponentFixture<ConfiguratorPreCompiledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguratorPreCompiledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguratorPreCompiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
