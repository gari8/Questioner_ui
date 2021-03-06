import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthProvider } from 'contexts/Auth'
import { ChakraProvider } from '@chakra-ui/react'
import Top from 'pages/Top'
import MainFrame from './components/templates/MainFrame'
import { theme } from './assets/theme/theme'
import QuestionShow from './pages/Question/show'
import UserShow from './pages/User/show'
import SearchIndex from 'pages/Search'

function App() {
    return (
        <div className='App'>
            <ChakraProvider theme={theme}>
                <BrowserRouter>
                    <AuthProvider>
                        <MainFrame>
                            <Switch>
                                <Route exact path='/' render={() => <Top />} />
                                <Route path='/question/:id' render={() => <QuestionShow />} />
                                <Route path='/user/:id' render={() => <UserShow />} />
                                <Route path='/search' render={() => <SearchIndex />} />
                            </Switch>
                        </MainFrame>
                    </AuthProvider>
                </BrowserRouter>
            </ChakraProvider>
        </div>
    )
}

export default App
