# Dynamic Social Media Web Application

This dynamic social media platform is built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** with a focus on enhancing **user engagement and interaction**. It includes robust features such as post management, real-time messaging, and secure user authentication, all optimized for a smooth user experience.

## Demo Video

[![Watch the demo](https://img.youtube.com/vi/jJLUhO--hDE/maxresdefault.jpg)](https://youtu.be/jJLUhO--hDE)

Click on the image above to watch the demo video on YouTube and see the platform in action!

## Screenshots

### 2. Home Page
![Home [Page](https://drive.google.com/file/d/1dt5UZljRVbu6OuEGdgddPy-XQoav85a4/view?usp=sharing)
*Users can create, edit, and delete posts with image uploads.*

### 1. User Authentication
| Signup | Login |
| ------ | ----- |
| <div style="text-align: center;"><h4>Signup</h4><img src="https://drive.google.com/file/d/1WNB-f_iizmZsFweaLRrtcc09dlZtKR7N/view?usp=sharing" alt="Signup" width= 100% /><p>*Signup page for new users.*</p></div> | <div style="text-align: center;"><h4>Login</h4><img src="https://drive.google.com/file/d/1bp7pbqOQcp2nN9ul-L6eWyi5RGr2_Q8a/view?usp=sharing" alt="Login" width= 100% /><p>*Login page for users.*</p></div> |

### 2. Post Management
![Post Management](screenshots/post-management-screenshot.png)
*Users can create, edit, and delete posts with image uploads.*

### 3. Real-Time Chat
![Real-Time Chat](https://drive.google.com/file/d/1X5kh8bm-Eff4OfrR3nII3kETHh0vwHGJ/view?usp=sharing)
*The chat interface showcasing real-time messaging.*

### 4. Responsive Design
<table style="width: 100%; border-collapse: collapse;">
    <tr>
        <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Signup</th>
        <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Login</th>
        <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">User Profile</th>
    </tr>
    <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">
            <div style="text-align: center;">
                <h4>Post Responsive</h4>
                <img src="https://drive.google.com/file/d/1sMYWZh3aS6dzRRoJ95o6mNz7biieFXMa/view?usp=sharing" width="100%" height="100%" />
                <p>*Signup page for new users.*</p>
            </div>
        </td>
        <td style="border: 1px solid #ddd; padding: 8px;">
            <div style="text-align: center;">
                <h4>Post Responsive</h4>
                <img src="https://drive.google.com/file/d/1sUIG_zcvc2K_Z0Fs27TjVoCYvcyezaU3/view?usp=sharing" alt="Login" width="100%" />
                <p>*Login page for users.*</p>
            </div>
        </td>
        <td style="border: 1px solid #ddd; padding: 8px;">
            <div style="text-align: center;">
                <h4>Chat Responsive</h4>
                <img src="https://drive.google.com/file/d/1sLuF43SxkpJDGlo3o7Rxw680Y0_p3_y-/view?usp=sharing" alt="User Profile" width="100%" /> <!-- Replace with actual image link -->
                <p>*User profile page for managing account settings and information.*</p>
            </div>
        </td>
    </tr>
</table>


## Features

- **User Authentication**: Secure sign-up, login, and session management using **JWT (JSON Web Token)**.
- **Post Management**: Users can create, edit, and delete posts with image uploads, powered by **Cloudinary** for storage.
- **Like/Dislike System**: Allows users to like or dislike posts, and the UI updates in real-time.
- **Follow/Unfollow**: Users can follow and unfollow other users to keep track of their activities.
- **Real-Time Chat**: Integrated **Socket.io** for real-time messaging between users.
- **Responsive Design**: A modern and responsive UI, ensuring a seamless experience on both desktop and mobile devices.

## Technologies Used

- **MongoDB**: NoSQL database used for data persistence.
- **Express.js**: Backend framework for handling API requests and routing.
- **React.js**: Frontend framework for building an interactive and dynamic user interface.
- **Node.js**: JavaScript runtime for server-side development.
- **Socket.io**: For enabling real-time communication and chat between users.
- **JWT**: JSON Web Token used for user authentication and session management.
- **Cloudinary**: Cloud-based storage for image uploads.
- **Multer**: Middleware for handling file uploads.
- **Tailwind CSS**: Used for modern and responsive design.

## Installation and Setup

To run this project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary Account](https://cloudinary.com/) for image storage

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iamanujkumar/MySocialMedia-App
   cd MySocialMedia-App
