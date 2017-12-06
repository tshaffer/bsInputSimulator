console.log("Hello world!");

let buttonPanelType : string = '';
let buttonPanelIndex : number = 0;
let buttonNumber : number = 0;

// udp parameter

let inputEvent : any = {};
let message : string = '';

document.addEventListener('keydown', (event) => {

  const keyName = event.key;

  console.log('keyName: ', keyName);

  if (keyName === 'Control' || keyName === 'Shift') {
    return;
  }
  else if (keyName === 'Enter') {

    if (inputEvent.command !== 'unknown') {
      const command : string = JSON.stringify(inputEvent);
      console.log('send command: ', command);
  
      const request = new Request(
        'http://localhost:3000/?command=' + command,
        {
          method: 'GET',
          mode: 'no-cors'
        });
      
      fetch(request);
    }  
    message = '';
  }
  else {
    message = message.concat(keyName);
    inputEvent = parseInput(message);
    // console.log('inputEvent: ', inputEvent);
  }
}, false);

function parseInput(message : string) : any {

  console.log('parse string: ', message);

  switch (message.charAt(0)) {
    case 'b': {
      return parseBpEvent(message);
    }
    case 'u': {
      return parseUdpEvent(message);
    }
    default: {
      return {
        command: 'unknown'
      };
    }
  }
}

function parseBpEvent(message : string) : any {

// bp parameters
// b -> bp900A
// bb -> bp900B
// ba -> bp200A
// bab -> bp200B
// etc.

  if (message.length > 1) {
    switch (message.charAt(1)) {
      default: {
        return buildBpEvent('bp900', 0, getButtonNumber(message, 1));
      }
      case 'b': {
        // bp900B
        buttonNumber = message.length > 2 ? getButtonNumber(message, 2) : -1;
        return buildBpEvent('bp900', 1, buttonNumber);
      }
      case 'c': {
        // bp900C
        buttonNumber = message.length > 2 ? getButtonNumber(message, 2) : -1;
        return buildBpEvent('bp900', 2, buttonNumber);
      }
      case 'd': {
        // bp900D
        buttonNumber = message.length > 2 ? getButtonNumber(message, 2) : -1;
        return buildBpEvent('bp900', 3, buttonNumber);
      }
      case 'a': {
        // bp200
        buttonPanelType = 'bp200';
        if (message.length > 2) {
          switch (message.charAt(2)) {
            default: {
              return buildBpEvent('bp200', 0, getButtonNumber(message, 2));
            }
            case 'b': {
              buttonNumber = message.length > 3 ? getButtonNumber(message, 3) : -1;
              return buildBpEvent('bp200', 1, buttonNumber);
            }
            case 'c': {
              buttonNumber = message.length > 3 ? getButtonNumber(message, 3) : -1;
              return buildBpEvent('bp200', 2, buttonNumber);
            }
            case 'd': {
              buttonNumber = message.length > 3 ? getButtonNumber(message, 3) : -1;
              return buildBpEvent('bp200', 3, buttonNumber);         
            }
          }
        }
        break;
      }
    }
  }
}

function buildBpEvent(buttonPanelType: string, buttonPanelIndex: number, buttonNumber: number) : any {
  return {
    command: 'bp',
    parameters: {
      buttonPanelType,
      buttonPanelIndex,
      buttonNumber
    }
  };
}

function getButtonNumber(str : string, charIndex : number) : number {
  const charAtIndex = str.charAt(charIndex);
  return Number(charAtIndex);
}

function parseUdpEvent(message : string) : any {
  if (message.length > 1) {
    return {
      command: 'udp',
      parameters: {
        command: message.substr(1)
      }
    }
  }
  else {
    return {
      command: 'unknown'
    };
  }
}

