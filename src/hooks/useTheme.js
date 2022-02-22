import { createContext, useEffect, useState } from "react"
import { generateSlug } from "random-word-slugs";

const themes = {
    dark: {
        name: 'dark',

        backgroundColorBody: '#1e1e1e',

        backgroundColorCard: '#404041',
        cardTitleTextColor: '#fefefe',
        cardTimeTextColor: '#8e9297',
        cardMethodTextColor: '#d6d0c8',
        cardButtonTextColor: '#1e1e1e',
        cardButtonColor: '#b9bbbe',
        cardMissingColor: '#b9bbbe',

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
        name: 'light',
        backgroundColor: 'white',
        color: '#1e1e1e'
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


let randomTheme = {
    backgroundColorBody: '',

    backgroundColorCard: '',
    cardTitleTextColor: '',
    cardTimeTextColor: '',
    cardMethodTextColor: '',
    cardButtonTextColor: '',
    cardButtonColor: '',
    cardMissingColor: '',

    recipeBackgroundColorCard: '',
    recipeCardTitleTextColor: '',
    recipeCardTimeTextColor: '',
    recipeCardMethodTextColor: '',
    recipeCardIngredientsTextColor: '',

    createInputBackgroundColor: '',
    createTitleTextColor: '',
    createLabelTextColor: '',
    createCurrentIngredientsTextColor: ''

}

export const navBarColors = {
    purple: {
        backgroundColor: '#58249c'
    },
    magenta: {
        backgroundColor: '#ff00ff'
    },
    green: {
        backgroundColor: '#5DBB63'
    },
    yellow: {
        backgroundColor: '#c5cc00'
    },
    orange: {
        backgroundColor: '#FF5F00'
    }
}


export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes['light'])
    const [navBarColor, setNavBarColor] = useState({}) //if not in localstorage set default purple

    const toggleTheme = () => {
        let themeNames = Object.keys(themes)


        if (theme.name != themeNames[themeNames.length - 1]) {

            setTheme(themes[themeNames[themeNames.indexOf(theme.name) + 1]])
            console.log(themes[themeNames[themeNames.indexOf(theme.name) + 1]].name)
            localStorage.setItem('theme', JSON.stringify(themes[themeNames[themeNames.indexOf(theme.name) + 1]].name))
        } else {

            setTheme(themes[themeNames[0]])
            console.log(themes[themeNames[0]])
            localStorage.setItem('theme', JSON.stringify(themes[themeNames[0]].name))
        }

        localStorage.setItem('isRandomTheme', JSON.stringify(false))
    }


    const switchNavBarColor = (color) => {
        setNavBarColor({ backgroundColor: color })
        localStorage.setItem('navBarColor', JSON.stringify(color))
    }

    const toggleRandomTheme = () => {
        let colors = Object.keys(randomTheme)
        console.log(colors)
        colors.map(color => {
            randomTheme[color] = getRandomColor()
            console.log(randomTheme[color])
        })


        if (localStorage.getItem('random-theme') != undefined) {
            console.log(localStorage.getItem('random-theme'))
        }

        let randomName = generateSlug(1,
            {
                partsOfSpeech: ['adjective'],
                categories: {
                    adjective: ['appearance', 'condition', 'taste']
                }
            })
        setTheme({ name: randomName, ...randomTheme })
        localStorage.setItem('random-theme', JSON.stringify({ name: randomName, ...randomTheme }))
        localStorage.setItem('isRandomTheme', JSON.stringify(true))
        console.log(localStorage.getItem('isRandomTheme'))
    }

    useEffect(() => {
        if (localStorage.getItem('isRandomTheme') != undefined && localStorage.getItem('isRandomTheme') === 'true') {
            console.log('here')
            setTheme(JSON.parse(localStorage.getItem('random-theme')))
        } else if (localStorage.getItem('theme') != undefined) {
            console.log('here')
            console.log(JSON.parse(localStorage.getItem('theme')))
            setTheme(themes[JSON.parse(localStorage.getItem('theme'))])
        }
        if (localStorage.getItem('navBarColor') != undefined) {
            setNavBarColor({ backgroundColor: JSON.parse(localStorage.getItem('navBarColor')) })
        }
    }, [])

    return (
        <ThemeContext.Provider value={[{ theme, navBarColor }, toggleTheme, switchNavBarColor, toggleRandomTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}