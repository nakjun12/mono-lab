import "./App.css";
import { SimpleStoreComponent } from "./simple-store";
import { SyncStoreComponent } from "./sync-store-module";

function App() {
  return (
    <>
      <div>
        <SimpleStoreComponent />
        <SyncStoreComponent />
      </div>
    </>
  );
}

export default App;
