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

const navBarColors = {
    purple: {
        backgroundColor: '#58249c'
    },
    magenta: {
        backgroundColor: '#ff00ff'
    },
    green: {
        backgroundColor: '#5DBB63'
    }
}


export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false)
    const [navBarColor, setNavBarColor] = useState('')
    const theme = isDark ? themes.dark : themes.light



    const toggleTheme = () => {
        localStorage.setItem('isDark', JSON.stringify(!isDark))
        setIsDark(!isDark)
    }

    const switchNavBarColor = (color) => {
        switch (color) {
            case 'purple':
                setNavBarColor(navBarColors.purple)
                break;
            case 'magenta':
                setNavBarColor(navBarColors.magenta)
                localStorage.setItem('navBarColor', JSON.stringify(navBarColors.magenta))
                break;
            case 'green':
                setNavBarColor(navBarColors.green)
                break;
        }        
    }

    useEffect(() => {
        const isDark = localStorage.getItem('isDark') === 'true'
        setIsDark(isDark)


        if(localStorage.getItem('navBarColor') != undefined){
            setNavBarColor(`'${JSON.parse(localStorage.getItem('navBarColor')).backgroundColor}'`)
            console.log(`'${JSON.parse(localStorage.getItem('navBarColor')).backgroundColor}'`)
        }

        
    }, [])

    return (
        <ThemeContext.Provider value={[{ theme, isDark, navBarColor }, toggleTheme, switchNavBarColor]}>
            {children}
        </ThemeContext.Provider>
    )
}