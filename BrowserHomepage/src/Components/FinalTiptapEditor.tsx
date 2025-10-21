// FinalTiptapEditor.jsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import './TiptapEditor.css'
import { useDispatch } from 'react-redux';
import { addTask } from '../Redux/TodoSlice';

interface TaskTitleDataInterface {
  input: string;
  setinput: (value: string) => void;
}

interface FinalTiptapEditorProps {
  keepOpen: (value: boolean) => void;
  taskTitleData: TaskTitleDataInterface;
}

const FinalTiptapEditor = ({ keepOpen, taskTitleData }: FinalTiptapEditorProps) => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch();

  const { input, setinput } = taskTitleData;
  const editor = useEditor({ extensions: [StarterKit], content, onUpdate: ({ editor }) => setContent(editor.getHTML()), })


  // Saving Content 
  const addTaskHandler = () => {
    if (input) {
      dispatch(addTask({ title: input, description: content }))
      keepOpen(false)
    }
  }


  return (
    <div className="editor-container">
      <div className='border-b flex gap-3 p-2 dark:bg-slate-800 bg-slate-200 '>
        <p className='text-slate-400'>Title: </p>
        <input
          placeholder='Add task title...'
          autoFocus
          value={input}
          onChange={(e) => setinput(e.target.value)}
          type="text"
          className='w-full border-0 outline-0'
        />

      </div>
      <div className='flex justify-between px-1'>
        <div className="toolbar w-9/12 ">
          <button onClick={() => editor.chain().focus().toggleBold().run()}> Bold </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}> Italic </button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}> H1 </button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}> H2 </button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()}> UL </button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>OL</button>        </div>
        <div className="toolbar">
          <button onClick={addTaskHandler}>  Save </button>
          <button onClick={() => keepOpen(false)}> Cancel </button>
        </div>
      </div>
      <hr className='text-slate-300' />
      <EditorContent editor={editor} />
    </div>
  )
}

export default FinalTiptapEditor