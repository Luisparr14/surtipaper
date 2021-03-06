import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../../styles/NavBar.module.css'
import {useEffect} from 'react'
const loadScript = () => {
  let btn = document.getElementById('collapse-button');
  let collapsenav = document.getElementById('collapseNav');
  let linkColapseNav = document.getElementById('collapseNav').getElementsByTagName('a');
  
  const openNav = () => {
    if (btn.classList.contains('collapseButtonActive')) {
      btn.classList.remove('collapseButtonActive');
      collapsenav.classList.remove('noCollapse');
    } else {
      collapsenav.classList.add('noCollapse')
      btn.classList.add('collapseButtonActive');
    }
  }
  
  btn.onclick = openNav;

  const closeNav = () => {
    collapsenav.classList.remove('noCollapse');
    btn.classList.remove('collapseButtonActive');
  }

  for (let i = 0; i < linkColapseNav.length; i++) {
    linkColapseNav[i].onclick = closeNav;
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