import * as React from 'react';
import * as AppScss from './App.scss';

import logoSvg from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className={AppScss.App}>
        <header className={AppScss.appHeader}>
          <img src={logoSvg} className={AppScss.appLogo} alt="logo" />
          <h1 className={AppScss.appTitle}>Welcome to React</h1>
        </header>
        <p className={AppScss.appIntro}>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
