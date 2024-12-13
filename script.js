let textarea = document.querySelector('.inputBox') ;
let voiceSelect = document.querySelector('[selective]') ;
let button = document.querySelector('.btn') ;
let play = document.querySelector('.play');
let isPaused = false ;
let speech = new SpeechSynthesisUtterance() ;
let voices = [] ;
let index = 0 ;

window.speechSynthesis.onvoiceschanged = ()=>{
    voices = window.speechSynthesis.getVoices() ;
    speech.voice = voices[0] ;
    
    voices.forEach((voices,i)=>{
        voiceSelect.options[i]=new Option(voices.name,i) ;
    })
};

voiceSelect.addEventListener('change',(e)=>{
    speech.voice = voices[voiceSelect.value] ;
})

if(textarea.value==''){
    window.speechSynthesis.cancel() ;
}

button.addEventListener('click', (e) => {
    
    let playSrc = play.src.split('/').pop(); 

    if (playSrc == "play.png") {
        if(isPaused){
            isPaused=false ;
            window.speechSynthesis.resume() ;
            play.src = "./images/pause-solid.png";
        }else{
            isPaused=true ;
            play.src = "./images/pause-solid.png";
            speech.text = textarea.value;
            window.speechSynthesis.speak(speech);
        }
    } else if(playSrc == "pause-solid.png") {
        isPaused=true ;
        window.speechSynthesis.pause();
        play.src = "./images/play.png";
    }

    speech.onend = () => {
        window.speechSynthesis.cancel() ;
        play.src = "./images/play.png";
    };
});


