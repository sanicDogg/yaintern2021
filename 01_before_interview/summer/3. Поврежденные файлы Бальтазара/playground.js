'use strict';

((global) => {
    const timeout = 20;

    const _async = (fn, cb) => {
        setTimeout(() => {
            cb(fn());
        }, Math.random() * timeout);
    };

    const Folder = function (a = []) {
        if (!new.target) {
            return new Folder(a);
        }

        this.read = (index, cb) => _async(() => a[index], cb);
        this.size = (cb) => _async(() => a.length, cb);
    };

    Object.freeze(Folder);
    global.Folder = Folder;
})(typeof window === 'undefined' ? global : window);

const input = Folder([
    'file',
    'ffffile',
    Folder([
        'file',
    ]),
    Folder([
        'fiiile',
    ]),
    Folder([
        {},
        null,
        'file',
        'ffiillee',
        'ffiillee',
    ]),
    Folder([
        Folder([
            'filllle',
            'file',
            null,
        ]),
        {},
        Folder([])
    ]),
]);

// проверка решения
solution(input).then(result => {
    const answer = ['ffffile', 'ffiillee', 'ffiillee', 'fiiile', 'filllle'];
    const isEqual = String(answer) === String(result);

    console.log("RESULT", result);

    if (isEqual) {
        console.log('OK');
    } else {
        console.log('WRONG');
    }
});

async function solution(input) {
    // ... решение задачи

    let allFiles = await getTree(input);
    console.log("\tДелаем массив из res:\n")
    let arr = allFiles.split(" ");
    let arr2 = arr.filter((item) => item !== "" && item !== "file" && item !== "*")
    console.log(arr);
    console.log("\nУбираем из массива '', *, file:")
    console.log(arr2);
    arr2 = arr2.sort();
    console.log("Сортируем массив...")
    return arr2;

    async function getTree(file) {
        let res = "";

        console.log("Запуск функции getTree...");
        if (file === null || file === undefined|| Object.keys(file).length === 0) {
            console.log("Попался [], {}, undefined...")
            return "*";
        }

        if (typeof file === "object") {

            console.log("Попался object")

            console.log("Перед функцией file.size")
            let getSize = new Promise(resolve => {
                file.size(async (s) => {
                    for (let i = 0; i < s; i++) {
                        console.log("Чтение файла...")
                        let readFile = new Promise(resolve => {
                            file.read(i, function (innerFile) {
                                resolve(getTree(innerFile));
                            });
                        });

                        res += " " + await readFile;

                        console.log("Файл прочитан")
                    }
                    resolve(res);
                });
            });

            res = await getSize;
            console.log("\nres:");
            console.log(res + "\n");
        } else {
            console.log(`Попался обычный файл ${file} , выход из функции getTree`)
            return file;
        }

        return res;
    }
}