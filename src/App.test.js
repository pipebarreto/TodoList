import { render, screen, fireEvent } from '@testing-library/react';
import'@testing-library/jest-dom/extend-expect';

import Todolist from './components/Todolist';
import App from './App';

/*test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

test('renders todotable', () => {
  const row = [   
     {description: 'Study', date: '24.01.2021'}  ]; 
      render(<Todolist todos={row} />);
      const tablecell = screen.getByText(/Study/i); 
      expect(tablecell).toBeInTheDocument();
    });

test ('Add button', ()=>{
  render(<App />);
  const button = screen.getByText('Add');
  fireEvent.click(button);
});

test ('Clear function', ()=>{
  render(<App />);
  const button = screen.getByText('Clear Table');
  fireEvent.click(button);
});

