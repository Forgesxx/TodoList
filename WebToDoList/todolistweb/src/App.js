import './App.css';
import Header from './components/Header/header';
import InputContainer from './components/InputContainer/InputContainer';
import DataBaseContent from './components/DataBaseContent/DataBaseContent';

function App()
{
    return (
        <div className="App">
            <Header></Header>
            <div className="App-content">
                <DataBaseContent/>
                <header className="App-header">
                </header>
                <div className="InputContainer-wrapper">
                    <InputContainer></InputContainer>
                </div>
            </div>
        </div>
    );
}

export default App;
