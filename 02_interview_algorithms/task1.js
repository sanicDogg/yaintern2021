/*
  Задание: есть переменная hubs, которая хранит информацию о гостях сайта.
  Требуется написать функцию exec, которая будет собирать общую статистику
  по каждому браузеру, проходя по всем хабам и суммируя поля active и total.
  Пример вывода программы находится в переменной res.
 */

var hubs = [
    {
        host: 'hub01',
        browserName: 'firefox',
        active: 3,
        total: 10
    },
    {
        host: 'hub02',
        browserName: 'chrome',
        active: 2,
        total: 5
    },
    {
        host: 'hub03',
        browserName: 'firefox',
        active: 0,
        total: 10
    }
];

const res = {
    firefox: {
        active: 3,
        total: 20
    },
    chrome: {
        active: 2,
        total: 5
    }
};

console.log(
    exec(hubs)
)

function exec(objects) {
    let map = new Map();
    let res = {};

    for (const o of objects) {
        if (map.has(o.browserName)) {
            let value = map.get(o.browserName);
            let {active, total} = value;
            active += o.active;
            total += o.total;
            map.set(o.browserName, {active, total})
        } else {
            map.set(o.browserName, {active: o.active, total: o.total})
        }
    }

    for (const [key, value] of map) {
        res[key] = value;
    }

    return res;
}

