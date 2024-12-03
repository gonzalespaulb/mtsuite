import { Provider } from "react-redux";
import "./App.css";
import TomorrowPortal from "./TomorrowPortal/TomorrowPortal";
import { store } from "./TomorrowPortal/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function App() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <div className="App">
          <TomorrowPortal />
        </div>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
