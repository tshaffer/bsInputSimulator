console.log("Hello world!");
console.log(document);

document.addEventListener('keydown', (event) => {
 const keyName = event.key;

 if (keyName === 'Control') {
   // do not alert when only Control key is pressed.
   return;
 }

 if (event.ctrlKey) {
   // Even though event.key is not 'Control' (i.e. 'a' is pressed),
   // event.ctrlKey may be true if Ctrl key is pressed at the time.
   alert(`Combination of ctrlKey + ${keyName}`);
 } else {
   alert(`Key pressed ${keyName}`);
 }
}, false);
