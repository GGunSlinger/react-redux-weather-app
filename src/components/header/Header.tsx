// @ts-ignore:
import style from "../../css/header.module.css"
import { NavLink } from "react-router-dom"
import LocationSearchInput from "./Search"

const Header: React.FC = () => {
  return (
    <div className={style.wrap}>
      <div className={style.navigation}>
        <NavLink activeClassName={style.link} to="/main">
          Main
        </NavLink>
        <NavLink activeClassName={style.link} to="/today">
          Today
        </NavLink>
        <NavLink activeClassName={style.link} to="/tomorrow">
          Tomorrow
        </NavLink>
        <NavLink activeClassName={style.link} to="/week">
          Week
        </NavLink>
      </div>
      <div className={style.search}>
        <LocationSearchInput />
      </div>
    </div>
  )
}

export default Header
