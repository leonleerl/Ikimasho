import ToggleButton from "./ToggleButton";

function Card() {


    return <>
        <div class="p-4 max-w-sm mx-auto bg-pink-200 rounded-xl shadow-lg flex items-center justify-center space-x-4 m-5 w-60 h-28 hover:bg-gray-800 group">
        <div class="text-center">
          <div class="text-5xl font-medium text-black group-hover:text-green-400">あ</div>
          <p class="text-slate-500 group-hover:text-green-400">a</p>
        </div>
        <div>
          <div>
          <ToggleButton/>
          <span>🎵</span>
          <ToggleButton/>
          </div>
        </div>
        <div>
        </div>
      </div>
    </>
}



export default Card;