import UserContext from "./context/AccountContext";
import FriendContextProvider from "./context/FriendContext";
import Views from "./pages/Views";

function App() {
  return (
    <>
      <UserContext>
        <FriendContextProvider>
          <Views />
        </FriendContextProvider>
      </UserContext>
    </>
  );
}

export default App;
