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
      notMatch = false;
      break;
    case 'azul':
      outputColor = 'blue';
      notMatch = false;
      break;
    case 'amarillo':
      outputColor = '#ffdf00';
      notMatch = false;
      break;
    case 'naranja':
      outputColor = '#ff5e00';
      notMatch = false;
      break;
    case 'verde':
      outputColor = 'green';
      notMatch = false;
      break;
    case 'negro':
      outputColor = 'black';
      notMatch = false;
      break;
    case 'marron':
      outputColor = 'brown';
      notMatch = false;
      break;
    case 'violetta':
      outputColor = '#a30dd4';
      notMatch = false;
      break;
    case 'celeste':
      outputColor = '#20c1c1';
      notMatch = false;
      break;
    case 'blanco':
      outputColor = 'white';
      notMatch = false;
      break;
    case 'rosa':
      outputColor = '#fb96a8';
      notMatch = false;
      break;
    case 'bordo':
      outputColor = '#960335';
      notMatch = false;
      break;
    case 'gris':
      outputColor = 'grey';
      notMatch = false;
      break;
    default:
      notMatch = true;
      break;
  }
  document.getElementById('speech').innerText = notMatch ? 'Ese no es un color' : color;
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
