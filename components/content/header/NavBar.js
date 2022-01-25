import Link from 'next/link'
import styles from '../../../styles/NavBar.module.css'
export default function NavBar () {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarNav}>
          <label className={styles.logo}>
            <Link href={"/"}>
              <a>SURTIPAPER</a>
            </Link>
          </label>
          <label id="collapse-button" className={`${styles.navBarToggler} ${styles.collapseButton}`} type="button">
            <span></span>
          </label>
          <ul className={styles.navItems}>
            <li><Link href="/"><a>Inicio</a></Link></li>
            <li><Link href="/ventas"><a>Ventas</a></Link></li>
            <li><Link href="/products"><a>Productos</a></Link></li>
            <li><Link href="/vender"><a>Vender</a></Link></li>
          </ul>
        </div>
      </nav>
      <ul id="collapseNav" className={styles.navItemCollapse}>
        <li><Link href="/"><a>Inicio</a></Link></li>
        <li><Link href="/productos"><a>Ventas</a></Link></li>
        <li><Link href="/ventas"><a>Productos</a></Link></li>
        <li><Link href="/vender"><a>Vender</a></Link></li>
      </ul>
    </>
  )
}