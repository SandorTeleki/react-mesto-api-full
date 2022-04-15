import { Navigate } from 'react-router-dom';

export default function NotFound({isLoggedIn}) {
  if (isLoggedIn) {
    return <Navigate to={'/'}/>
  }
  return <Navigate to={'/sign-in'}/>
}