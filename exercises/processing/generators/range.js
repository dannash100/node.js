/*
create range state machine by passing range bounds,
further calls to the machine will cause an internal state change
and then yield the current state representation to the caller.
*/

function* range(start = 1, end = 2) {
  do {
    yield start;
  } while (++start <= end);
}

for (const num of range(1, 3)) {
  console.log(num);
}
