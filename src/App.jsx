import './index.css';
import Nav from './Components/Nav';
import ItemTable from './Components/ItemTable';

function App() {
  return (
    <>
      <div className="min-h-screen p-5 bg-grey-100">
        <div className="flex justify-between items-center">
          <img src="./Screenshot 2024-10-24 152830.png" alt="finline-logo" className="w-40" />
          <div className="flex space-x-4 items-center">
            <button type="button" className="bg-blue-700 px-4 py-2 rounded-3xl text-white">Sign in</button>
            <span className="text-sm">English<span> ^ </span></span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg mt-8 p-4">
          <Nav />
          <ItemTable/>
        </div>
      </div>
    </>
  );
}

export default App;
