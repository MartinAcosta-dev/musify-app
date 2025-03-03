import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumEditComponent } from './album-edit.component';

describe('AlbumEditComponent', () => {
  let component: AlbumEditComponent;
  let fixture: ComponentFixture<AlbumEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumEditComponent]
    });
    fixture = TestBed.createComponent(AlbumEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
