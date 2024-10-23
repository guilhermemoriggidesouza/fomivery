import { createContext, ReactElement, useContext, useState } from 'react';

type Theme = {
    bgColor: string,
    fontColor: string,
};

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: {
        bgColor: "#FFF",
        fontColor: "#FFF",
    },
    setTheme: (theme: Theme) => { },
});

type ThemeProviderProps = {
    children: React.ReactNode;
    bgColor: string,
    fontColor: string,
};

export default function ThemeProvider({ children, bgColor, fontColor }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>({
        bgColor,
        fontColor,
    });

    function setTheme({ bgColor, fontColor }: Theme): void {
        setThemeState({
            bgColor,
            fontColor,
        });
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}