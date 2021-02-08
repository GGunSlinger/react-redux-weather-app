import style from "../../css/header.module.css"
import { NavLink } from "react-router-dom"
import LocationSearchInput from "./Search"

const Header: React.FC = () => {
  const pages = ["main", "today", "tomorrow", "week"]

  const links = (section: Array<string>) => {
    return section.map((page, id) => {
      let pageTitle = page[0].toUpperCase() + page.slice(1)
      return (
        <NavLink key={id} activeClassName={style.link} to={`/${page}`}>
          {pageTitle}
        </NavLink>
      )
    })
  }

  return (
    <div className={style.wrap}>
      <div className={style.navigation}>{links(pages)}</div>
      <div className={style.search}>
        <LocationSearchInput />
      </div>
    </div>
  )
}

export default Header
