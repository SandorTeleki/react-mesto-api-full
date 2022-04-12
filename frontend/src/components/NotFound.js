import { Navigate } from 'react-router-dom';

export default function NotFound({isLoggedIn}) {
  if (isLoggedIn) {
    return <Navigate to={'/react-mesto-auth'}/>
  }
  return <Navigate to={'/sign-in'}/>
}