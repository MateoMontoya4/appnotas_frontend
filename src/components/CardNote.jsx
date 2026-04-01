import { da } from "date-fns/locale"
import axios from "axios"
import { SquarePen, Trash } from "lucide-react"

const CardNote = ( { title, description, date, id}) => {
  const handleDelete = async () => {
  try {
    await axios.delete(`${apiURL}/api/notes/${id}`)
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}

const handleEdit = async () => {
  const nuevoTitulo = prompt("Nuevo título:")
  const nuevaDesc = prompt("Nueva descripción:")

  if (!nuevoTitulo || !nuevaDesc) return

  try {
    await axios.put(`${apiURL}/api/notes/${id}`, {
      title: nuevoTitulo,
      description: nuevaDesc
    })
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className="card bg-base-300 w-full ">
  <div className="card-body">
    <h2 className="card-title text-accent font-bold lg:text-2xl">
        {title}
    </h2>
    <p className="text-amber-50">{description}</p>
    <div className="flex justify-between items-center mt-6">
      <time dateTime={date}>{date}</time>
      <div className="flex gap-4">
        <SquarePen 
          className="text-white cursor-pointer" 
          onClick={handleEdit}
        />

  <Trash 
  className="text-red-400 cursor-pointer" 
  onClick={handleDelete}
  />
      </div>
    </div>
  </div>
</div>
  )
}

export default CardNote
