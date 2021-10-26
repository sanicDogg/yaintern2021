
module.exports =
    function (participants, sports) {
        /**
         * Подобно оператору new создает экземпляр объекта,
         * используя функцию-конструктор и параметры для нее
         */
        function constructFrom(fnConstructor, ...params) {
            const res = {};

            fnConstructor.bind(res).call(params);

            Object.setPrototypeOf(res, fnConstructor.prototype);

            return fnConstructor.apply(res, params) || res;
        }

        /**
         * Создает пары вида [’вид спорта’, ’имя участника’],
         * где первому виду спорта соответствует последний участник
         */
        function assignParicipants() {
            console.log("here in function 1");
            const participants = this.participants.participants;
            console.log(this)
            console.log("here in function 2", participants)
            const sports = this.participants.sports;
            console.log("here in function 3", sports)
            const orderIndexes = [];
            console.log("here in function 4")

            for (let i = sports.length - 1; i > -1; i--) {
                console.log("here in cycle #" ,i)
                orderIndexes.push(i);
            }
            console.log("here in function 5")

            return orderIndexes.map(
                (getSportIndex, i) => [sports[i], participants[getSportIndex]]
            );
        }

        function Contest(participants, sports) {
            this.participants = participants;
            this.sports = sports;
        }

        Contest.prototype.assignParicipants = assignParicipants;

        const contest = constructFrom(Contest, participants, sports);
        console.log(contest.assignParicipants);

        return contest.assignParicipants();
    }