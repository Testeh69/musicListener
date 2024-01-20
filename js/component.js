const audioFile = ["../assets/music/ChillSunset.mp3", "../assets/music/hiphopLofi.mp3", "../assets/music/SkyLofi.mp3"];//Path to your musics
const arrayBackgroundLofi = ["../assets/background/fantasy.jpg", "../assets/background/japonais.jpg", "../assets/background/sci_fi.jpg", "../assets/background/winter.jpg","../assets/background/lofi_background.jpg"]
const lengthArrayBackgroundLofi = arrayBackgroundLofi.length
const lengthAudioFile = audioFile.length;

var pointerToArrayMusic = 0;
var pointerToArrayBackground = 0;
var audioElement = new Audio(audioFile[0]);


//Lofi background
const SliderScreenLofi = () =>{
    const [indexScreenLofi, setIndexScreenLofi] = React.useState(0)
    return (
        <div id="screen">
        <ArrowLeftButton indexScreenLofi= {indexScreenLofi} setIndexScreenLofi={setIndexScreenLofi}/>
        <BackgroundLofi indexScreenLofi= {indexScreenLofi} setIndexScreenLofi={setIndexScreenLofi}/>
        <ArrowRightButton indexScreenLofi= {indexScreenLofi} setIndexScreenLofi={setIndexScreenLofi}/>
        </div>
        )
}

const ArrowRightButton = ({indexScreenLofi,setIndexScreenLofi}) => {
    const handleClick = () => {
        if (indexScreenLofi ===lengthArrayBackgroundLofi - 1){
            setIndexScreenLofi(0);
        }else{
            setIndexScreenLofi(indexScreenLofi +1);
        }
    };
    
    return (
        <button onClick = {handleClick} className="controller-v2">
            <img src="../assets/right-arrow.svg" alt="right-arrow"></img>
        </button>
    )
}

const ArrowLeftButton = ({indexScreenLofi,setIndexScreenLofi}) => {
    const handleClick = () => {
        if (indexScreenLofi === 0){
            setIndexScreenLofi(lengthArrayBackgroundLofi-1);
        }
        else{
            setIndexScreenLofi(indexScreenLofi - 1)
        }
    }
    return (
        <button onClick = {handleClick} className="controller-v2">
        <img src="../assets/left-arrow.svg"></img>
        </button>
    )
}

const BackgroundLofi = ({indexScreenLofi,setIndexScreenLofi}) => {
    return (
        <img src={arrayBackgroundLofi[indexScreenLofi]} alt="background" id="background"/>
    )
}



//Music controller

const VolumeBar = ({indexMusicList,setIndexMusicList}) => {
    const [volume, setVolume] = React.useState(50);

  

    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        setVolume(newVolume);
        audioElement.volume = newVolume / 100; // Assurez-vous que le volume est compris entre 0 et 1
    };

    React.useEffect(() => {
       
        audioElement.volume = volume/100;
    }, [indexMusicList,volume]);

    return (
        <div className="volume-bar">
            <p>Son:</p>
            <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} />
        </div>
    );
};


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


const PlayComponent = ({indexMusicList, setIndexMusicList}) => {
    const [switchButton, setSwitchButton] = React.useState(1);
    const ImageControler = ["../assets/pause-button-svgrepo-com.svg", "../assets/play-button-svgrepo-com.svg"]

    React.useEffect(() => {
        audioElement.src = audioFile[indexMusicList];
        if (switchButton === 0) {
            audioElement.play();
        }
    }, [indexMusicList]);

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
        <button onClick={handleClick} className="controller">
            <img src={ImageControler[switchButton]} alt="play-pause"/>
        </button>
    );
}





const MusicListComponent = () =>{
    const [indexMusicList, setIndexMusicList] = React.useState(pointerToArrayMusic);

    React.useEffect(() => {
        console.log("Updated indexMusicList:", indexMusicList);
    }, [indexMusicList]); // To make useteState synchronous

    const handleClick = () => {
        setIndexMusicList((prevIndex) => (prevIndex === 0 ? lengthAudioFile - 1 : prevIndex - 1));
        
    };
    return (
        <div className="interface-controler">
            <RewindController indexMusicList={indexMusicList} setIndexMusicList={setIndexMusicList} />
            <SkipController indexMusicList = {indexMusicList} setIndexMusicList= {setIndexMusicList} />
            <VolumeBar indexMusicList = {indexMusicList} setIndexMusicList= {setIndexMusicList}/>
            <PlayComponent indexMusicList = {indexMusicList} setIndexMusicList= {setIndexMusicList}/> 
        </div>
    )
}



//APP


const LofiAppMainInterface = () =>{
    return (
        <div id="main-interface">
        <SliderScreenLofi />
        <MusicListComponent />
        </div>
    )
}


const ScreenLofiApp = () => {
    return (
        <div className= "screen-lofi">
            <h1 className= "app-title">Lofi Vibe Radio</h1>
            <LofiAppMainInterface />
        </div>
    )
}

ReactDOM.render(<ScreenLofiApp />, document.getElementById("app"));