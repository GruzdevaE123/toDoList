(function() {
    const TO_DO_LIST = document.getElementById("to-do-list");
    const FORM = document.getElementById("to-do-form");
    const INPUT = document.getElementById("to-do-input");

  
    const COLORS = [
        "#ef6e69",
        "#f279a2",
        "#9170cb",
        "#5eb3f6",
        "#67d7e5",
        "#ffe083"
    ];
    let curentColor='';
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

    function createNewCase(color,text) {
        let newCase = document.createElement("div");
        newCase.className = "case";
        let caseColor = color ===''?COLORS[getRandomInt(COLORS.length)]:color;
        newCase.style.background = caseColor
        TO_DO_LIST.append(newCase);
        newCase.prepend(createCheckBox(caseColor))
        let caseText = document.createElement('div')
        caseText.innerHTML = text
        newCase.append(caseText);
        curentColor = caseColor
        return newCase;
    }
    async function createTodo(todoText, todoColor) {
        
        let response = await fetch("/api/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({
            text: todoText,
            color: todoColor
          })
        });

        let todo = await response.json();
        todo.text = todoText;
        todo.color = todoColor;
        

      }
    FORM.onsubmit = () => {
        if (INPUT.value) {
            createNewCase(curentColor,INPUT.value);
            createTodo(INPUT.value,curentColor)
            INPUT.value = "";
            curentColor =''
        }
        return false;
    };
    (async function getTodos() {
        
        let response = await fetch("/api/todos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        });
        
        let todos = await response.json();
        todos.forEach(element => createNewCase(element.color,element.text))
      })()
})()
