import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../../styles/NavBar.module.css'
export default function NavBar ({ href }) {
  const router = useRouter()
  const styleSales = {
    color: router.asPath === "/sales" ? '#FF0505' : '#000'
  }
  const styleSell = {
    color: router.asPath === "/sell" ? '#FF0505' : '#000'
  }
  const styleProduct = {
    color: router.asPath === "/products" ? '#FF0505' : '#000'
  }
  const styleIndex = {
    color: router.asPath === "/" ? '#FF0505' : '#000'
  }


  return (
    <>
      <Head>
        <script defer type='text/javascript' src='/js/main.js' ></script>
      </Head>
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
            <li><Link href="/"><a style={styleIndex}>Inicio</a></Link></li>
            <li><Link href="/sales"><a style={styleSales}>Ventas</a></Link></li>
            <li><Link href="/products"><a style={styleProduct}>Productos</a></Link></li>
            <li><Link href="/sell"><a style={styleSell}>Vender</a></Link></li>
          </ul>
        </div>
      </nav>
      <ul id="collapseNav" className={styles.navItemCollapse}>
        <li><Link href="/"><a style={styleIndex}>Inicio</a></Link></li>
        <li><Link href="/sales"><a style={styleSales}>Ventas</a></Link></li>
        <li><Link href="/products"><a style={styleProduct}>Productos</a></Link></li>
        <li><Link href="/sell"><a style={styleSell}>Vender</a></Link></li>
      </ul>
    </>
  )
}