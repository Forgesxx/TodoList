import './App.css';
import Header from './components/Header/header';
import InputContainer from './components/InputContainer/InputContainer';
import DataBaseContent from './components/DataBaseContent/DataBaseContent';

function App()
{
    return (
        <div className="App">
            <div className='HeaderContainer'><Header></Header></div>
            <div className="App-content">
                <DataBaseContent/>
                <header className="App-header">
                </header>
            </div>
        </div>
    );
}

export default App;
