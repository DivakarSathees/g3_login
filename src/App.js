import React from 'react'
import { BrowserRouter, Route, Router,Switch } from 'react-router-dom';
import { StyledContainer } from './components/Styles';
// import Pages from './components/Pages';
import Login from './pages/Login'
// import Signup from './pages/Signup'
import Main from './pages/Main'
import Signup from './pages/Signup';
import PasswordReset from './pages/PasswordReset';
// import Emailsent from './pages/Emailsent';
import ForgottenPassword from './pages/ForgottenPassword';

const App = () => {
  return (
    <div className="App" 
    // onLoad={() => setShowLoadingScreen(false)}
    >
      <BrowserRouter>
      <StyledContainer>
        <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/signup"><Signup /></Route>
          <Route path="/forgottenpassword"><StyledContainer><ForgottenPassword /></StyledContainer></Route>
          <Route path="/signup"><Signup /></Route>
          <Route path="/passwordreset/:userId/:resetString"><PasswordReset /></Route>
          <Route path="/"><Main /></Route>          
          
        </Switch>
        </StyledContainer>
      </BrowserRouter>
    </div>
  )
}

export default App
