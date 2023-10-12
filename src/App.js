import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ResponsiveSearchContainer from './ResponsiveSearchContainer';
import SearchContainer from './components/SearchContainer';
import ResponsiveSearchContainerV2 from './ResponsiveSearchContainerV2';

function App() {
  return (
   <div>
    {/* <ResponsiveSearchContainer></ResponsiveSearchContainer> */}
    <ResponsiveSearchContainerV2></ResponsiveSearchContainerV2>
    {/* <SearchContainer></SearchContainer> */}
   </div>
  );
}

export default App;
