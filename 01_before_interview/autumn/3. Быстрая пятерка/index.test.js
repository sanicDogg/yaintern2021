const callbackyWinners = require(".");
const STREET_RACERS = ["Brian", "Mia", "Han", "Gisele", "Dominic"];

async function winners(wait, STREET_RACERS, N) {
  return await new Promise((fulfil) => {
    callbackyWinners(wait, fulfil, STREET_RACERS, N);
  });
}

function pause() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

function createTestRace(sequence) {
  const registeredEventHandlers = {};

  function triggerEvent(eventType, ...args) {
    const subscriptions = [...(registeredEventHandlers[eventType] || [])];
    registeredEventHandlers[eventType] = subscriptions.filter((subscription) => !subscription.options.once);

    for (const { callback } of subscriptions) {
      callback(...args);
    }
  }

  function addEventListener(eventType, callback, options) {
    const subscription = { callback, options };

    registeredEventHandlers[eventType] = registeredEventHandlers[eventType] || [];
    registeredEventHandlers[eventType].push(subscription);
  }

  function wait(streetRacer, checkpoint, callback) {
    addEventListener(`${streetRacer}-${checkpoint}`, callback, { once: true });
  }

  async function run() {
    for (const [streetRacer, checkpoint] of sequence) {
      await pause();
      if (!Number.isNaN(checkpoint)) {
        triggerEvent(`${streetRacer}-${checkpoint}`);
      } else {
        for (let i = 1; i <= 10; i++) {
          triggerEvent(`${streetRacer}-${i}`, "connection lost");
        }
      }
    }
  }

  return { wait, run };
}

test("should work when Mia goes backward", async () => {
  const { wait, run } = createTestRace([
    ["Mia", 1],
    ["Mia", 2],
    ["Mia", 4],
    ["Mia", 3],
    ["Mia", 5],
    ["Mia", 6],
    ["Mia", 7],
    ["Mia", 8],
    ["Mia", 9],
    ["Mia", 10],
    ["Brian", 1],
    ["Brian", 2],
    ["Brian", 4],
    ["Brian", 5],
    ["Brian", 6],
    ["Brian", 7],
    ["Brian", 8],
    ["Brian", 9],
    ["Brian", 10],
    ["Han", 1],
    ["Han", 2],
    ["Han", 3],
    ["Han", 4],
    ["Han", 5],
    ["Han", 6],
    ["Han", 7],
    ["Han", 8],
    ["Han", 9],
    ["Han", 10],
    ["Dominic", 1],
    ["Dominic", 2],
    ["Dominic", 3],
    ["Dominic", 4],
    ["Dominic", 5],
    ["Dominic", 6],
    ["Dominic", 7],
    ["Dominic", 8],
    ["Dominic", 9],
    ["Dominic", 10],
    ["Gisele", 1],
    ["Gisele", 2],
    ["Gisele", 3],
    ["Gisele", 4],
    ["Gisele", 5],
    ["Gisele", 6],
    ["Gisele", 7],
    ["Gisele", 8],
    ["Gisele", 9],
    ["Gisele", 10],
  ]);

  run();
  const racers = await winners(wait, STREET_RACERS, 10);

  expect(racers).toEqual(["Han", "Dominic", "Gisele"]);
});


test("should work when no one cheats", async () => {
  const { wait, run } = createTestRace([
    ["Gisele", 1],
    ["Dominic", 1],
    ["Brian", 1],
    ["Mia", 1],
    ["Han", 1],
    ["Gisele", 2],
    ["Dominic", 2],
    ["Brian", 2],
    ["Mia", 2],
    ["Han", 2],
    ["Gisele", 3],
    ["Dominic", 3],
    ["Brian", 3],
    ["Mia", 3],
    ["Han", 3],
    ["Gisele", 4],
    ["Dominic", 4],
    ["Brian", 4],
    ["Mia", 4],
    ["Han", 4],
    ["Gisele", 5],
    ["Dominic", 5],
    ["Brian", 5],
    ["Mia", 5],
    ["Han", 5],
    ["Gisele", 6],
    ["Dominic", 6],
    ["Brian", 6],
    ["Mia", 6],
    ["Han", 6],
    ["Gisele", 7],
    ["Dominic", 7],
    ["Brian", 7],
    ["Mia", 7],
    ["Han", 7],
    ["Gisele", 8],
    ["Dominic", 8],
    ["Brian", 8],
    ["Mia", 8],
    ["Han", 8],
    ["Gisele", 9],
    ["Dominic", 9],
    ["Brian", 9],
    ["Mia", 9],
    ["Han", 9],
    ["Gisele", 10],
    ["Dominic", 10],
    ["Brian", 10],
    ["Mia", 10],
    ["Han", 10],
  ]);

  run();
  const racers = await winners(wait, STREET_RACERS, 10);

  expect(racers).toEqual(["Gisele", "Dominic", "Brian"]);
});

test("should work when no one cheats #2", async () => {
  const { wait, run } = createTestRace([
    ["Gisele", 1],
    ["Dominic", 1],
    ["Brian", 1],
    ["Mia", 1],
    ["Han", 1],
    ["Gisele", 2],
    ["Dominic", NaN],
    ["Brian", 2],
    ["Mia", 2],
    ["Han", 2],
    ["Gisele", 3],
    ["Dominic", 3],
    ["Brian", 3],
    ["Mia", 3],
    ["Han", 3],
    ["Gisele", 4],
    ["Dominic", 4],
    ["Brian", 4],
    ["Mia", 4],
    ["Han", 4],
    ["Gisele", 5],
    ["Dominic", 5],
    ["Brian", 5],
    ["Mia", 5],
    ["Han", 5],
    ["Gisele", 6],
    ["Dominic", 6],
    ["Brian", 6],
    ["Mia", 6],
    ["Han", 6],
    ["Gisele", 7],
    ["Dominic", 7],
    ["Brian", 7],
    ["Mia", 7],
    ["Han", 7],
    ["Gisele", 8],
    ["Dominic", 8],
    ["Brian", 8],
    ["Mia", 8],
    ["Han", 8],
    ["Gisele", 9],
    ["Dominic", 9],
    ["Brian", 9],
    ["Mia", 9],
    ["Han", 9],
    ["Gisele", 10],
    ["Dominic", 10],
    ["Brian", 10],
    ["Mia", 10],
    ["Han", 10],
  ]);

  run();
  const racers = await winners(wait, STREET_RACERS, 10);

  expect(racers).toEqual(["Gisele", "Brian", "Mia"]);
});


test("should handle connection lost", async () => {
  const { wait, run } = createTestRace([
    ["Brian", 1],
    ["Brian", 2],
    ["Brian", 3],
    ["Brian", 4],
    ["Brian", NaN],
    ["Brian", 5],
    ["Brian", 6],
    ["Brian", 7],
    ["Brian", 8],
    ["Brian", 9],
    ["Brian", 10],
    ["Mia", 1],
    ["Mia", 2],
    ["Mia", 3],
    ["Mia", 4],
    ["Mia", 5],
    ["Mia", 6],
    ["Mia", 7],
    ["Mia", 8],
    ["Mia", 9],
    ["Mia", 10],
    ["Han", 1],
    ["Han", 2],
    ["Han", 3],
    ["Han", 4],
    ["Han", 5],
    ["Han", 6],
    ["Han", 7],
    ["Han", 8],
    ["Han", 9],
    ["Han", 10],
    ["Dominic", 1],
    ["Dominic", 2],
    ["Dominic", 3],
    ["Dominic", 4],
    ["Dominic", 5],
    ["Dominic", 6],
    ["Dominic", 7],
    ["Dominic", 8],
    ["Dominic", 9],
    ["Dominic", 10],
    ["Gisele", 1],
    ["Gisele", 2],
    ["Gisele", 3],
    ["Gisele", 4],
    ["Gisele", 5],
    ["Gisele", 6],
    ["Gisele", 7],
    ["Gisele", 8],
    ["Gisele", 9],
    ["Gisele", 10],
  ]);

  run();
  const racers = await winners(wait, STREET_RACERS, 10);

  expect(racers).toEqual(["Brian", "Mia", "Han"]);
});

test("should work when Brian cheats", async () => {
  const { wait, run } = createTestRace([
    ["Brian", 1],
    ["Brian", 2],
    ["Brian", 5],
    ["Brian", 6],
    ["Brian", NaN],
    ["Brian", 7],
    ["Brian", 8],
    ["Brian", 9],
    ["Brian", 10],
    ["Mia", 1],
    ["Mia", 2],
    ["Mia", 3],
    ["Mia", 4],
    ["Mia", 5],
    ["Mia", 6],
    ["Mia", 7],
    ["Mia", 8],
    ["Mia", 9],
    ["Mia", 10],
    ["Han", 1],
    ["Han", 2],
    ["Han", 3],
    ["Han", 4],
    ["Han", 5],
    ["Han", 6],
    ["Han", 7],
    ["Han", 8],
    ["Han", 9],
    ["Han", 10],
    ["Dominic", 1],
    ["Dominic", 2],
    ["Dominic", 3],
    ["Dominic", 4],
    ["Dominic", 5],
    ["Dominic", 6],
    ["Dominic", 7],
    ["Dominic", 8],
    ["Dominic", 9],
    ["Dominic", 10],
    ["Gisele", 1],
    ["Gisele", 2],
    ["Gisele", 3],
    ["Gisele", 4],
    ["Gisele", 5],
    ["Gisele", 6],
    ["Gisele", 7],
    ["Gisele", 8],
    ["Gisele", 9],
    ["Gisele", 10],
  ]);

  run();
  const racers = await winners(wait, STREET_RACERS, 10);

  expect(racers).toEqual(["Mia", "Han", "Dominic"]);
});

