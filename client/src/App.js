// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './LogAuth/SignIn';
import Registration from './LogAuth/Registration';
import BasicLayout from './layouts/BasicLayout';
import Home from './pages/Home';
import MyLikes from './pages/MyLikes';
import MyBookmarks from './pages/MyBookmarks';
import MyPosts from './pages/MyPosts';
import MyProfile from './pages/MyProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/registration" element={<Registration />} />

          {/* Place more specific routes first */}
          <Route path="/" element={<BasicLayout/>}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/my-likes" element={<MyLikes />} />
          <Route path="/my-bookmarks" element={<MyBookmarks />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/my-profile" element={<MyProfile />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
