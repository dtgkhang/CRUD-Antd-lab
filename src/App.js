import { Header } from 'antd/es/layout/layout';
import './App.css';
import DemoLayout from './component/DemoLayout';
import Main from './component/Main';

function App() {
  return (
    <div className="App">
      <Header/>
    <DemoLayout><Main/></DemoLayout>
    </div>
  );
}

export default App;
