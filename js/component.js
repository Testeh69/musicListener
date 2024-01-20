const audioFile = ["../assets/music/ChillSunset.mp3", "../assets/music/hiphopLofi.mp3", "../assets/music/SkyLofi.mp3"];//Path to your musics
const lengthAudioFile = audioFile.length
var pointerToArrayMusic = 0;
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
            <p>Son:</p>
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
const MusicListComponent = () =>{
    const [indexMusicList, setIndexMusicList] = React.useState(pointerToArrayMusic);

    React.useEffect(() => {
        console.log("Updated indexMusicList:", indexMusicList);
    }, [indexMusicList]); // To make usteState synchronous

    const handleClick = () => {
        setIndexMusicList((prevIndex) => (prevIndex === 0 ? lengthAudioFile - 1 : prevIndex - 1));
    };


    return (
        <div>
            <RewindController indexMusicList={indexMusicList} setIndexMusicList={setIndexMusicList} />
            <SkipController indexMusicList = {indexMusicList} setIndexMusicList= {setIndexMusicList}/>
        </div>
    )
}



const RewindController = ({ indexMusicList, setIndexMusicList }) => {
    const handleClick = () => {
        if (indexMusicList === 0) {
            setIndexMusicList(lengthAudioFile - 1);
        } else {
            setIndexMusicList(indexMusicList - 1);
        }
    };

    return (
        <button onClick={handleClick} className="controller">
            <img src="../assets/rewind.svg" alt="rewind-button" />
        </button>
    );
};



const SkipController = ({indexMusicList, setIndexMusicList}) => {
    const handleClick = () => {
        if (indexMusicList === lengthAudioFile - 1) {
            setIndexMusicList(0);
        } else {
            setIndexMusicList(indexMusicList + 1);
        }
    };
    return (
        <button onClick = {handleClick}  className="controller">
            <img src="../assets/skip.svg" alt="rewind-button" />
        </button>
    )
}



const MusicPlayerControlerInterface = () =>{
    return (
        <div id="interface-controler">
            <MusicListComponent />
            <VolumeBar />
            <PlayComponent />       
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