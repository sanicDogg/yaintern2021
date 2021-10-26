/*
  Задание: создать функцию merge, которая принимает на вход 2 массива.
  Массивы отсортированы по возрастанию.
  Функция merge должна вернуть объединенный отсортированный массив.
  Использовать .sort нельзя.
 */

let inputs = [
    [[1, 2, 3], [2, 7, 8]],
    [[1, 2, 3], [1, 3, 5]],
    [[2, 2, 2], [1, 1]],
    [[1, 1], [1, 1]],
    [[1, 2, 3], [4, 5]]
]

let outputs = [
    [1, 2, 2, 3, 7, 8],
    [1, 1, 2, 3, 3, 5],
    [1, 1, 2, 2, 2],
    [1, 1, 1, 1],
    [1, 2, 3, 4, 5]
]

// Для сравнения двух массивов
const diff = function(a1, a2) {
    return a1.filter(i=>!a2.includes(i))
        .concat(a2.filter(i=>!a1.includes(i)))
}

inputs.forEach((item, i) => {
    if (!diff(merge(item[0], item[1]), outputs[i]).length)
        console.log(`TEST #${i} PASSED`)
    else {
        console.log(`TEST #${i} FAILED`);
        console.log('Expected output:');
        console.log(outputs[i]);
        console.log('Your output:');
        console.log(merge(item[0], item[1]));
    }
})

function merge(arr1, arr2) {
    let res = [];
    let max = (arr1.length + arr2.length);

    for (let i = 0, j = 0; i < max && j < max; i++, j++) {
        let curr1 = arr1[i];
        let curr2 = arr2[j];

        if (curr1 === undefined && curr2 === undefined) {
            continue;
        }

        if (curr1 === undefined) {
            res.push(curr2);
            continue;
        }

        if (curr2 === undefined) {
            res.push(curr1);
            continue;
        }

        if (curr1 > curr2) {
            res.push(curr2);
            i--;
        } else{
            res.push(curr1);
            j--;
        }
    }
    return res;
}
