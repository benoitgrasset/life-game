import React from "react";

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
    handleNext: () => void,
    handleGenerate: () => void,
    handleRocket: () => void,
    handleBar: () => void,
    handleRowChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleColChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    pause: boolean,
    row: number,
    col: number,
    lap: number,
    population: number,
}

const Toolbar: React.FC<ToolbarProps> = props => {

    const { handleStart, pause, population, handleNext, handleGenerate, handleRocket, row, col, lap, handleRowChange, handleColChange, handleBar } = props;

    return (
        <>
            <button onClick={handleNext} style={buttonStyle}>
                Next ⏭️
            </button>
            <button onClick={handleStart} style={buttonStyle}>
                {pause ? "Start ▶️" : "Pause ⏸️"}
            </button>
            <button onClick={handleGenerate} style={buttonStyle}>
                Generate 🔃
            </button>
            <button onClick={handleRocket} style={buttonStyle}>
                Rocket 🚀
            </button>
            <button onClick={handleBar} style={buttonStyle}>
                Bar
            </button>
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