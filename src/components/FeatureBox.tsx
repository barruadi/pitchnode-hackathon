import "../index.css";
import Icon from "../assets/feature_icon.png";

function FeatureBox() {
    return (
        <div className="bg-[#39373A] w-1/3 flex flex-col items-center p-5 rounded-md">
            <div className="w-full flex justify-center">
                <img src={Icon} alt="Feature Icon" className="w-16 h-16" />
            </div>
            <div className="mt-2 text-center text-white">
                Secure xxx
            </div>
        </div>
    )
}

export default FeatureBox;