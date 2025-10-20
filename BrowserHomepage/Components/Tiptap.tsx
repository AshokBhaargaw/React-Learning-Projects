// components/TiptapEditor.jsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

const TiptapEditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false, // Don't open links automatically
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
        ],
        content: ``,
    })

    return (
        <div className="editor-container fixed top-[50%] left-[50%] translate-[-50%] bg-white dark:bg-black w-8/12">
            {/* Toolbar */}
            <div className='flex justify-between dark:bg-primary bg-slate-300 px-5 py-3'>
                <div className="toolbar  flex gap-5 ">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'is-active' : '' + 'cursor-pointer'}
                    >
                        Bold
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'is-active' : '' + 'cursor-pointer'}
                    >
                        Italic
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : '' + 'cursor-pointer'}
                    >
                        H1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : '' + 'cursor-pointer'}
                    >
                        H2
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : '' + 'cursor-pointer'}
                    >
                        List
                    </button>

                </div>
                <div className='flex gap-5 font-bold'>
                    <button>Save</button>
                    <button>Cancel</button>
                </div>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />
        </div>
    )
}

export default TiptapEditor