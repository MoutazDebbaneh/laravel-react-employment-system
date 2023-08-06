import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";

interface RangeSliderProps {
    value: [number, number];
    min: number;
    max: number;
    step: number;
    onChange: (value: [number, number]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
    value,
    min,
    max,
    step,
    onChange,
}) => {
    const handleChange = (event: Event, newValue: number | number[]) => {
        onChange([(newValue as number[])[0], (newValue as number[])[1]]);
    };

    const formatValue = (value: number) => {
        return value.toLocaleString();
    };

    function valuetext(value: number) {
        return value.toLocaleString();
    }

    return (
        <div className="relative">
            <Slider
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={handleChange}
                valueLabelFormat={formatValue}
                disableSwap
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </div>
    );
};

export default RangeSlider;
