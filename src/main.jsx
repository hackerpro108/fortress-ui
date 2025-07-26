import { render } from 'preact'
import { App } from './app.jsx'
import './index.css' // Dòng này bắt buộc phải có
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('app')
)