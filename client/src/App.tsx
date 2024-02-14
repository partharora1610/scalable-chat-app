import UserContext from "./context/AccountContext";
import FriendContextProvider from "./context/FriendContext";
import MessageContextProvider from "./context/MessagesContext";
import Views from "./pages/Views";

function App() {
  return (
    <>
      <UserContext>
        <FriendContextProvider>
          <MessageContextProvider>
            <Views />
          </MessageContextProvider>
        </FriendContextProvider>
      </UserContext>
    </>
  );
}

export default App;
