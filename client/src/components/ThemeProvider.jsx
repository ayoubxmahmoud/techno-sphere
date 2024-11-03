// import 'useSelector' to access the Redux store
import { useSelector } from 'react-redux';


const ThemeProvider = ({ children }) => {
    // Select the current theme from the Redux store
    const {theme} = useSelector((state) => state.theme);

  return (
    //Apply the theme class obtained from Redux to the parent element
    <div className={theme}>
      <div className="bg-white text-gray-800 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen">
        {children}
      </div>
    </div>
  )
}

export default ThemeProvider
