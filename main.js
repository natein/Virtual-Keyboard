const EN = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
  "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del",
  "Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
  "Shift", "\\", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "&uarr;", "Shift",
  "Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "&larr;", "&darr;", "&rarr;"];  
  
const EN_SHIFT = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace",
  "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "Del",
  "Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "Enter",
  "Shift", "\\", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "&uarr;", "Shift",
  "Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "&larr;", "&darr;", "&rarr;"];
        
const RUS = ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
  "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Del",
  "Caps Lock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter",
  "Shift", "\\", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "/", "&uarr;", "Shift",
  "Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "&larr;", "&darr;", "&rarr;"];        
        
 const RUS_SHIFT = ["Ё", "!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace",
  "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", "Del",
  "Caps Lock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter",
  "Shift", "\\", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "/", "&uarr;", "Shift",
  "Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "&larr;", "&darr;", "&rarr;"];
  
const KEY_CODES = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", 
  "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete", 
  "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter", 
  "ShiftLeft", "IntlBackslash", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight", 
  "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"]; 
  
const CLASSES = ["", "", "", "", "", "", "", "", "", "", "", "", "", "long last", 
  "", "", "", "", "", "", "", "", "", "", "", "", "", "", "last", 
  "long", "", "", "", "", "", "", "", "", "", "", "", "long last", 
  "long", "", "", "", "", "", "", "", "", "", "", "", "", "last", 
  "long", "", "", "verylong", "", "long", "", "", "last"];
  
window.onload = () => {
  const keyboard = new Keyboard();
  keyboard.generateKeyboard();
  keyboard.addListeners();
};
  
class Keyboard {
  constructor() {     
    this.shiftState = false;
    this.capsState = false;
    this.lang = localStorage.getItem("cur_language");
  }

  generateKeyboard() {
    const BODY = document.querySelector("body");
    this.input = document.createElement("textarea");
    BODY.appendChild(this.input);
    this.kbd = document.createElement("DIV");
    this.kbd.classList.add("keyboard");
    for(let i = 0; i < CLASSES.length; i++) {
      this.btn = document.createElement("DIV");
      if(CLASSES[i] != "") {
        let cls = CLASSES[i].split(" ");
        for(let j = 0; j < cls.length; j++) this.btn.classList.add(cls[j]);
      }  
      this.span = document.createElement("span");
      this.span.innerHTML = this.getCurrentKey(i);
      this.span.dataset.code = KEY_CODES[i];
      this.btn.appendChild(this.span);
      this.kbd.appendChild(this.btn);
    }
    BODY.appendChild(this.kbd);
    this.notice = document.createElement("p");
    this.notice.innerText = "Toggle language: Left Ctrl + Left Shift. Designed for Windows";
    BODY.appendChild(this.notice);
  }
  
  getCurrentKey(i) {
    if(this.shiftState == true || this.capsState == true) {
      if(this.lang == 'en') return EN_SHIFT[i];
      else return RUS_SHIFT[i];
    }
    else {
      if(this.lang == 'en') return EN[i];
      else return RUS[i];     
    }    
  }
  
  changeKeyboardLayout() {
    let spans = document.querySelectorAll("span");    
    for(let i = 0; i < spans.length; i++){
      spans[i].innerHTML = this.getCurrentKey(i);
    } 
  }  
  
  addListeners() {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mouseup', this.onMouseUp);
  } 
  
  onKeyDown(evt) {
    if(evt.code != "F12" && evt.code != "F5") evt.preventDefault();
    let btn = document.querySelector('span[data-code="' + evt.code + '"]');
    if(btn == null) return;
    else btn.parentElement.classList.add('pushed');
    let input = document.querySelector("textarea");
    switch(evt.key) {
      case "Backspace":
        input.innerHTML = input.innerHTML.slice(0, -1); break;
      case 'Tab':
        input.innerHTML = input.innerHTML + '    '; break;
      default:
        input.innerHTML = input.innerHTML + evt.key;      
    }
  }
  
  onKeyUp(evt) {
    if(evt.code != "F12" && evt.code != "F5") evt.preventDefault();
    let btn = document.querySelector('span[data-code="' + evt.code + '"]');
    if(btn == null) return;
    else btn.parentElement.classList.remove("pushed");
    if ((evt.code == "ShiftLeft" && evt.ctrlKey) || (evt.shiftKey && evt.code === "ControlLeft")) {
      if(this.lang == "rus") this.lang = "en";
      else this.lang = "rus";            
      localStorage.setItem("cur_language", this.lang);
      this.changeKeyboardLayout();
    }     
  }
}