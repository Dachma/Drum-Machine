import React from "react";
import "./App.css";

const audios = [
  {
    key: "Q",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    key: "W",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    key: "E",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    key: "A",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    key: "S",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    key: "D",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    key: "Z",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    key: "X",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    key: "C",
    sound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const App = () => (
  <div id="drum-machine">
    <div id="display">
      <h1>Play a sound</h1>
      {audios.map((sound, key) => (
        <DrumPad text={sound.key} key={key} audio={sound.sound} />
      ))}
    </div>
  </div>
);

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }
  componentDidMount() {
    this.audio.current.addEventListener("ended", (e) => {
      const parent = e.target.parentNode;
      parent.classList.remove("active");
    });
  }

  playSound = () => {
    this.audio.current.play();
    const id = this.audio.current.id;
    const parent = this.audio.current.parentNode;
    parent.classList.add("active");
    const display = parent.parentNode;
    display.querySelector("h1").innerText = `'${id}' is playing`;
  };

  render() {
    const { text, audio } = this.props;
    return (
      <div className="drum-pad" onClick={this.playSound}>
        {text}
        <audio ref={this.audio} src={audio} className="clip" id={text} />
      </div>
    );
  }
}

document.addEventListener("keydown", (e) => {
  const id = e.key.toUpperCase();
  const audio = document.getElementById(id);

  if (audio) {
    audio.currentTime = 0;
    const parent = audio.parentNode;
    parent.classList.add("active");
    audio.play();
    parent.parentNode.querySelector("h1").innerText = `'${id}' is playing`;
  }
});

export default App;
