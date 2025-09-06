import { useState,useRef, useEffect } from 'react';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import Die from './components/tenzies'
import './App.css'

function App() {
  const [dice , setDice] = useState(()=>generateNewNumbers())
  const buttonRef = useRef(null)
  console.log(buttonRef)


  const gameWon = dice.every(die =>die.isHeld) &&
  dice.every(die => die.value === dice[0].value);
  console.log(gameWon)

  useEffect(()=>{
    if(gameWon){
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateNewNumbers(){
    const numbers = [];
    for (let i = 0; i < 10; i++) {
      const random = Math.ceil(Math.random()* 6 + 1)
        numbers.push(
          {
            value: random,
            isHeld: false,
            id: nanoid(),
          }
        ); 
    }
    return numbers;
  }
/*   console.log(generateNewNumbers); */

  function roll(){
    if (!gameWon) {
      setDice(oldDice => oldDice.map(die=>
      die.isHeld ?
      die:
      {...die, value:Math.ceil(Math.random()* 6 + 1)}
    ))
    }else{
      setDice(generateNewNumbers())
    }
  }
  function hold(id){
    setDice(oldDice => oldDice.map(die=>
      die.id === id ?
      {...die, isHeld:!die.isHeld}:
      die
    ))

  }


const diceElement = dice.map(diceObj =>{
    return <Die
    key = {diceObj.id}
    value = {diceObj.value}
    isHeld = {diceObj.isHeld}
    id = {diceObj.id}
    hold = {()=>hold(diceObj.id)}
  />
})
/*   console.log(diceElement) */




  return (
    <main>
      {gameWon && <Confetti/>}
      <div aria-live='polite' className='sr-only'>
          {gameWon && <p>Game won, press new game to start the game</p>}
      </div>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it and its current value between rolls</p>
      <div className='dice-container'>
        {diceElement}
      </div>
      <button className='roll-dice' onClick={roll} ref={buttonRef}>
        {!gameWon ? "Roll" : "New Game"}
      </button>
      
    </main>
  )
}

export default App
