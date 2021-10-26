/*
   4. Последний общий коммит веток git
   Необходимо написать функцию, которая на вход получает информацию о коммитах и
   массив из двух имён веток, а на выход отдаёт сообщение их последнего общего коммита.

   Структура коммита
   // ? - необязательные поля (могут отсутствовать в объекте)
   interface Commit {
       id: string; // уникальный идентификатор коммита
       timestamp: number; // время создания в миллисекундах
       parents?: string[]; // массив id родительских коммитов
       message?: string; // сообщение коммита
       branches?: string[]; // массив имён веток
   }
 */


let {getLastCommonCommitMessage} = require("./module");

let inputs =
    [
        [[

                {id:"0",timestamp:1625055166427,message:"initial commit"},
                {id:"1",timestamp:1625055166428,message:"add layout",parents:["0"]},
                {id:"2",timestamp:1625055166429,message:"fix bugs",branches:["master","bugfix"],parents:["1"]},
                {id:"3",timestamp:1625055166430,message:"add link",branches:["bugfix","feature/link"],parents:["1"]}
        ]
            , ["bugfix","feature/link"]
        ],[
            [
            {
                id: '1',
                message: 'initial commit',
                timestamp: 1624010073113,
                branches: ["master"]
            },
            {
                id: '2',
                message: 'add layout',
                timestamp: 1624010073114,
                branches: ["A", "D", "master"],
                parents: ['1']
            },
            {
                id: '3',
                message: 'add title',
                timestamp: 1624010073115,
                branches: ["B", "E", "master"],
                parents: ['1']
            },
            {
                id: '4',
                message: 'add header',
                timestamp: 1624010073116,
                branches: ["C", "F", "master"],
                parents: ['1']
            },
            {
                id: '5',
                message: 'merge branch D into E',
                timestamp: 1624010073117,
                branches: ["E"],
                parents: ['2', '3']
            },
            {
                id: '6',
                message: 'merge branch E into F',
                timestamp: 1624010073119,
                branches: ["F"],
                parents: ['4', '5']
            },
            {
                id: '7',
                message: 'merge branch B into D',
                timestamp: 1624010073120,
                branches: ["D"],
                parents: ['2', '3']
            },
            {
                id: '8',
                message: 'merge branch D into F',
                timestamp: 1624010073121,
                branches: ["F"],
                parents: ['7', '6']
            },
            {
                id: '9',
                message: 'merge branch C into E',
                timestamp: 1624010073122,
                branches: ["E"],
                parents: ['4', '5']
            },
            {
                id: '10',
                message: 'merge branch E into F',
                timestamp: 1624010073123,
                branches: ["F"],
                parents: ['8', '9']
            }
        ], ["D", "E"]
    ],
    [
        [
            {
                id: '1',
                message: 'initial commit',
                timestamp: 1624010073113,
            },
            {
                id: '2',
                parents: ['1'],
                message: 'add layout',
                timestamp: 1624010082219,
            },
            {
                id: '3',
                parents: ['2'],
                message: 'fix bugs',
                timestamp: 1624010109039,
                branches: ['master', 'bugfix']
            },
            {
                id: '4',
                parents: ['2'],
                message: 'add link',
                timestamp: 1624010179662,
                branches: ['feature/link']
            }
        ], ['bugfix', 'feature/link']
    ],
    [
        [{
            id: '2',
            message: 'commit',
            timestamp: 1624010073110,
            branches: ['master'],
        },
        {
            id: '1',
            message: 'initial commit',
            timestamp: 1624010073113,
            branches: ['master'],
        }], ['master', 'master']
    ],
    // [[], ['ghost', 'bla-bla-bla-branch']],
    [[
        {
            id: '1',
            message: 'commit #2',
            timestamp: 1624010073115,
            branches: ['master', 'bugfix'],
        },
        {
            id: '2',
            message: 'commit #1',
            timestamp: 1624010073113,
            branches: ['master', 'bugfix'],
        }
    ], ['master', 'bugfix']],
        [
            [
                {
                    id: '0',
                    branches: ['master'],
                    timestamp: 1624010073113,
                    message: "123"
                },
                {
                    id: '1',
                    branches: ['bugfix', 'master'],
                    timestamp: 1624010073112,
                    parents: ['0', '2'],
                    message: 'commit #1'
                },
                {
                    id: '2',
                    branches: ['bb'],
                    timestamp: 1624010073115,
                    parents: ['0'],
                    message: 'commit #2'
                }
            ], ['bb', 'bugfix']
        ],
]

let expectedOutputs = [
    'add layout',
    'add title',
    'add layout',
    'initial commit',
    // 'Error(\'No common commit\')',
    '',
    '123',
]

inputs.forEach((test, i) => {
    let expectedRes = expectedOutputs[i];

    console.log("TEST #" + i);
    if (getLastCommonCommitMessage(test[0], test[1]) === expectedRes)
        console.log("OK");
    else {
        console.log("WRONG TEST");
        console.log("EXPECTED:");
        console.log(expectedRes);
        console.log("YOUR:");
        console.log(getLastCommonCommitMessage(test[0], test[1]));
    }
})
