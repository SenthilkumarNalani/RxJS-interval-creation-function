import { interval, Observable, Subscriber } from 'rxjs';

// The 'interval' creation function is similar to 'timer'. This time it's about intervals, not a single timeout. You can compare its behavior to the 'setInterval' function.
// Once again, it's a Cold Observable, so each new Subscription will produce its own new interval instance.
// Note: interval function never completes, we have to end the subscription using unsubscribe method.

// Example 1: interval - creation function or creation operator

// Output:
// App started
// 0
// 1
// 2
// 3
// 4
// Unsubscribe

// console.log('App started');

// const subscription = interval(1000).subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log('Complete'),
// });

// setTimeout(() => {
//   subscription.unsubscribe();
//   console.log('Unsubscribe');
//   // Just for note
//   // (subscription as Subscriber<number>).complete();
// }, 5000);

// Example 2: interval - polyfill or mimic or custom creation function
// Output:
// App started
// Interval!
// 0
// Interval!
// 1
// Interval!
// 2
// Interval!
// 3
// Interval!
// 4
// Unsubscribe
console.log('App started');

const interval$ = new Observable((subscriber) => {
  let counter = 0;
  const intervalId = setInterval(() => {
    console.log('Interval!');
    subscriber.next(counter++);
  }, 1000);

  return () => clearInterval(intervalId);
});

const subscription = interval$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('Complete'),
});

setTimeout(() => {
  subscription.unsubscribe();
  console.log('Unsubscribe');
}, 5000);
