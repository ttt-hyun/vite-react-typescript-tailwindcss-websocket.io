import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import io from 'socket.io-client';
import Home from '../pages/Home'
import About from '../pages/About'
import Location from '../pages/Location'

function App() {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    const socket = io('http://localhost:5000');

    useEffect(() => {
        console.log('useEffect');
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
            console.log('useEffect return');
        };
    }, []);

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white shadow-lg">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex space-x-7">
                            <div className="flex items-center py-4">
                                <Link to="/" className="text-xl font-bold text-gray-800">로고</Link>
                            </div>
                            <div className="flex w-full items-center">
                                <div className="flex items-center w-full gap-2">
                                    <Link to="/" className="text-gray-500 hover:text-gray-900">홈</Link>
                                    <Link to="/about" className="text-gray-500 hover:text-gray-900">소개</Link>
                                    <Link to="/location" className="text-gray-500 hover:text-gray-900">위치</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="max-w-6xl mx-auto mt-6">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/location" element={<Location />} />
                    </Routes>
                </main>
            </div>
            <div className="flex gap-4">
                <div className="bg-red-500 w-10 h-10"></div>
                <div className="bg-blue-500 w-10 h-10"></div>
            </div>
        </Router>
        
    )
}

export default App
