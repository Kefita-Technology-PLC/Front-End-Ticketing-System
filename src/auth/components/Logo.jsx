import { Link } from "react-router-dom";
import logoImage from '../../assets/logo.jpg'

export default function Logo({path, src, title}) {
  return (

  <Link to={path ? path: '/'} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
    <img className="w-8 h-8 mr-2" src={logoImage} alt="logo" />
    {title}
  </Link>

  );
}