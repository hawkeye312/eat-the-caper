import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Platform, TouchableWithoutFeedback } from 'react-native';
import { useKeyPress } from './hooks/useKeyPress';

const CELL_SIZE = 20;
const BOARD_SIZE = 300;
const INITIAL_SNAKE = [{ x: 0, y: 0 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

const generateCapers = () => {
  const x = Math.floor(Math.random() * (BOARD_SIZE / CELL_SIZE)) * CELL_SIZE;
  const y = Math.floor(Math.random() * (BOARD_SIZE / CELL_SIZE)) * CELL_SIZE;
  return { x, y };
};

const GameScreen = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [capers, setCapers] = useState(generateCapers());
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'web') {
      useKeyPress('ArrowUp', () => handleDirectionChange({ x: 0, y: -1 }));
      useKeyPress('ArrowDown', () => handleDirectionChange({ x: 0, y: 1 }));
      useKeyPress('ArrowLeft', () => handleDirectionChange({ x: -1, y: 0 }));
      useKeyPress('ArrowRight', () => handleDirectionChange({ x: 1, y: 0 }));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction]);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };
    head.x += direction.x * CELL_SIZE;
    head.y += direction.y * CELL_SIZE;

    if (head.x >= BOARD_SIZE || head.x < 0 || head.y >= BOARD_SIZE || head.y < 0 || checkCollision(newSnake, head)) {
      setIsGameOver(true);
      return;
    }

    newSnake.unshift(head);
    if (!checkCapers(head)) {
      newSnake.pop();
    } else {
      setCapers(generateCapers());
      setScore(score + 1);
    }
    setSnake(newSnake);
  };

  const checkCollision = (snake, head) => {
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }
    return false;
  };

  const checkCapers = (head) => {
    return capers.x === head.x && capers.y === head.y;
  };

  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
  };

  const handleBoardPress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const head = snake[0];
    const deltaX = locationX - head.x;
    const deltaY = locationY - head.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        handleDirectionChange({ x: 1, y: 0 });
      } else {
        handleDirectionChange({ x: -1, y: 0 });
      }
    } else {
      if (deltaY > 0) {
        handleDirectionChange({ x: 0, y: 1 });
      } else {
        handleDirectionChange({ x: 0, y: -1 });
      }
    }
  };

  return (
    <View style={styles.container}>
      {isGameOver ? (
        <View>
          <Text style={styles.gameOverText}>Game Over</Text>
          <Button title="Start New Game" onPress={() => {
            setSnake(INITIAL_SNAKE);
            setDirection(INITIAL_DIRECTION);
            setCapers(generateCapers());
            setIsGameOver(false);
            setScore(0);
          }} />
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={handleBoardPress}>
          <View style={styles.board}>
            {snake.map((segment, index) => (
              <View key={index} style={[styles.snake, { left: segment.x, top: segment.y }]} />
            ))}
            <Image source={require('./assets/images/caper.png')} style={[styles.capers, { left: capers.x, top: capers.y }]} />
          </View>
        </TouchableWithoutFeedback>
      )}
      <Text style={styles.scoreText}>Score: {score}</Text>
      {!isGameOver && (
        <View style={styles.controls}>
          <Button title="Up" onPress={() => handleDirectionChange({ x: 0, y: -1 })} />
          <Button title="Down" onPress={() => handleDirectionChange({ x: 0, y: 1 })} />
          <Button title="Left" onPress={() => handleDirectionChange({ x: -1, y: 0 })} />
          <Button title="Right" onPress={() => handleDirectionChange({ x: 1, y: 0 })} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: 'lightgrey',
    position: 'relative',
  },
  snake: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'green',
    position: 'absolute',
  },
  capers: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    position: 'absolute',
  },
  gameOverText: {
    fontSize: 30,
    color: 'red',
  },
  scoreText: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
});

export default GameScreen;