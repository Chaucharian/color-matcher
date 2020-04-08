 let recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = () => {
    paintScreen('black');
  }
  recognition.onstart = () => console.log(" END! ");

  recognition.onresult = (event) => {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      const statement = event.results[i][0].transcript;
      paintScreen(isAnyColor(statement));
    }
  }
  const isAnyColor = incommingStatement => {
    let currentColor = '';
    const normalizedStatement = incommingStatement.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const statement = normalizedStatement.split(" ")[normalizedStatement.split(" ").length-1];
    if (statement.includes('rojo')) {
      currentColor = 'red';
    } else if (statement.includes('azul')) {
      currentColor = 'blue'
    } else if (statement.includes('amarillo')) {
      currentColor = "yellow"
    }  else if (statement.includes('verde')) {
      currentColor = "green"
    } else if (statement.includes('negro')) {
      currentColor = "black"
    } else if (statement.includes('marron')) {
      currentColor = "brown"
    } else if (statement.includes('naranja')) {
      currentColor = "orange"
    } else if (statement.includes('violeta')) {
      currentColor = "violet"
    } else if (statement.includes('blanco')) {
      currentColor = "white"
    }
    console.log(statement," result ",currentColor);
    return currentColor;
  }

  const paintScreen = color => {
    const body = document.getElementsByTagName('body')[0];
    if(color === 'white') {
      document.getElementsByTagName('h1')[0].style.color = 'black';
    } else if(color === 'black') {
      document.getElementsByTagName('h1')[0].style.color = 'white';
    }
    body.style.backgroundColor = color;
  }

  recognition.start();
