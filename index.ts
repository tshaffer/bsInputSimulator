console.log("Hello world!");

let currentCommand : string = '';

// bp parameters
// b -> bp900A
// bb -> bp900B
// ba -> bp200A
// bab -> bp200B
// etc.

let buttonPanelType : string = '';
let buttonPanelIndex : number = 0;
let buttonNumber : number = 0;

// udp parameter

let inputEvent : any = {};
let message : string = '';

document.addEventListener('keydown', (event) => {

  const keyName = event.key;

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
  switch (message.charAt(0)) {
    default: {
      return {
        command: 'unknown'
      };
    }
    case 'b': {
      // buttonPanel event
      if (message.length > 1) {
        switch (message.charAt(1)) {
          default: {
            // bp900a
            buttonPanelType = 'bp900';
            buttonPanelIndex = 0;
            buttonNumber = getButtonNumber(message, 1);

            return {
              command: 'bp',
              parameters: {
                buttonPanelType,
                buttonPanelIndex,
                buttonNumber
              }
            };
          }
          case 'b': {
            // bp900B
            buttonPanelType = 'bp900';
            buttonPanelIndex = 1;

            buttonNumber = -1;
            if (message.length > 2) {
              buttonNumber = getButtonNumber(message, 2);
            }
            return {
              command: 'bp',
              parameters: {
                buttonPanelType,
                buttonPanelIndex,
                buttonNumber
              }
            };
          }
          case 'c': {
            // bp900C
            buttonPanelType = 'bp900';
            buttonPanelIndex = 2;
            buttonNumber = -1;
            if (message.length > 2) {
              buttonNumber = getButtonNumber(message, 2);
            }
            return {
              command: 'bp',
              parameters: {
                buttonPanelType,
                buttonPanelIndex,
                buttonNumber
              }
            };
          }
          case 'd': {
            // bp900D
            buttonPanelType = 'bp900';
            buttonPanelIndex = 3;
            buttonNumber = -1;
            if (message.length > 2) {
              buttonNumber = getButtonNumber(message, 2);
            }
            return {
              command: 'bp',
              parameters: {
                buttonPanelType,
                buttonPanelIndex,
                buttonNumber
              }
            };
          }
          case 'a': {
            // bp200
            buttonPanelType = 'bp200';
            break;
          }
        }
      }
    }
  }
}

function getButtonNumber(str : string, charIndex : number) : number {
  const charAtIndex = str.charAt(charIndex);
  return Number(charAtIndex);
}
