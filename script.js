function app() {
    let toDoList = document.getElementById("to-do-list");
    let form = document.getElementById("to-do-form");
    let input = document.getElementById("to-do-input");

    let newCaseObj = {};
    let colors = [
        "#ef6e69",
        "#f279a2",
        "#9170cb",
        "#5eb3f6",
        "#67d7e5",
        "#ffe083"
    ];

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function createColorBox(color) {
        let colorBox = document.createElement("input");
        colorBox.type = 'button'
        colorBox.className = "color-box";
        colorBox.style.background = color;
        colorBox.addEventListener("click", () => {
            newCaseObj.color = color;
        });
        return colorBox;
    }
    let colorBoxes = colors.map(element => createColorBox(element));
    colorBoxes.forEach(el => document.getElementsByClassName("color-box-container")[0].append(el));

    function createCheckBox(color) {
        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.addEventListener('change', () =>
            checkBox.checked ?
            (checkBox.parentNode.style.background = "gray") :
            (checkBox.parentNode.style.background = color))
        return checkBox
    }

    function createNewCase(obj) {
        let newCase = document.createElement("div");
        newCase.className = "case";
        let caseColor = obj.color === undefined || "" ?
            colors[getRandomInt(colors.length)] :
            obj.color;
        newCase.style.background = caseColor
        toDoList.append(newCase);
        newCase.prepend(createCheckBox(caseColor))
        let caseText = document.createElement('div')
        caseText.innerHTML = obj.caseName
        newCase.append(caseText);
        obj.caseName = "";
        obj.color = colors[getRandomInt(colors.length)]
        return newCase;
    }

    form.onsubmit = () => {
        if (input.value) {
            newCaseObj.caseName = input.value;
            input.value = "";
            createNewCase(newCaseObj);
        }
        return false;
    };
}
app();