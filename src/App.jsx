import { useCallback, useEffect, useState, useRef } from 'react'


function App() {
  const [length, setLength] = useState(4)
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [upcaseAllow, setUpcaseAllow] = useState(false)
  const [pass, setPass] = useState("")

  const passGen = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyz"
    if (numAllow) str += "1234567890"
    if (charAllow) str += "!@#$%^&*(){}[]|/?><"
    if (upcaseAllow) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPass(pass)
  }, [length, numAllow, charAllow, upcaseAllow, setPass])

  const passwordRef = useRef(null)
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(pass)
  }, [pass])

  useEffect(()=>{passGen()}, [length, numAllow, charAllow, upcaseAllow, passGen])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
     <h1 className='text-2xl text-center text-white my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text'
        value={pass}
        placeholder='password'
        readOnly
        ref={passwordRef}
        className='outline-none w-full py-1 px-3'/>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' 
        onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={4}
          max={30}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          /><label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numAllow}
          id='numInput'
          onChange={()=>{
            setNumAllow((prev)=> !prev)
          }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllow}
              id="characterInput"
              onChange={() => {
                  setCharAllow((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Specials</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={upcaseAllow}
              id="upcaseInput"
              onChange={() => {
                  setUpcaseAllow((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Uppercase</label>
      </div>
      </div>
     </div>
    </>
  )
}

export default App
