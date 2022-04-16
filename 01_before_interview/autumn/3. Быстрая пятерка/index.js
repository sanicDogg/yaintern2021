module.exports = function winners(wait, pushResult, STREET_RACERS, N) {
  // result - массив первой тройки
  let result = [];
  // Объект racers хранит данные в формате:
  // {Участник: пройденная_контрольная_точка}
  let racers = initRacers();

  for (let streetRacer of STREET_RACERS) {
    for (let i = 1; i <= N; i++) {
      wait(streetRacer, i, clb.bind({streetRacer: streetRacer, i: i}));
    }
  }

  function clb(str) {
    let {streetRacer, i} = this;
    if (str === "connection lost") {
      wait(streetRacer, i, clb.bind({streetRacer: streetRacer, i: i}));
      return;
    }
    // Если участник не жульничает
    if (i - racers[streetRacer] === 1) {
      racers[streetRacer] = i;
    } else {

    }
    check();
  }

  function check() {
    for (let racer in racers) {
      if (racers[racer] === N) {
        if (!result.includes(racer))
          result.push(racer)
      }
    }
    if (result.length === 3) {
      console.log("3");
      pushResult(result);
    }
  }

  function initRacers() {
    let r = {};
    for (let streetRacer of STREET_RACERS) {
      r[streetRacer] = 0;
    }

    return r;
  }
}
