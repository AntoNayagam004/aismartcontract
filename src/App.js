import { useState } from 'react';
import Web3 from 'web3'; 
import  './App.css' ;
import Modal from './Components/Modal';


// Import statements

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("No Ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        const balance = await web3.eth.getBalance(account);
        setEthBalance(balance);
        setIsConnected(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const [openModal, setOpenModal] = useState(false)


  return (
    <div className='app'>
      <div className='app-header'>
        <h1>React DApp Authentication with React, web3, and Metamask</h1>
      </div>
      <div className="app-wrapper">
        {!isConnected && (
          <div>
            <button className='app-button-login' onClick={onConnect}>
              Login
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className='app-wrapper'>
          <div className='app-details'>
            <h2>You are connected to MetaMask.</h2>
            <div className='app-balance'>
              <span></span>
              {ethBalance}
            </div>
          </div>
          <button className='app-buttons__logout' onClick={onDisconnect}>
            Disconnect
          </button>
          <br></br>
          <div className='move'>
            <button className='openModalBtn' onClick={() => {setOpenModal(true);}}>Go Next</button>
            {openModal && <Modal closeModal={setOpenModal}/>}
          </div>
          <div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
