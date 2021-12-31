import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { appSelector, handleNext, handleGenerate, handleRocket } from "./redux/App"

const buttonStyle = {
    marginBottom: '10px',
    marginRight: '5px',
    width: '100px',
    height: '30px',
};

const inputStyle = {
    marginRight: '5px',
    width: "40px",
};

const textStyle = {
    marginRight: '10px',
    color: "red",
};

type ToolbarProps = {
    handleStart: () => void,
    pause: boolean,
    population: number,
}

const Toolbar: React.FC<ToolbarProps> = props => {

    const { handleStart, pause, population } = props;

    const { row: row0, col: col0, lap } = useSelector(appSelector)
    const [row, setRow] = React.useState(row0);
    const [col, setCol] = React.useState(col0);

    const dispatch = useDispatch();

    const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRow(parseInt(event.target.value));
    };

    const handleColChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCol(parseInt(event.target.value));
    };

    return (
        <>
            <button onClick={() => dispatch(handleNext())} style={buttonStyle}>
                Next ⏭️
            </button>
            <button onClick={handleStart} style={buttonStyle}>
                {pause ? "Start ▶️" : "Pause ⏸️"}
            </button>
            <button onClick={() => dispatch(handleGenerate)} style={buttonStyle}>
                Generate 🔃
            </button>
            <button onClick={() => dispatch(handleRocket)} style={buttonStyle}>
                Rocket 🚀
            </button>
            {/* <button onClick={handleBar} style={buttonStyle}>
                Bar
            </button> */}
            <form style={{ display: "inline" }}>
                <label>
                    Row:
                    <input type="text" id="row" name="row" value={row} onChange={handleRowChange} style={inputStyle} />
                </label>
                <label>
                    Col:
                    <input type="text" id="col" name="col" value={col} onChange={handleColChange} style={inputStyle} />
                </label>
            </form>
            Lap: <span style={textStyle}>{lap}</span>
            Population: <span style={textStyle}>{population}</span>
        </>
    )
};

export default Toolbar