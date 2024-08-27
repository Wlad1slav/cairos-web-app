import {AchievementBoxProps} from "@/lib/types";
import './achievement-box.scss';

function AchievementBox({icon, condition}: AchievementBoxProps) {
    return (
        <div className="achievement-box">
            {icon}
            <p>{condition}</p>
        </div>
    );
}

export default AchievementBox;