module.exports = (str) => {
    let isUlOpened = false;
    return str
        .split("\n")
        // .filter(item => item !== '')
        .map((unTrimmed, i, lines) => {
            let element = trimLine(unTrimmed);
            let slicedElement = element.slice(0, 2);
            switch (slicedElement) {
                case "= ":
                    return `<h1>${element.slice(2)}</h1>`;
                case "":
                    let nextLine = lines[i + 1] ? trimLine(lines[i + 1]) : "";
                    let prevLine = lines[i - 1] ? trimLine(lines[i - 1]) : "";
                    if (nextLine.startsWith("* ") && prevLine.startsWith("* "))
                        return "</ul><ul>";
                    if (nextLine.startsWith("* ") ) {
                        isUlOpened = true;
                        return "<ul>";
                    }
                    else if (prevLine.startsWith("* ")) {
                        isUlOpened = false;
                        return "</ul>";
                    } else return "";
                case "* ":
                    if (isUlOpened)
                        return `<li>${element.slice(2)}</li>`;
                    else return getText(element);
                default:
                    return getText(element);
            }
        }).join("")

    function trimLine(l) {
        return l.trim().replace(/\B'|'\B/g, "\"");
    }

    function getText(e) {
        while (true) {
            let openBrackets = e.indexOf("((");
            let closeBrackets = e.indexOf("))");

            if (openBrackets === -1 || closeBrackets === -1) break;

            let fullLink = e.substring(openBrackets + 2, closeBrackets);
            let address = fullLink.substring(0, fullLink.indexOf(" "));
            let linkText = fullLink.substring(fullLink.indexOf(" ") + 1, fullLink.length);

            let finalLink = `<a href="${address}">${linkText}</a>`;

            e = e.replace(e.substring(openBrackets, closeBrackets + 2), finalLink);
        }

        return `<p>${e}</p>`;

    }
};