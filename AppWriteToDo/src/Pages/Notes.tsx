import { useEffect, useState } from 'react'
import { databases } from '../AppWrite/config';
import {client} from '../AppWrite/config';

type Note = {
  $id: string;
  body: string;
};

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_NOTES_ID,
        )
        setNotes(response.documents as Note[])
      } catch (error) {
        console.error(error);
      }
    }

    init();
  }, [])

  console.log(client)

  return (
    <div>
      {
        notes.map(note => (
          <div key={note.$id}> {note.$id} --- {note.body}</div>
        ))
      }
    </div>
  )
}

export default Notes