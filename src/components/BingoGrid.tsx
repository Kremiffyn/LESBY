import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Pola from './../json/Pola.json';
import Sezony from './../json/Motywy.json';

type SeasonType = 'Zima' | 'Wiosna' | 'Lato' | 'Jesien';

type BoardType = boolean[][];
type BingoProps = {};

function GenerateFields(): string[] {
  const lastid = Pola.pola.length;
  const setOfTexts = new Set<string>();

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

function checkWin(board: BoardType): boolean {
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

type BingoGridProps = {
  rows: string[];
  board: BoardType;
  toggleCell: (r: number, c: number) => void;
  styles: ReturnType<typeof createStyles>;
};

function BingoGrid({ rows, board, toggleCell, styles }: BingoGridProps) {
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
          styles={styles}
        />,
      );
    }

    grid.push(
      <View key={r} style={[styles.gridRow, r === 0 && styles.topRow]}>
        {cells}
      </View>,
    );
  }

  return <View>{grid}</View>;
}

type FieldProps = {
  value: string;
  checked: boolean;
  onToggle: () => void;
  styles: ReturnType<typeof createStyles>;
};

function Field({ value, checked, onToggle, styles }: FieldProps) {
  return (
    <Pressable style={styles.fieldBox} onPress={onToggle}>
      {checked && (
        <Image
          style={styles.checked}
          source={require('./../assets/icons/close_icon.png')}
        />
      )}
      <Text style={styles.fieldText}>{value}</Text>
    </Pressable>
  );
}

function getSeason(): SeasonType {
  const date = new Date();
  const month = date.getMonth(); // 0–11

  if (month === 0 || month === 1 || month === 11) return 'Zima';
  if (month >= 2 && month <= 4) return 'Wiosna';
  if (month >= 5 && month <= 7) return 'Lato';
  return 'Jesien';
}

function createStyles(season: SeasonType) {
  const theme = Sezony[season][0];

  return StyleSheet.create({
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
      borderColor: theme.Obramowanie,
    },
    fieldText: {
      fontFamily: 'FunnelSans-Regular',
      padding: 1,
      textAlign: 'center',
      fontSize: 10,
    },
    topRow: {
      borderTopWidth: 1,
      borderColor: theme.Obramowanie,
    },
    gridRow: {
      flexDirection: 'row',
      borderLeftWidth: 1,
      borderColor: theme.Obramowanie,
    },
    reset: {
      backgroundColor: theme.ResetTlo,
      borderColor: theme.ResetObr,
      borderWidth: 3,
      borderRadius: 5,
      marginTop: 30,
      padding: 10,
      paddingLeft: 100,
      paddingRight: 100,
      fontSize: 15,
      textAlign: 'center',
    },
    checked: {
      position: 'absolute',
      width: 70,
      height: 70,
    },
    winBox: {
      position: 'absolute',
      backgroundColor: theme.WygrywTlo,
      borderColor: theme.WygrywObr,
      borderWidth: 1,
      padding: 100,
      paddingLeft: 150,
      paddingRight: 150,
      justifyContent: 'center',
      alignItems: 'center',
    },
    winText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
}

const Bingo: React.FC<BingoProps> = () => {
  const [rows, setRows] = useState<string[]>(GenerateFields());
  const [board, setBoard] = useState<BoardType>(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(false)),
  );
  const [win, setWin] = useState(false);

  const season = getSeason();
  const styles = createStyles(season);

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
    <View style={styles.bingoGrid}>
      <BingoGrid
        rows={rows}
        board={board}
        toggleCell={toggleCell}
        styles={styles}
      />

      <Pressable onPress={Reset}>
        <Text style={styles.reset}>RESET</Text>
      </Pressable>

      {win && (
        <View style={styles.winBox}>
          <Text style={styles.winText}>Wygrałeś!</Text>
        </View>
      )}
    </View>
  );
};

export default Bingo;
