import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPreguntaComponent } from './card-pregunta.component';

describe('CardPreguntaComponent', () => {
  let component: CardPreguntaComponent;
  let fixture: ComponentFixture<CardPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPreguntaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
