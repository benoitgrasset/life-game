import React, { CSSProperties } from 'react';
import { getRocketArray } from './RocketArray';
import { getBarArray } from './Bar';
import { Button } from "@mui/material";

// TODO
// reducer / store
// 2 col/row: un local au Toolbar et un global dans le store au niveau de la grille

const ROW = 5;
const COL = 5;
const INTERVAL = 1000;

const buttonStyle: CSSProperties = {
  marginBottom: '10px',
  marginRight: '5px',
  width: '130px',
  height: '30px',
  textTransform: "lowercase"
};

const inputStyle = {
  marginRight: '5px',
  width: "40px",
};

const textStyle = {
  marginRight: '10px',
  color: "red",
};

const cellColor = 'rgb(255, 130, 0)';

const cellStyle = {
  padding: '3px',
  width: '18px',
  height: '18px',
  background: '#2c2826',
  border: 'thin solid grey',
  cursor: 'pointer',
};

const getRandomBoolean = () => Math.random() < 0.15;

const getReducedArray = (array: boolean[][], i: number, j: number): boolean[][] => {
  const reducedArray = [
    [array[i - 1][j - 1], array[i - 1][j], array[i - 1][j + 1]],
    [array[i][j - 1], false, array[i][j + 1]],
    [array[i + 1][j - 1], array[i + 1][j], array[i + 1][j + 1]],
  ];
  return reducedArray;
};
const has3Neighbors = (array: boolean[][]): boolean => {
  return nbOfTrue(array) === 3;
};
const has2or3Neighbors = (array: boolean[][]): boolean => {
  return nbOfTrue(array) === 2 || nbOfTrue(array) === 3;
};
const nbOfTrue = (array: boolean[][]) => {
  return array.flatMap((e) => e).filter((e) => e === true).length;
};

const getArray = (row: number, col: number): boolean[][] => {
  console.log("test")
  const newArray = Array.from(Array(row), () => new Array(col).fill(false));
  for (let i = 1; i < row - 1; i++) {
    for (let j = 1; j < col - 1; j++) {
      newArray[i][j] = getRandomBoolean();
    }
  }
  return newArray;
};

const getNextArray = (array: boolean[][], row: number, col: number): boolean[][] => {
  const newArray = Array.from(array);
  for (let i = 1; i < row - 1; i++) {
    for (let j = 1; j < col - 1; j++) {
      const reducedArray = getReducedArray(newArray, i, j);
      if (array[i][j] === true) {
        newArray[i][j] = has2or3Neighbors(reducedArray);
      } else newArray[i][j] = has3Neighbors(reducedArray);
    }
  }
  return newArray;
};

export default function App() {
  const [lap, setLap] = React.useState(0);
  const [col, setCol] = React.useState(COL);
  const [row, setRow] = React.useState(ROW);
  const [pause, setPause] = React.useState(false);
  const [keyDown, setKeyDown] = React.useState(false);

  // const array0 = getArray(row, col);
  const [array, setArray] = React.useState<boolean[][]>(getBarArray());

  const population = nbOfTrue(array);

  const handleNext = React.useCallback(() => {
    setArray(prevArray => {
      return getNextArray([...prevArray], row, col)
    });
    setLap(prevLap => prevLap + 1);
  }, [row, col]);

  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRow(parseInt(event.target.value));
  };

  const handleColChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCol(parseInt(event.target.value));
  };

  const handleGenerate = () => {
    setArray(getArray(row, col));
    setLap(0);
  };

  const handleStart = () => {
    setPause(pause => !pause);
  };

  const handleRocket = () => {
    setArray(getRocketArray());
    setLap(0);
  };

  const handleBar = () => {
    setArray(getBarArray());
    setLap(0);
  };

  const handleCellClick = (row: number, col: number) => {
    const newArray = [...array];
    newArray[row][col] = !array[row][col];
    setArray(newArray);
  };

  const handleMouseOver = (row: number, col: number) => {
    if (keyDown) {
      handleCellClick(row, col);
    }
  };

  const handleMouseDown = () => {
    setKeyDown(true);
    setPause(true);
  };

  const handleMouseUp = () => {
    setKeyDown(false);
    setPause(false);
  };

  // React.useEffect(() => {
  //   const timeoutHandler = () => {
  //     !pause && handleNext();
  //   }
  //   const interval = setInterval(timeoutHandler, INTERVAL);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <Button variant='contained' onClick={handleNext} style={buttonStyle}>
        Next ⏭️
      </Button>
      <Button variant='contained' onClick={handleStart} style={buttonStyle}>
        {pause ? "Start ▶️" : "Pause ⏸️"}
      </Button>
      <Button variant='contained' onClick={handleGenerate} style={buttonStyle}>
        Generate 🔃
      </Button>
      <Button variant='contained' onClick={handleRocket} style={buttonStyle}>
        Rocket 🚀
      </Button>
      <Button variant='contained' onClick={handleBar} style={buttonStyle}>
        Bar
      </Button>
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {array.map((row, rowIndex) => {
          return (
            <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row' }}>
              {row.map((cell, colIndex) => {
                const style = cell && {
                  background: cellColor,
                };
                return (<div
                  key={colIndex}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  style={{ ...cellStyle, ...style }} />);
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
