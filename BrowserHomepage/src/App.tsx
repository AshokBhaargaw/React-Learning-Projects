import SearchBar from './SearchBar/SearchBar'
import Header from './Header/Header'
import Tiptap from './Components/Tiptap';
import Taskmanager from './TaskManager/Taskmanager'

export default function App() {

  return (
    <div >
      <div className='min-h-screen overflow-hidden p-0 max-w-10/12 m-auto'>
        <Header />
        <SearchBar />
        <div className='w-full flex justify-around gap-5'>
          <Taskmanager />

        </div>
       <Tiptap/>
      </div>
    </div>
  )
}
