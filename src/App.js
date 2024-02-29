import './App.css';
import logo from './logo.png'
import Axios from "axios";
import { useState } from 'react';

function App() {
  const [gitURL, setGitURL] = useState('');
  const [deployedResponse, setdeployResponse ] = useState('');

  // call api-server
  async function deployProject (gitURL) { 
    try{
      const response = await Axios.post('http://localhost:8080/api/v1/deploy', { gitURL});
      setdeployResponse(response.data.data);
    } catch(e){
      console.log(e.message);
    }
  }

  return (
    <div className='chai-cloud-content container' >
      <img src={logo} style={{marginBottom: "5vh"}} alt='chai-logo' height="140vh" />
      <h1> Chai Cloud (Frontend Cloud)</h1>
      <p> Deploy your frontend app using git URL. </p>

      
      <form onSubmit={(e) => {
        e.preventDefault();
        deployProject(gitURL);
      }}> 
      <div className='row'>
        <div className='col-md-8'> 
          <input type='text' value={gitURL} className='form-control col-md-8' required={true} name="gitURL" onChange={(e) => setGitURL(e.target.value)} placeholder='https://github.com/your-project-repository' /> 
        </div>
        <div className='col-md-4'>
          <input type='submit' className='btn btn-warning col-md-8 deploy-btn' value="Deploy"/> 
        </div>
      </div>
      </form>

      {deployedResponse !== ''? 
        <div className='alert alert-warning deploy-status'>
        <b>chai-cloud project slug:</b> {deployedResponse.projectSlug} <br/>
        <b>chai-cloud project URL:</b> {deployedResponse.URL}
    </div>
      : ''}
    </div>
  );
}

export default App;
