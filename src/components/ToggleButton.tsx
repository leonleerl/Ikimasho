
interface ToggleButtonProps {
  isOn:boolean;
  toggleButton: () => void;
}

const ToggleButton : React.FC<ToggleButtonProps> = ({isOn, toggleButton}) => {

  return (
    <button
      onClick={toggleButton}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${isOn ? 'bg-green-400' : 'bg-gray-300'}`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? 'translate-x-6' : 'translate-x-0'}`}
      ></div>
    </button>
  );
}

export default ToggleButton;
