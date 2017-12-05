console.log("Hello world!");
console.log(document);

let message : string = '';

document.addEventListener('keydown', (event) => {

 const keyName = event.key;

 if (keyName === 'Control' || keyName === 'Shift') {
   return;
 }
 else if (keyName === 'Enter') {
   console.log('send message: ' + message);

   const request = new Request(
     'http://localhost:3000/' + message,
     {
       method: 'GET',
       mode: 'no-cors'
     });
   fetch(request)
     .then( (response) => {
       message = '';
     }).catch( (err) => {
      console.log(err);
      message = '';
   });
 }
 else {
   message = message.concat(keyName);
 }
}, false);
