
interface NavbarProps {
  changeYourTheme: () => void;
  changeYourUnits:()=>void
}
const Navbar = ({ changeYourTheme,changeYourUnits} : NavbarProps) => {
  return (
    <div>
<div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Weather</a>
  </div>
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    <div className="dropdown dropdown-end">
     <button className="btn btn-primary" onClick={changeYourTheme}>Theme</button>
     
    </div>
     <div className="dropdown dropdown-end">
     <button className="btn btn-primary">Units</button>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        
        <li onClick={changeYourUnits}><a>Celsius</a></li>
        <li onClick={changeYourUnits}><a> Fahrenheit</a></li>
      </ul>
    </div>
  </div>
</div>

    </div>
  )
}

export default Navbar