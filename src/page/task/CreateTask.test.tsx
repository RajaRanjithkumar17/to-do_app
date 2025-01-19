import { render, screen, waitFor ,fireEvent} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateTask from "./CreateTask";
import '@testing-library/jest-dom'; 
import axios from 'axios';

describe('CreateTask component', () => {
  it('renders the create task form with all fields', async () => {
    render(
      <BrowserRouter>
        <CreateTask />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Assigned User/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
  });
});


test('submits the form to create a task', async () => {
  
    render(
        <BrowserRouter>
        <CreateTask />
      </BrowserRouter>
    );
  
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'This is a test description' } });
  
    fireEvent.click(screen.getByTestId("submit-btn"));


  });
