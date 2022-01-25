window.onload = () => {
  let btn = document.getElementById('collapse-button');
  let collapsenav = document.getElementById('collapseNav');
  // let content = document.getElementById('content-page');
  // let content = document.getElementsByClassName('content-page');
  let linkColapseNav = document.getElementById('collapseNav').getElementsByTagName('a');
  
  function toogleCollapse () {
    console.log('Toggle Collapse');
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