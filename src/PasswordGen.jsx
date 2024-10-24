
import { useState,useRef,useCallback,useEffect } from 'react'


function PasswordGen() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(6)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const passwordRef  = useRef()


  const  generatePassword = useCallback(()=>{

    let password = '';
    let str = 'ASDFGHJKLQWERTYUIOPZXCVBNMasdfghjklqwertyuiopzxcvbnm';
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()_+";
    for (let i = 0; i < length; i++) {

      let getRandom = Math.floor(Math.random() * str.length);
      password += str.at(getRandom)
    }
    setPassword(password)
  },[length,charAllowed,numberAllowed])
  useEffect(()=>{
    generatePassword()
    return ()=>window.getSelection().removeAllRanges();
  },[length,charAllowed,numberAllowed])


  function copyPassword(){
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();

  }

  

  return (
    <div
      className='w-full  max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8 bg-gray-800 text-orange-500'
    >
      <h1 className="text-white text-center my-3">
        Password Generator
      </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
          name="" id=""
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button className="outline-none text-red-500 px-3 py-0.5 shrink-0 bg-blue-700" onClick={copyPassword}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className="flex items-center gap-x-1">
          <input type="range" name="" id="length"
            min={6}
            max={100}
            className='cursor-pointer'
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length : {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox" name="" id="number"

            className='cursor-pointer'
            value={numberAllowed}
            defaultChecked={numberAllowed}
            onChange={() => setnumberAllowed(e => !e)}

          />
          <label htmlFor="number">Number </label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" name="" id="character"

            className='cursor-pointer'
            value={charAllowed}
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((e) => !e)}


          />
          <label htmlFor="character">Character</label>
        </div>
      </div>
    </div>

  )
}

export default PasswordGen
