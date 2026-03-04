import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Pola from './../json/Pola.json';
import { useState } from 'react';

function Bingo() {
  const [rows, setRows] = useState(GenerateFields());
  const [board, setBoard] = useState(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(false)),
  );
  const [win, setWin] = useState(false);

  const Reset = () => {
    setRows(GenerateFields());
    setBoard(
      Array(5)
        .fill(null)
        .map(() => Array(5).fill(false)),
    );
    setWin(false);
  };

  const toggleCell = (r: number, c: number) => {
    const updated = board.map(row => [...row]);
    updated[r][c] = !updated[r][c];
    setBoard(updated);

    if (checkWin(updated)) {
      setWin(true);
    }
  };

  return (
    <View style={gridStyle.bingoGrid}>
      <BingoGrid rows={rows} board={board} toggleCell={toggleCell} />

      <Pressable onPress={Reset}>
        <Text style={gridStyle.reset}>RESET</Text>
      </Pressable>

      {win && (
        <View style={gridStyle.winBox}>
          <Text>Wygrałeś!</Text>
        </View>
      )}
    </View>
  );
}

function GenerateFields() {
  let lastid = Pola.pola.length;
  let setOfTexts = new Set<string>();

  for (let i = 0; i < 25; i++) {
    if (i === 12) {
      setOfTexts.add('Darmowe!');
      continue;
    }

    let text: string | undefined;
    do {
      text = Pola.pola.at(Math.floor(Math.random() * lastid))?.text;
    } while (text && setOfTexts.has(text));

    if (text) setOfTexts.add(text);
  }

  return Array.from(setOfTexts);
}

function BingoGrid({ rows, board, toggleCell }: any) {
  const grid = [];

  for (let r = 0; r < 5; r++) {
    const cells = [];
    for (let c = 0; c < 5; c++) {
      cells.push(
        <Field
          key={`${r}-${c}`}
          value={rows[r * 5 + c]}
          checked={board[r][c]}
          onToggle={() => toggleCell(r, c)}
        />,
      );
    }

    grid.push(
      <View key={r} style={[gridStyle.gridRow, r === 0 && gridStyle.topRow]}>
        {cells}
      </View>,
    );
  }

  return <View>{grid}</View>;
}

function Field({ value, checked, onToggle }: any) {
  return (
    <Pressable style={gridStyle.fieldBox} onPress={onToggle}>
      {checked && (
        <Image
          style={gridStyle.checked}
          source={require('./../assets/icons/close_icon.png')}
        />
      )}
      <Text style={gridStyle.fieldText}>{value}</Text>
    </Pressable>
  );
}

function checkWin(board: boolean[][]) {
  for (let r = 0; r < 5; r++) {
    if (board[r].every(v => v)) return true;
  }

  for (let c = 0; c < 5; c++) {
    if (board.every(row => row[c])) return true;
  }

  if ([0, 1, 2, 3, 4].every(i => board[i][i])) return true;

  if ([0, 1, 2, 3, 4].every(i => board[i][4 - i])) return true;

  return false;
}

const gridStyle = StyleSheet.create({
  bingoGrid: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  fieldBox: {
    width: 70,
    height: 70,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderColor: '#00529a',
  },
  fieldText: {
    fontFamily: 'FunnelSans-Regular',
    padding: 1,
    textAlign: 'center',
    fontSize: 10,
  },
  topRow: {
    borderTopWidth: 1,
    borderColor: '#00529a',
  },
  gridRow: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderColor: '#00529a',
  },
  reset: {
    backgroundColor: '#80c3ff',
    borderColor: '#6dbbff',
    borderWidth: 3,
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
    paddingLeft: 100,
    paddingRight: 100,
    fontSize: 15,
  },
  checked: {
    position: 'absolute',
    width: 70,
    height: 70,
  },
  winBox: {
    position: 'absolute',
    backgroundColor: 'rgba(188, 222, 255, 0.9)',
    borderColor: '#9dc6ec',
    borderWidth: 1,
    padding: 100,
    paddingLeft: 150,
    paddingRight: 150,
  },
});

export default Bingo;
