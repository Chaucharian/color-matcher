const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

const colors = ['azul', 'rojo', 'verde', 'amarillo', 'negro', 'blanco', 'naranja','violeta'];//, 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'es-Es';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
let isRecording = false;

recognition.onend = () => isRecording = false;
recognition.onstart = () => isRecording = true;

recognition.onresult = (event) => {
  const color = event.results[0][0].transcript.split(" ")[event.results[0][0].transcript.split(" ").length - 1].toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  paintScreen(isAnyColor(color));
}
const isAnyColor = color => {
  let outputColor = '';
  switch (color) {
    case 'rojo':
      outputColor = 'red';
      break;
    case 'azul':
      outputColor = 'blue';
      break;
    case 'amarillo':
      outputColor = '#ffdf00';
      break;
    case 'naranja':
      outputColor = '#ff5e00';
      break;
    case 'verde':
      outputColor = 'green';
      break;
    case 'negro':
      outputColor = 'black';
      break;
    case 'marron':
      outputColor = 'brown';
      break;
    case 'violeta':
      outputColor = '#a30dd4';
      break;
    case 'celeste':
      outputColor = '#20c1c1';
      break;
    case 'blanco':
      outputColor = 'white';
      break;
  }
  document.getElementById('speech').innerText = color;
  return outputColor;
}

const paintScreen = color => {
  const body = document.getElementsByTagName('body')[0];
  if (color === 'white') {
    document.getElementsByTagName('h1')[0].style.color = 'black';
    document.getElementById('speech').style.color = 'black';
  } else if (color === 'black') {
    document.getElementsByTagName('h1')[0].style.color = 'white';
    document.getElementById('speech').style.color = 'white';
  } 
  body.style.backgroundColor = color;
}

const button = document.getElementsByTagName('button')[0];

const startRecording = () => {
  button.style.border = '2px solid red';
  document.getElementsByClassName('fa-microphone')[0].style.color = 'red';
  if(!isRecording) {
    recognition.start();
  }
};
const stopRecording = () => {
  button.style.border = '2px solid white';
  document.getElementsByClassName('fa-microphone')[0].style.color = 'white';
  recognition.stop();
};

button.addEventListener('mousedown', () => startRecording(), false);
button.addEventListener('mouseup', () => stopRecording(), false);
button.addEventListener('touchstart', () => startRecording(), false);
button.addEventListener('touchend', () => stopRecording(), false);
