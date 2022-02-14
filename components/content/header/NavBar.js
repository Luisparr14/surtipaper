import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../../styles/NavBar.module.css'

const loadScript = () => {
  console.log('LISTO')
  let btn = document.getElementById('collapse-button');
  let collapsenav = document.getElementById('collapseNav');
  // let content = document.getElementById('content-page');
  // let content = document.getElementsByClassName('content-page');
  let linkColapseNav = document.getElementById('collapseNav').getElementsByTagName('a');

  function toogleCollapse () {
    collapsenav.classList.toggle('noCollapse')
    btn.classList.toggle('collapseButtonActive');
    // content.classList.toggle('blur')
  }

  btn.addEventListener('click', toogleCollapse)

  // content.addEventListener('click', () => {
  //   console.log('click')
  //   if (collapsenav.classList.contains('noCollapse')) {
  //     toogleCollapse()
  //   }
  // })

  for (let i = 0; i < linkColapseNav.length; i++) {
    linkColapseNav[i].addEventListener('click', () => {
      if (collapsenav.classList.contains('noCollapse')) {
        toogleCollapse()
      }
    })
  }
}

export default function NavBar ({ href }) {
  const router = useRouter()
  useEffect(() => {
    loadScript()
  }, [router])
  const styleSales = {
    color: router.asPath === "/sales" ? '#FF0505' : '#000'
  }
  const styleSell = {
    color: router.asPath === "/sell" ? '#FF0505' : '#000'
  }
  const styleProduct = {
    color: router.asPath.startsWith('/products') ? '#FF0505' : '#000'
  }
  const styleIndex = {
    color: router.asPath === "/" || router.asPath.includes('new') ? '#FF0505' : '#000'
  }


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