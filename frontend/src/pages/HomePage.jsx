import SideBar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
    const { selectedUser } = useChatStore();
    return (
        <div className='flex w-full h-screen px-5 pt-20 sm:justify-center bg-base-300'>
            <div className='max-w-6xl w-full sm:flex sm:flex-1 bg-base-100 rounded-lg shadow-2xl max-h-[calc(100vh-6rem)]'>
                <SideBar />
                {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
        </div>
    );
};

export default HomePage;
