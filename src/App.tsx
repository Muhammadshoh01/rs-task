import { useEffect, useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import ReactHookForm from './components/ReactHookForm';
import { useFormStore } from './store/useFormStore';
import { countries } from './data/countries';
import { useCountryStore } from './store/useCountryStore';
import UncontrolledForm from './components/UncontrolledForm';

function App() {
  const [showHookModal, setShowHookModal] = useState(false);
  const [showUncontrolledModal, setShowUncontrolledModal] = useState(false);

  const users = useFormStore((state) => state.users);
  const setCountries = useCountryStore((state) => state.setCountries);

  useEffect(() => {
    setCountries(countries);
  }, []);

  return (
    <>
      <div className="flex items-center gap-3 p-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => setShowHookModal(true)}
        >
          Open React Hook Form
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => setShowUncontrolledModal(true)}
        >
          Open Uncontrolled Form
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {users.map((entry) => (
          <div key={entry.id} className="border rounded-xl p-4 shadow">
            <h2 className="font-bold">{entry.name}</h2>
            <p>Age: {entry.age}</p>
            <p>Email: {entry.email}</p>
            <p>Gender: {entry.gender}</p>
            <p>Country: {entry.country}</p>
            <img
              src={entry.picture}
              alt="Profile"
              className="mt-2 w-24 h-24 object-cover rounded-full"
            />
          </div>
        ))}
      </div>
      <Modal isOpen={showHookModal} onClose={() => setShowHookModal(false)}>
        <ReactHookForm onClose={() => setShowHookModal(false)} />
      </Modal>
      <Modal
        isOpen={showUncontrolledModal}
        onClose={() => setShowUncontrolledModal(false)}
      >
        <UncontrolledForm onClose={() => setShowUncontrolledModal(false)} />
      </Modal>
    </>
  );
}

export default App;
