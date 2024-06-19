import './index.css';
import { Container, Typography} from '@mui/material'
import Navbar from '../../components/Navbar'

function App() {
  return (
    <Container>
      <Navbar />
      <Typography variant="h3">Hello World</Typography>
    </Container>
  );
}

export default App;
