(function() {
    const TO_DO_LIST = document.getElementById("to-do-list");
    const FORM = document.getElementById("to-do-form");
    const INPUT = document.getElementById("to-do-input");

    let curentColor;
    const COLORS = [
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
            curentColor = color;
        });
        return colorBox;
    }
    COLORS.map(element => createColorBox(element)).forEach(el => document.getElementsByClassName("color-box-container")[0].append(el));

    function createCheckBox(color) {
        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.addEventListener('change', () => {
            checkBox.checked ?
                (checkBox.parentNode.style.background = "gray") :
                (checkBox.parentNode.style.background = color)
        })
        return checkBox
    }

    function createNewCase(text) {
        let newCase = document.createElement("div");
        newCase.className = "case";
        let caseColor = curentColor === undefined || "" ?
            COLORS[getRandomInt(COLORS.length)] :
            curentColor;
        newCase.style.background = caseColor
        TO_DO_LIST.append(newCase);
        newCase.prepend(createCheckBox(caseColor))
        let caseText = document.createElement('div')
        caseText.innerHTML = text
        newCase.append(caseText);
        curentColor = COLORS[getRandomInt(COLORS.length)]
        return newCase;
    }

    FORM.onsubmit = () => {
        if (INPUT.value) {
            createNewCase(INPUT.value);
            INPUT.value = "";
        }
        return false;
    };
})()