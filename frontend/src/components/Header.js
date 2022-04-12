import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header({isLoggedIn, email, onLogOut}) {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [showNavigation, setShowNavigation] = useState(screenWidth > 580);
  const location = useLocation();

  function traceScreenWidth() {
    setScreenWidth(window.screen.width);
  }

  useEffect(() => {
    window.addEventListener('resize', traceScreenWidth)
    return () => {
      window.removeEventListener('resize', traceScreenWidth)
    }
  })

  useEffect(() => {
    (screenWidth < 580) ? setShowNavigation(false) : setShowNavigation(true);
  }, [screenWidth])


  function handleNavButtonClick() {
    setShowNavigation(true);
  }

  function handleCloseNavButton() {
    setShowNavigation(false)
  }

  function NavigationBar({columnStyle}) {
    if (!isLoggedIn && location.pathname === '/sign-up') {
      return (
        <Link 
          to={'/sign-in'}
          className={'header__link'}>
          Вход
        </Link>)
    } else if (!isLoggedIn && location.pathname === '/sign-in') {
      return (
        <Link to={'/sign-up'}
          replace
          className={'header__link'}>
          Регистрация
        </Link>)
    } else {
      return (
        <nav className={`header__nav ${columnStyle && 'header__nav_mobile'}`}>
          <span className={'header__email-tag'}>
            {email}
          </span>
          <Link 
            className={'header__link'}to={'/sign-in'}
            onClick={onLogOut}>
            Выйти
          </Link>
        </nav>)
    }
  }

  function ShowNavigationBarButton() {
    return (
      <button 
        type={'button'}
        className={'header__nav-button'}
        onClick={handleNavButtonClick}
        aria-label={'Кнопка навигации'}>
        {}
    </button>)
  }

  function CloseNavigationBarButton() {
    return (
      <button 
        type={'button'}
        className={'header__nav-button-close'}
        onClick={handleCloseNavButton}
        aria-label={'закрыть'}>
        {}
      </button>)
  }

  function HeaderLayout() {
    if (!isLoggedIn || (isLoggedIn && showNavigation && screenWidth > 580)) {
      return <NavigationBar columnStyle={false}/>
    } else if (isLoggedIn && !showNavigation && screenWidth < 580) {
      return <ShowNavigationBarButton/>;
    } else if (isLoggedIn && showNavigation && screenWidth < 580) {
      return <CloseNavigationBarButton/>;
    } else {
      return <NavigationBar columnStyle={false}/>
    }
  } 
  
  return (<>
    {(isLoggedIn && showNavigation && screenWidth < 580) &&
    <NavigationBar columnStyle={true}/>}
      <header className="header">
        <img 
          className="header__logo"
          src={logo}
          alt="логотип Mesto"/>
        <HeaderLayout />
      </header>
  </>)
}

export default Header