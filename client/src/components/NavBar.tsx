import React, { useState } from 'react';
//import RightMenu from './Sections/RightMenu';
//import { useSelector } from "react-redux";


function NavBar() {

  // const [visible, setVisible] = useState(false)

  // const showDrawer = () => {
  //   setVisible(true)
  // };

  // const onClose = () => {
  //   setVisible(false)
  // };

  // const user = useSelector(state => state.user)

  // try {
  //   if (window.screen.width<767) {
  //   }
  // } catch(e) {}


  return (

    <div>
      <nav className="menu" style={{position:'fixed', zIndex:5, width:'100%'}} id="barra">
        
        <div className="menu__logo">
          <a href="/" style={{color:'violet'}}> GlamStudio </a>
        </div>
        
        <div className="menu__container" style={{paddingTop:'5px'}}>
          
          <a href="/otro">Otro...</a>

          {/* <div className="menu_left">
            <LeftMenu mode="horizontal" />
          </div>
          
          <div className="menu_right">
            <RightMenu mode="horizontal" />
          </div> */}
          
          {/* <Button className="menu__mobile-button" type="dark" onClick={showDrawer}>
            <MenuIcon />
          </Button>
          
          <Drawer
            title="Navegación"
            placement="right"
            className="menu_drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <LeftMenu mode="inline" />
            <RightMenu mode="inline" />
          </Drawer> */}
        </div>
      </nav>

    </div>
  )
}


export default NavBar
