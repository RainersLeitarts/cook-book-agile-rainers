import { createContext, useEffect, useState } from "react"

const themes = {
    dark: {
        backgroundColorBody: '#1e1e1e',

        backgroundColorCard: '#404041',
        cardTitleTextColor: '#fefefe',
        cardTimeTextColor: '#8e9297',
        cardMethodTextColor: '#d6d0c8',
        cardButtonTextColor: '#1e1e1e',
        cardButtonColor: '#b9bbbe',
        
        recipeBackgroundColorCard: '#404041',
        recipeCardTitleTextColor: '#fefefe',
        recipeCardTimeTextColor: '#8e9297',
        recipeCardMethodTextColor: '#d6d0c8',
        recipeCardIngredientsTextColor: '#d6d0c8',

        createInputBackgroundColor: '#b9bbbe',
        createTitleTextColor: '#fefefe',
        createLabelTextColor: '#fefefe',
        createCurrentIngredientsTextColor: '#fefefe',
    },
    light: {
        backgroundColor: 'white',
        color: '#1e1e1e'
    }
}


export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false)
    const theme = isDark ? themes.dark : themes.light
    const toggleTheme = () =>{
        localStorage.setItem('isDark', JSON.stringify(!isDark))
        setIsDark(!isDark)
    }

    useEffect(()=>{
        const isDark = localStorage.getItem('isDark') === 'true'
        setIsDark(isDark)
    },[])

    return (
        <ThemeContext.Provider value={[{ theme, isDark }, toggleTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}