import { use, useEffect, useState } from "react"
import CardNote from "../components/CardNote"
import formatData from "../utils/formatDATE";
import axios from "axios"

const apiURL = import.meta.env.VITE_API_URL;
const HomePage = () => {
    const [ notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true);

   useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/notes")
      console.log("DATOS:", response.data)

      setNotes(response.data)
    } catch (error) {
      console.log("ERROR:", error)
    } finally {
      setLoading(false) // 🔥 SIEMPRE se ejecuta
    }
  }

  fetchData()
}, [])
    
    if (loading) return <span>Cargando......</span>

  return (
    <div className= "grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 xl:grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
        {notes.map(note => (
        <CardNote
        key={note._id}
        title={note.title}
        description={note.description}
        id={note._id}
        date={formatData(note.createdAt)}
        />
        ))}
        
     </div>
  );
};

export default HomePage
