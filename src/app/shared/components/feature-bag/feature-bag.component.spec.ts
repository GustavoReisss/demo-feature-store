import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureBagComponent } from './feature-bag.component';

describe('FeatureBagComponent', () => {
  let component: FeatureBagComponent;
  let fixture: ComponentFixture<FeatureBagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureBagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeatureBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
