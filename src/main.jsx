import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Protected from './components/AuthLayout.jsx'
import Login from './components/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/addPost.jsx'
import EditedPost from './pages/EditedPost.jsx'
import Post from './pages/Post.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <Protected authentication={false}>
            <Login/>
          </Protected>
        )
      },
      {
        path:'/signup',
        element:(
          <Protected authentication={false}>
            <Signup/>
          </Protected>
        )
      },
      {
       path:'/all-posts',
       element:(
        <Protected authentication={" "}>
          <AllPost/>
        </Protected>
       )
      },
      {
        path:'/add-post',
        element:(
          <Protected authentication={" "}>
            <AddPost/>
          </Protected>
        )
      },
      {
        path:'/edit-post/:slug',
        element:(
          <Protected authentication={" "}>
            <EditedPost/>
          </Protected>
        )
      },
      {
       path:'/post/:slug',
       element:<Post/>
      },

    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)
