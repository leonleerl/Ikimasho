import { Howl } from "howler";

type SpeakerProp = {
    audioPath: string
}

const SpeakerButton : React.FC<SpeakerProp> = ({audioPath}) =>{
    const sound = new Howl({
        src: [audioPath]
      });
    
      const handlePlay = () => {
        sound.play();
      };
    
      return (
        <div>
          <button
            onClick={handlePlay}
          >
            🎵
          </button>
        </div>
      );
}


export default SpeakerButton;