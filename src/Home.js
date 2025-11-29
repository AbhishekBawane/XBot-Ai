import ChatPage from "./components/ChatPage";
import Feedback from "./components/Feedback";

export default function Home({ showFeedback, setShowFeedback, sidebarOpen }) {
  return (
    <>
      <ChatPage sidebarOpen={sidebarOpen} />

      {showFeedback && (
        <Feedback close={() => setShowFeedback(false)} />
      )}
    </>
  );
}
