module.exports = async function(input) {

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