
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const[password, setPassword] = useState("");
  const[length, setLength] = useState(8);
  const[numberAllowed, setNumberAllowed] = useState(false);
  const[charAllowed, setCharAllowed] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let pass = "";

    if(numberAllowed){
      str = str + "1234567890";
    }

    if(charAllowed){
      str = str + "!@#$%^&*()-_=+[]\{}|;':?/<>,."
    }

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(char);
    }
    setPassword(pass);

  }, [length, charAllowed, numberAllowed])

  const copyPasswordFromClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    passwordGenerator();
  },[length, numberAllowed, charAllowed])

  return (
    <>
      <div className='bg-gray-500 p-4 rounded-full'>

        <div className='text-2xl text-white font-bold'>Password Generator</div>

        <br />

        <div className='flex justify-center'>

          <input type="text"
            className='rounded-l-lg px-3 w-full'
            value={password}
            placeholder='Password Generator'
            readOnly
            ref={passwordRef}
          />

          <button
            className='rounded-r-lg bg-blue-700 text-white p-2'
            onClick={copyPasswordFromClipboard}
          >Copy</button>

        </div>

        <br />

        <div className='flex justify-evenly'>

          <div>
            <input type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e) => {
              setLength(e.target.value)
            }}
            />
            <label className='text-orange-500'>{length}</label>
          </div>

          <div>
            <input type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className='text-orange-500'> Number</label>
          </div>

          <div>
            <input type="checkbox"
            defaultChecked={charAllowed}
            onChange={() =>{
              setCharAllowed((prev) => !prev);
            }}

            />
            <label className='text-orange-500'> Character</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
