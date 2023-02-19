
const mainDiv = document.getElementById('main') as HTMLDivElement;

// @ts-ignore
main(annyang);

function main(annyang: any) {
  const microphoneToggle = document.createElement('button');
  microphoneToggle.textContent = 'Start/Pause';
  microphoneToggle.onclick = _ => {
    toggleMicrophone();
  }
  mainDiv.appendChild(microphoneToggle);

  let microphoneIsOn = false;
  function toggleMicrophone() {
    if (microphoneIsOn) {
      annyang.abort();
      microphoneToggle.style.background = 'limegreen'
    } else {
      annyang.start();
      microphoneToggle.style.background = 'salmon'
    }
    microphoneIsOn = !microphoneIsOn;
  }
  const commands = {
    'show me *query': showImage,
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening.
  toggleMicrophone();
  console.log('annyang loaded');


  

}

function showImage(query: string) {
  const url = `https://www.google.com/search?q=${query}&tbm=isch`
  const iframe = document.createElement('iframe');
  iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(url);
  mainDiv.appendChild(iframe);

}