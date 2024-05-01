
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StoryView from './Pages/StoryView/StoryView';
import LoginSignup from './Pages/LoginSignuo/LoginSignup';
import StoryContainer from './Components/StoryContainer/StoryContainer';
import Navbar from './Components/Navbar/Navbar';
import StoryFilter from './Components/StoryFilter/StoryFilter';
import { useEffect, useState } from 'react';
import StoryForm from './Components/StoryForm/StoryForm';
import AddStory from './Pages/AddStory/AddStory';
import Login from './Pages/Register/Login';
import Stories from './Pages/storypopup/Stories'



function App() {
  const [bookmark, setbookmark] = useState(false);
  const [userloggedin, setUserLoggedIn] = useState(false);
  const [currentcategory, setCurrentCategory] = useState("all");
 

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      setUserLoggedIn(true);
      console.log("login");
    }
  }, [userloggedin])



  return (
    <div >
      <BrowserRouter>
        <Navbar userloggedin={userloggedin} setUserLoggedIn={setUserLoggedIn} setbookmark={setbookmark} bookmark={bookmark}/>
        <StoryFilter bookmark={bookmark} setCurrentCategory={setCurrentCategory} />
        <StoryContainer bookmark={bookmark} category={currentcategory} userloggedin={userloggedin} />
        {/* <AddStory/> */}

        <Routes>
   
          {/* <Route  path='/bookmark' element={<StoryContainer category="bookmark" bookmark={bookmark}/>}/> */}
          <Route path='/:id' element={<StoryView bookmark={bookmark} />} />
          <Route path='/register' element={<LoginSignup />} />
          <Route path='/login' element={<Login setUserLoggedIn={setUserLoggedIn} />} />
          <Route path='/addStory' element={<AddStory />} />
          {/* <Route path='/popup' element={<Stories images={images}/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
