let aiapi = "No6vqxbocCYO";
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let finalTranscript = '';
   
    let recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
            document.getElementById("show").innerHTML = "Me: "+ transcript;
          console.log(transcript);
          async function fetchText() {
          let response = await fetch('https://api.pgamerx.com/v4/ai?message='+transcript, {
            method: "GET",
            headers: {"x-api-key": aiapi}
          });
          let data = await response.text();          
          let voiceout = JSON.parse(data);
          console.log(voiceout[0]);
          document.getElementById("show").innerHTML = "Robot: "+ voiceout[0].message;
         responsiveVoice.speak(voiceout[0].message, "UK English Female");
}
fetchText();
         
      }
    } 
}
    
    function startButton(event) {
    recognition.start();
  
}
 recognition.start();