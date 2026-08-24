import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Layout from "./components/ui/layout";
import { ThemeProvider } from "./context/theme-provider";
import WeatherDashboard from "./pages/weather-dashboard";
import CityPage from "./pages/city-page";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {

  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // Deletes the data after 10 minutes
        retry: false, // If fail, do not retry
        refetchOnWindowFocus: false, // If back to the window, do not refetch
      }
    }
  });

  return (

    <QueryClientProvider client={queryClient}>
      { /* BrowserRouter wraps the whole page */ }
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Routes>
            <Route path='/' element={<WeatherDashboard />}/>
              <Route path='/city/:cityName' element={<CityPage />}/>
              </Routes>
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>


        </BrowserRouter>
    </QueryClientProvider>

        )
}

        export default App
