
import axios from 'axios';
async function test() {
  try {
    const { data } = await axios.get('http://localhost:8080/auth/admin/roles');
    console.log('Roles:', data);
  } catch (err) {
    console.error('Error:', err.message);
  }
}
test();

