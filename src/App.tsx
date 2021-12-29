import React from 'react';
import { getRocketArray } from './RocketArray';

const ROW = 30;
const COL = 70;

const cellColor = 'rgb(255, 130, 0)';

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
const has3Neighbors = (array: boolean[][]) => {
  return nbOfTrue(array) === 3;
};
const has2or3Neighbors = (array: boolean[][]) => {
  return nbOfTrue(array) === 2 || nbOfTrue(array) === 3;
};
const nbOfTrue = (array: boolean[][]) => {
  return array.flatMap((e) => e).filter((e) => e).length;
};

export default function App() {
  const [lap, setLap] = React.useState(0);
  const [col, setCol] = React.useState(COL);
  const [row, setRow] = React.useState(ROW);

  const getArray = (): boolean[][] => {
    let array = Array.from(Array(row), () => new Array(col).fill(false));
    for (let i = 1; i < row - 1; i++) {
      for (let j = 1; j < col - 1; j++) {
        array[i][j] = getRandomBoolean();
      }
    }
    return array;
  };

  const [array, setArray] = React.useState<boolean[][]>(getArray());

  const getNewArray = (array: boolean[][]): boolean[][] => {
    let newArray = array;
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleNext = () => {
    const newArray = getNewArray(array);
    setArray(newArray);
    setLap(lap => lap + 1);
  };

  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRow(parseInt(event.target.value));
  };

  const handleColChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCol(parseInt(event.target.value));
  };

  const handleGenerate = () => {
    const newArray = getArray();
    setArray(newArray);
    setLap(0);
  };

  const handleRocket = () => {
    const newArray = getRocketArray();
    setArray(newArray);
    setLap(0);
  };

  const handleCellClick = (row: number, col: number) => {
    const newArray = Array.from(array);
    newArray[row][col] = !array[row][col];
    setArray(newArray);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 800);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <>
      <button onClick={handleNext} style={buttonStyle}>
        Next ⏭️
      </button>
      <button onClick={handleGenerate} style={buttonStyle}>
        Generate 🔃
      </button>
      <button onClick={handleRocket} style={buttonStyle}>
        Rocket 🚀
      </button>
      Row: <input type="text" id="row" name="row" value={row} onChange={handleRowChange} style={inputStyle} />
      Col: <input type="text" id="col" name="col" value={col} onChange={handleColChange} style={inputStyle} />
      Lap: {lap}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {array.map((row, rowIndex) => {
          return (
            <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row' }}>
              {row.map((cell, colIndex) => {
                const style = cell && {
                  background: cellColor,
                };
                return (<div key={colIndex} onClick={() => handleCellClick(rowIndex, colIndex)} style={{...cellStyle, ...style}}/>);
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
