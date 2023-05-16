import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeAndSlide = trigger('fadeAndSlide', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'translateY(-50px)',
    })
  ),
  state(
    '*',
    style({
      opacity: 1,
      transform: 'translateY(0)',
    })
  ),
  transition(':enter, :leave', [animate('.5s ease-in-out')]),
]);
