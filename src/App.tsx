import React from 'react';
import { getRocketArray } from './RocketArray';

const buttonStyle = {
  marginBottom: '10px',
  marginRight: '5px',
  width: '100px',
  height: '30px',
};

const getRandomBoolean = () => Math.random() < 0.15;

const getReducedArray = (array: boolean[][], i: number, j: number) => {
  const reducedArray = [
    [array[i - 1][j - 1], array[i - 1][j], array[i - 1][j + 1]],
    [array[i][j - 1], array[i][j], array[i][j + 1]],
    [array[i + 1][j - 1], array[i + 1][j], array[i + 1][j + 1]],
  ];
  return reducedArray;
};
const has3Neighbors = (array: boolean[][]) => {
  return nbOfTrue(array) === 3;
};
const has2or3Neighbors = (array: boolean[][]) => {
  return nbOfTrue(array) === 3 || nbOfTrue(array) === 4;
};
const nbOfTrue = (array: boolean[][]) => {
  return array.flatMap((e) => e).filter((e) => e).length;
};

export default function App() {
  const [lap, setLap] = React.useState(0);
  const [col, setCol] = React.useState(50);
  const [row, setRow] = React.useState(50);

  const getArray = () => {
    let array = Array.from(Array(row), () => new Array(col).fill(false));
    for (let i = 1; i < row - 1; i++) {
      for (let j = 1; j < col - 1; j++) {
        array[i][j] = getRandomBoolean();
      }
    }
    return array;
  };

  const [array, setArray] = React.useState(getArray());

  const getNewArray = (array: boolean[][]) => {
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

  const handleNext = () => {
    const newArray = getNewArray(array);
    setArray(newArray);
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
  };

  const handleRocket = () => {
    const newArray = getRocketArray();
    setArray(newArray);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
      setLap(lap => lap + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <>
      <button onClick={handleNext} style={buttonStyle}>
        Next
      </button>
      <button onClick={handleGenerate} style={buttonStyle}>
        Generate
      </button>
      <button onClick={handleRocket} style={buttonStyle}>
        Rocket
      </button>
      row: <input type="text" id="row" name="row" value={row} onChange={handleRowChange} style={{ marginRight: '5px' }} />
      col: <input type="text" id="col" name="col" value={col} onChange={handleColChange} style={{ marginRight: '5px' }} />
      lap: {lap}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {array.map((row) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {row.map((cell) => {
                const style = cell && {
                  background: 'grey',
                };
                return (
                  <div
                    style={{
                      padding: '3px',
                      width: '25px',
                      height: '25px',
                      textAlign: 'center',
                      border: '1px solid black',
                      ...style,
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}