import Header from "./Header";
import DragAndDrop from "./Tasks/DragAndDrop";


export default function index() {
  return (
    <div className="w-full h-screen">
      <Header/>
      <DragAndDrop/>
    </div>
  )
}
