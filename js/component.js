const audioFile = ["../assets/music/ChillSunset.mp3", "../assets/music/hiphopLofi.mp3", "../assets/music/SkyLofi.mp3"];
var audioElement = new Audio(audioFile[0])

const ScreenLofi = () =>{
    return (
        <img src="../assets/lofi_background.jpg" alt="background" id="background"/>
    )
}

const VolumeBar = () => {
    const [volume, setVolume] = React.useState(50);

    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        setVolume(newVolume);
        audioElement.volume = newVolume / 100; // Assurez-vous que le volume est compris entre 0 et 1
    };

    return (
        <div className="volume-bar">
            <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} />
        </div>
    );
};

       

const PlayComponent = () => {
    const [switchButton, setSwitchButton] = React.useState(1);
    const ImageControler = ["../assets/pause-button-svgrepo-com.svg", "../assets/play-button-svgrepo-com.svg"]
    const handleClick = () => {
        if (switchButton === 0) {
            setSwitchButton(1);
            audioElement.pause()
        } else {
            setSwitchButton(0);
            audioElement.play()
        }
    };

    return (
        <button onClick={handleClick} class="controller">
            <img src={ImageControler[switchButton]} alt="play-pause"/>
        </button>
    );
}

const RewindController = () => {
    return (
        <button class="controller">
            <img src="../assets/rewind.svg" alt="rewind-button" />
        </button>
    )
}

const SkipController = () => {
    return (
        <button class="controller">
            <img src="../assets/skip.svg" alt="rewind-button" />
        </button>
    )
}
const MusicPlayerControlerInterface = () =>{
    return (
        <div id="interface-controler">
            <RewindController />
            <VolumeBar />
            <PlayComponent />
            <SkipController />
        </div>
    )
}
const LofiAppMainInterface = () =>{
    return (
        <div id="main-interface">
        <ScreenLofi />
        <MusicPlayerControlerInterface />
        </div>
    )
}

ReactDOM.render(<LofiAppMainInterface />, document.getElementById("app"));