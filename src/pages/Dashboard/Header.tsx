import { ThemeToggle } from "../../component/ThemeToggle";
import UserMenu from "./UserMenu";


export default function Header() {
  return (
    <div className="flex justify-between items-center px-4 py-2 dark:bg-gray-800 dark:text-white">
      <span>Todo List</span>
      <div className="flex gap-1 items-center">
      <UserMenu/>
      <ThemeToggle/>
      </div>
    </div>
  )
}

