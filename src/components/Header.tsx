import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {AiOutlineSearch, AiOutlineCloseCircle} from 'react-icons/ai';

const Header = () => {
  const navigate = useNavigate();
  const [toggleForm, setToggleForm] = useState(false);
  const [formInput, setFormInput] = useState({term: ''})

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormInput(prevFormInput => {
      return {...prevFormInput,
        [name]: value
      }
    })
  }


  return (
    <div className="bg-[#242424] text-center text-white w-[100%] p-8 flex items-center">
      <h1 className="font-bold text-4xl mr-auto" onClick={() => navigate("/")}>Movie Application</h1>
      {!toggleForm 
        ? 
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setToggleForm(true)}>
          <AiOutlineSearch size={30}/>
          <h1 className="font-bold">Search</h1>
        </div>
        :
        <form action="/movies/search" className="flex items-center gap-2">
          <button type="submit">
            <AiOutlineSearch size={30}/>
          </button>
          <input 
            className="p-2 rounded-sm text-black"
            type="text" 
            name="term"
            value={formInput.term}
            onChange={(e) => handleFormInput(e)}
            placeholder="Enter keywords..."
          />
          <AiOutlineCloseCircle size={30} onClick={() => setToggleForm(false)}/>
        </form>
      }
    </div>
  )
}

export default Header