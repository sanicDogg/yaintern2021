// 1. Редактор разметки текстов
// Формат ввода
//
// = head
//
// text ((https://ya.ru link)) text.
//
// * item
// * item
//
// Формат вывода
// <h1>head</h1><p>text <a href="https://ya.ru">link</a> text.</p><ul><li>item</li><li>item</li></ul>

let foo = require("./module");

let inputs = [
    `
    * test

    * test 2
    
    `,
    `= head

    text ((https://ya.ru link)) text.

    * item
    * item
    `,
    `text 'abc'  `,
    `abc ((https://google.com Google))((https://youtube.com Youtube))`,
    `=text but not header`,
    `* line1
     *line2`];

let results = [
    `<ul><li>test</li></ul><ul><li>test 2</li></ul>`,
    `<h1>head</h1><p>text <a href="https://ya.ru">link</a> text.</p><ul><li>item</li><li>item</li></ul>`,
    `<p>text "abc"</p>`,
    `<p>abc <a href="https://google.com">Google</a><a href="https://youtube.com">Youtube</a></p>`,
    `<p>=text but not header</p>`,
    `<p>* line1</p><p>*line2</p>`];

inputs.forEach((input, i) => {
    let result = results[i];
    console.log("TEST #" + i);
    console.log("input")
    console.log(input)
    if (foo(input) === result) console.log("OK")
    else {
        console.log("Your result")
        console.log(foo(input))
        console.log("Expected result")
        console.log(result)
    }
})